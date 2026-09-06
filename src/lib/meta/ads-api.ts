/**
 * Meta Marketing API Helper
 *
 * Provides typed functions for the Meta Marketing API (v26.0).
 * Used for creating ads, managing campaigns, and retrieving lead data.
 *
 * See: https://developers.facebook.com/documentation/ads-commerce/marketing-api/get-started/basic-ad-creation
 */

const META_API_BASE = 'https://graph.facebook.com/v26.0';

// ─── Configuration ─────────────────────────────────────────────────────

function getToken(): string {
  return process.env.META_ADS_APP_TOKEN || process.env.META_ACCESS_TOKEN || '';
}

function getSandboxToken(): string {
  return process.env.META_ADS_SANDBOX_TOKEN || '';
}

/** Timeout wrapper for all API calls */
const FETCH_TIMEOUT_MS = 15_000;

function fetchWithTimeout(url: string, init?: RequestInit, timeoutMs = FETCH_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...init, signal: controller.signal }).finally(() => clearTimeout(timer));
}

// ─── Types ─────────────────────────────────────────────────────────────

interface AdAccount {
  id: string;
  name: string;
  account_status: number;
  currency: string;
  timezone_name: string;
}

interface Campaign {
  id: string;
  name: string;
  objective: string;
  status: string;
  daily_budget?: string;
  lifetime_budget?: string;
}

interface AdSet {
  id: string;
  name: string;
  campaign_id: string;
  status: string;
  targeting?: Record<string, unknown>;
}

interface Ad {
  id: string;
  name: string;
  adset_id: string;
  creative_id?: string;
  status: string;
}

interface LeadFormData {
  id: string;
  name: string;
  field_data: Array<{
    name: string;
    values: string[];
  }>;
  created_time: string;
  ad_id: string;
  form_id: string;
}

// ─── API Methods ───────────────────────────────────────────────────────

/**
 * Get ad accounts accessible to the current token.
 */
export async function getAdAccounts(): Promise<AdAccount[]> {
  const token = getToken();
  if (!token) throw new Error('Meta Ads token not configured');

  const res = await fetchWithTimeout(
    `${META_API_BASE}/me/accounts?fields=id,name,account_status,currency,timezone_name&access_token=${token}`
  );

  if (!res.ok) {
    const err = await res.text().catch(() => 'unknown');
    throw new Error(`Meta API error (${res.status}): ${err.slice(0, 200)}`);
  }

  const data = await res.json();
  return data.data || [];
}

/**
 * Get campaigns for an ad account.
 */
export async function getCampaigns(accountId: string): Promise<Campaign[]> {
  const token = getToken();
  if (!token) throw new Error('Meta Ads token not configured');

  const res = await fetchWithTimeout(
    `${META_API_BASE}/${accountId}/campaigns?fields=id,name,objective,status,daily_budget,lifetime_budget&access_token=${token}`
  );

  if (!res.ok) {
    const err = await res.text().catch(() => 'unknown');
    throw new Error(`Meta API error (${res.status}): ${err.slice(0, 200)}`);
  }

  const data = await res.json();
  return data.data || [];
}

/**
 * Create a new campaign.
 */
export async function createCampaign(accountId: string, params: {
  name: string;
  objective: string;
  status?: 'ACTIVE' | 'PAUSED';
  dailyBudget?: number;
  lifetimeBudget?: number;
}): Promise<{ id: string }> {
  const token = getToken();
  if (!token) throw new Error('Meta Ads token not configured');

  const body: Record<string, unknown> = {
    name: params.name,
    objective: params.objective,
    status: params.status || 'PAUSED',
  };

  if (params.dailyBudget) body.daily_budget = Math.round(params.dailyBudget * 100); // in cents
  if (params.lifetimeBudget) body.lifetime_budget = Math.round(params.lifetimeBudget * 100);

  const res = await fetchWithTimeout(
    `${META_API_BASE}/${accountId}/campaigns?access_token=${token}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const err = await res.text().catch(() => 'unknown');
    throw new Error(`Meta API error (${res.status}): ${err.slice(0, 200)}`);
  }

  return res.json();
}

/**
 * Get lead forms for a page.
 */
export async function getLeadForms(pageId: string): Promise<unknown[]> {
  const token = getToken();
  if (!token) throw new Error('Meta Ads token not configured');

  const res = await fetchWithTimeout(
    `${META_API_BASE}/${pageId}/leadgen_forms?access_token=${token}`
  );

  if (!res.ok) {
    const err = await res.text().catch(() => 'unknown');
    throw new Error(`Meta API error (${res.status}): ${err.slice(0, 200)}`);
  }

  const data = await res.json();
  return data.data || [];
}

/**
 * Get leads from a lead gen form.
 */
export async function getLeads(formId: string, limit = 25): Promise<LeadFormData[]> {
  const token = getToken();
  if (!token) throw new Error('Meta Ads token not configured');

  const res = await fetchWithTimeout(
    `${META_API_BASE}/${formId}/leads?fields=field_data,created_time,ad_id,form_id&limit=${limit}&access_token=${token}`
  );

  if (!res.ok) {
    const err = await res.text().catch(() => 'unknown');
    throw new Error(`Meta API error (${res.status}): ${err.slice(0, 200)}`);
  }

  const data = await res.json();
  return data.data || [];
}

/**
 * Subscribe a page to a webhook event (e.g., leadgen).
 * Call this once to set up real-time notifications.
 */
export async function subscribeWebhook(pageId: string, fields: string[] = ['leadgen']): Promise<unknown> {
  const token = getToken();
  if (!token) throw new Error('Meta Ads token not configured');

  const res = await fetchWithTimeout(
    `${META_API_BASE}/${pageId}/subscribed_apps?access_token=${token}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subscribed_fields: fields }),
    }
  );

  if (!res.ok) {
    const err = await res.text().catch(() => 'unknown');
    throw new Error(`Meta API error (${res.status}): ${err.slice(0, 200)}`);
  }

  return res.json();
}

/**
 * Test the Marketing API connection (sandbox token).
 */
export async function testSandboxConnection(): Promise<{ success: boolean; error?: string }> {
  const token = getSandboxToken();
  if (!token) return { success: false, error: 'Sandbox token not configured' };

  try {
    const res = await fetchWithTimeout(
      `${META_API_BASE}/me?fields=id,name&access_token=${token}`
    );

    if (res.ok) {
      const data = await res.json();
      return { success: true };
    }

    const err = await res.text().catch(() => 'unknown');
    return { success: false, error: `HTTP ${res.status}: ${err.slice(0, 100)}` };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

// ─── Exported API ──────────────────────────────────────────────────────

export const metaAdsApi = {
  getAdAccounts,
  getCampaigns,
  createCampaign,
  getLeadForms,
  getLeads,
  subscribeWebhook,
  testSandboxConnection,
};
