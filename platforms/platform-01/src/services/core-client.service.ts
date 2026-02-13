import { v4 as uuidv4 } from 'uuid';
import { config } from '../config';
import type { ApiResponse, AuditEntry, SearchResult, PolicyDecision } from '@autoecops/shared-types';

// ============================================================================
// Shared HTTP Client with Trace Propagation
// ============================================================================
async function coreRequest<T>(
  baseUrl: string,
  path: string,
  options: RequestInit = {},
  traceId?: string,
): Promise<T> {
  const url = `${baseUrl}${path}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-trace-id': traceId ?? uuidv4(),
    'x-span-id': uuidv4(),
    ...(options.headers as Record<string, string> ?? {}),
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Core service error [${response.status}]: ${errorText}`);
  }

  return response.json() as Promise<T>;
}

// ============================================================================
// Auth Service Client
// ============================================================================
export async function verifyAuth(token: string, traceId?: string): Promise<ApiResponse<{ actor: unknown; expiresAt: string }>> {
  return coreRequest(config.AUTH_SERVICE_URL, '/auth/verify', {
    method: 'POST',
    body: JSON.stringify({ token }),
  }, traceId);
}

export async function checkAuthorization(
  token: string,
  permission: string,
  traceId?: string,
): Promise<ApiResponse<{ decision: PolicyDecision }>> {
  return coreRequest(config.AUTH_SERVICE_URL, '/auth/authorize', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ permission }),
  }, traceId);
}

// ============================================================================
// Memory Hub Client
// ============================================================================
export async function searchMemory(
  query: string,
  options: { topK?: number; filters?: Record<string, string> } = {},
  traceId?: string,
): Promise<ApiResponse<{ results: SearchResult[]; total: number }>> {
  return coreRequest(config.MEMORY_HUB_URL, '/memory/search', {
    method: 'POST',
    body: JSON.stringify({ query, ...options }),
  }, traceId);
}

// ============================================================================
// Event Bus Client
// ============================================================================
export async function publishEvent(
  eventData: Record<string, unknown>,
  streamName: string,
  traceId?: string,
): Promise<ApiResponse<{ eventId: string; streamId: string }>> {
  return coreRequest(config.EVENT_BUS_URL, '/events/publish', {
    method: 'POST',
    body: JSON.stringify({ ...eventData, streamName }),
  }, traceId);
}

// ============================================================================
// Policy Audit Client
// ============================================================================
export async function writeAudit(
  entry: Omit<AuditEntry, 'id'>,
  traceId?: string,
): Promise<ApiResponse<{ id: string }>> {
  return coreRequest(config.POLICY_AUDIT_URL, '/audit/write', {
    method: 'POST',
    body: JSON.stringify(entry),
  }, traceId);
}

export async function evaluatePolicy(
  policyPath: string,
  input: Record<string, unknown>,
  traceId?: string,
): Promise<ApiResponse<{ decision: PolicyDecision }>> {
  return coreRequest(config.POLICY_AUDIT_URL, '/policy/evaluate', {
    method: 'POST',
    body: JSON.stringify({ policyPath, input }),
  }, traceId);
}
