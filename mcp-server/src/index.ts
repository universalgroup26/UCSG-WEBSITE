import { tools, handleToolCall } from './tools.js';

// ============================================================
// MCP Protocol Types
// ============================================================

interface JsonRpcMessage {
  jsonrpc: '2.0';
  id?: string | number | null;
  method?: string;
  params?: Record<string, unknown>;
  result?: unknown;
  error?: { code: number; message: string; data?: unknown };
}

// ============================================================
// JSON-RPC over stdio with Content-Length framing
// ============================================================

let buffer = '';

function sendMessage(message: JsonRpcMessage): void {
  const json = JSON.stringify(message);
  const header = `Content-Length: ${Buffer.byteLength(json, 'utf-8')}`;
  const data = `${header}\r\n\r\n${json}`;
  process.stdout.write(data, 'utf-8');
}

function processMessage(message: JsonRpcMessage): void {
  const { id, method, params } = message;

  if (!method) {
    if (id !== undefined && id !== null) {
      sendMessage({
        jsonrpc: '2.0',
        id,
        error: { code: -32600, message: 'Invalid Request: missing method' },
      });
    }
    return;
  }

  switch (method) {
    case 'initialize':
      handleInitialize(id, params);
      break;

    case 'notifications/initialized':
      // Client acknowledgment — no response needed
      break;

    case 'tools/list':
      handleToolsList(id);
      break;

    case 'tools/call':
      handleToolsCall(id, params as { name: string; arguments?: Record<string, unknown> });
      break;

    case 'ping':
      sendMessage({
        jsonrpc: '2.0',
        id: id ?? null,
        result: {},
      });
      break;

    default:
      if (id !== undefined && id !== null) {
        sendMessage({
          jsonrpc: '2.0',
          id,
          error: { code: -32601, message: `Method not found: ${method}` },
        });
      }
  }
}

// ============================================================
// MCP Method Handlers
// ============================================================

function handleInitialize(
  id: string | number | null | undefined,
  params: Record<string, unknown> | undefined
): void {
  const clientInfo = (params?.clientInfo as { name?: string; version?: string }) || {};

  sendMessage({
    jsonrpc: '2.0',
    id: id ?? null,
    result: {
      protocolVersion: '2024-11-05',
      capabilities: {
        tools: {},
      },
      serverInfo: {
        name: '@ucsg/mcp-server',
        version: '1.0.0',
      },
      ...(Object.keys(clientInfo).length > 0
        ? {
            _meta: {
              clientInfo,
            },
          }
        : {}),
    },
  });
}

function handleToolsList(id: string | number | null | undefined): void {
  sendMessage({
    jsonrpc: '2.0',
    id: id ?? null,
    result: {
      tools: tools.map((t) => ({
        name: t.name,
        description: t.description,
        inputSchema: t.inputSchema,
      })),
    },
  });
}

function handleToolsCall(
  id: string | number | null | undefined,
  params: { name: string; arguments?: Record<string, unknown> }
): void {
  const { name, arguments: args } = params;

  if (!name) {
    sendMessage({
      jsonrpc: '2.0',
      id: id ?? null,
      error: { code: -32602, message: 'Invalid params: tool name is required' },
    });
    return;
  }

  const toolExists = tools.some((t) => t.name === name);
  if (!toolExists) {
    sendMessage({
      jsonrpc: '2.0',
      id: id ?? null,
      error: { code: -32602, message: `Unknown tool: ${name}` },
    });
    return;
  }

  try {
    const result = handleToolCall(name, args || {});
    sendMessage({
      jsonrpc: '2.0',
      id: id ?? null,
      result,
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    sendMessage({
      jsonrpc: '2.0',
      id: id ?? null,
      error: { code: -32603, message: `Internal error: ${errorMessage}` },
    });
  }
}

// ============================================================
// Stdio Transport
// ============================================================

process.stdin.setEncoding('utf-8');

process.stdin.on('data', (chunk: string) => {
  buffer += chunk;

  while (true) {
    // Find the header section
    const headerEnd = buffer.indexOf('\r\n\r\n');
    if (headerEnd === -1) break;

    const headerSection = buffer.slice(0, headerEnd);
    const contentLengthMatch = headerSection.match(/Content-Length:\s*(\d+)/i);
    if (!contentLengthMatch) {
      // Skip invalid header
      buffer = buffer.slice(headerEnd + 4);
      continue;
    }

    const contentLength = parseInt(contentLengthMatch[1], 10);
    const messageStart = headerEnd + 4;
    const messageEnd = messageStart + contentLength;

    if (buffer.length < messageEnd) break; // Wait for more data

    const messageStr = buffer.slice(messageStart, messageEnd);
    buffer = buffer.slice(messageEnd);

    try {
      const message = JSON.parse(messageStr) as JsonRpcMessage;
      processMessage(message);
    } catch {
      // Silently ignore malformed JSON
    }
  }
});

process.stdin.on('end', () => {
  process.exit(0);
});

process.on('SIGINT', () => {
  process.exit(0);
});

process.on('SIGTERM', () => {
  process.exit(0);
});

// Log to stderr so it doesn't interfere with stdio protocol
process.stderr.write('[UCSG MCP Server] Ready. Waiting for MCP client connection...\n');
