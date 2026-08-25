# @ucsg/mcp-server

![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-339933)
![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero-brightgreen)

**MCP Server for Universal Consulting Service Group** — Exposes UCSG's F-1 student guidance, university programs, CPT/OPT resources, and immigration consulting capabilities as tools that AI assistants (Claude, Cursor, VS Code, etc.) can call via the Model Context Protocol.

## Features

- **University Search** — Search 15+ partner universities by name, state, CPT availability, program type, and more
- **University Details** — Get comprehensive information about any partner university including programs, tuition, and admission requirements
- **Program Search** — Find specific programs (MBA, MS in CS, PhD, etc.) across all universities with STEM/Non-STEM filtering
- **CPT/OPT Guidance** — Comprehensive guidance on CPT vs OPT, Day 1 CPT, STEM OPT extension, and long-term immigration strategy
- **SEVIS Transfer Checklist** — Step-by-step checklists for standard, emergency, and post-completion university transfers
- **Visa Change of Status** — Guidance for transitioning from B1/B2, H4, H1B, J1, and other visa categories to F-1
- **Cost Estimator** — Calculate total program costs including tuition, living expenses, and dependent costs
- **Scholarship Tips** — Scholarship search guidance with university-specific and external funding information
- **Resource Library** — Access comprehensive F-1 resources on transfers, CPT, STEM OPT, change of status, SEVIS reinstatement, and scholarships

## Installation

### Global Install (recommended)

```bash
cd mcp-server
npm install -g
ucsg-mcp-server
```

### Using npx (no install)

```bash
npx @ucsg/mcp-server
```

### Build from Source

```bash
cd mcp-server
npm install
npm run build
npm start
```

## Configuration

### Claude Desktop

Add to your Claude Desktop config file:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "ucsg": {
      "command": "node",
      "args": ["/path/to/mcp-server/dist/index.js"]
    }
  }
}
```

### Cursor IDE

Add to your Cursor MCP settings:

```json
{
  "mcpServers": {
    "ucsg": {
      "command": "node",
      "args": ["/path/to/mcp-server/dist/index.js"]
    }
  }
}
```

### VS Code (with Copilot / MCP extension)

Add to your VS Code MCP configuration:

```json
{
  "servers": {
    "ucsg": {
      "command": "node",
      "args": ["/path/to/mcp-server/dist/index.js"]
    }
  }
}
```

## Available Tools

| Tool | Description |
|------|-------------|
| `search_universities` | Search universities by name, state, CPT availability, program type, and other criteria |
| `get_university_details` | Get detailed info about a specific university (programs, tuition, requirements, CPT policy) |
| `search_programs` | Search for programs across all universities by level, type, delivery, or keyword |
| `get_cpt_guidance` | Get CPT vs OPT comparison and guidance (comparison, day1-cpt, opt, stem-opt, impact) |
| `get_transfer_checklist` | Get SEVIS transfer step-by-step checklist (standard, emergency, post-completion) |
| `get_visa_guidance` | Get change of status guidance (B1/B2→F1, H4→F1, H1B→F1, J1→F1, etc.) |
| `calculate_cost_estimate` | Estimate total program cost (tuition + living expenses + dependents) |
| `get_scholarship_tips` | Scholarship search guidance with university-specific and external funding info |
| `get_resource` | Get any F-1 resource by topic (transfers, CPT, STEM OPT, change of status, reinstatement, scholarships) |

## Usage Examples

### Search for Day 1 CPT universities in California

```
Ask Claude: "Search for universities in California that offer Day 1 CPT"
→ Calls: search_universities({ state: "CA", day1Cpt: true })
```

### Find STEM Master's programs

```
Ask Claude: "Find all STEM Master's programs available online"
→ Calls: search_programs({ level: "Master", type: "STEM", delivery: "Online" })
```

### Get university details

```
Ask Claude: "Tell me about Trine University and its programs"
→ Calls: get_university_details({ id: "trine" })
```

### Get CPT vs OPT comparison

```
Ask Claude: "Compare CPT and OPT for F-1 students"
→ Calls: get_cpt_guidance({ topic: "comparison" })
```

### Emergency SEVIS transfer

```
Ask Claude: "My SEVIS was terminated, what do I do?"
→ Calls: get_transfer_checklist({ situation: "emergency" })
```

### Estimate costs

```
Ask Claude: "How much will it cost to do a Master's at Westcliff University living in a metro area?"
→ Calls: calculate_cost_estimate({ universityId: "westcliff", location: "metro" })
```

### Change of status from H4 to F-1

```
Ask Claude: "How do I change from H4 to F-1 visa status?"
→ Calls: get_visa_guidance({ fromVisa: "H4" })
```

## Partner Universities

The server includes data for 15 partner institutions:

| University | State | Day 1 CPT | STEM OPT |
|-----------|-------|-----------|----------|
| Trine University | IN | Yes | Yes |
| Monroe College | NY | Yes | Yes |
| University of the Cumberlands | KY | Yes | Yes |
| Westcliff University | CA | Yes | Yes |
| Touro University | NY | Yes | Yes |
| University of Central Arkansas | AR | No* | Yes |
| Saint Francis University | PA | Yes | Yes |
| Curry College | MA | Yes | Yes |
| Seattle Colleges | WA | No* | Yes |
| Blue Data ESL | NY | N/A | N/A |
| Windsor School | NY | N/A | N/A |
| International American University | CA | Yes | Yes |
| Sullivan University | KY | Yes | Yes |
| Harrisburg University | PA | Yes | Yes |
| New England College of Business | MA | Yes | Yes |

*Standard CPT available (requires 1 academic year first)

## Architecture

```
mcp-server/
├── src/
│   ├── index.ts          # MCP protocol over stdio (JSON-RPC 2.0)
│   ├── tools.ts          # 9 tool definitions and handlers
│   └── data/
│       ├── universities.ts  # 15 university records
│       └── resources.ts     # F-1 resource content (markdown)
├── dist/                  # Compiled JavaScript output
├── package.json
├── tsconfig.json
└── README.md
```

## Technical Details

- **Protocol:** Model Context Protocol (MCP) over stdio
- **Transport:** JSON-RPC 2.0 with Content-Length header framing
- **Runtime:** Node.js ≥ 18 (no external dependencies)
- **Build:** TypeScript compiled to ES2022

## License

MIT License

Copyright (c) 2024 Universal Consulting Service Group

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
