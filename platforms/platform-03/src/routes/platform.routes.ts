import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { checkBaselineDrift, registerNode, getInventory, getNode } from '../services/baseline.service';
import { registerAgent, updateHeartbeat, getAgents, getAgent } from '../services/edge.agent';
import { logger } from '../services/logger.service';

const router = Router();

// POST /platform/nodes/register - Register a node with baseline
router.post('/nodes/register', (req: Request, res: Response): void => {
  const baseline = req.body;
  if (!baseline.nodeId || !baseline.hostname) {
    res.status(400).json({ success: false, error: { code: 'MISSING_FIELDS', message: 'nodeId and hostname are required' } });
    return;
  }

  // Validate required nested fields for drift checking
  if (!baseline.securityBaseline || typeof baseline.securityBaseline !== 'object') {
    res.status(400).json({ success: false, error: { code: 'INVALID_BASELINE', message: 'securityBaseline object is required' } });
    return;
  }

  if (!Array.isArray(baseline.services)) {
    res.status(400).json({ success: false, error: { code: 'INVALID_BASELINE', message: 'services array is required' } });
    return;
  }

  registerNode(baseline);
  res.status(201).json({ success: true, data: { nodeId: baseline.nodeId }, meta: { requestId: uuidv4(), timestamp: new Date().toISOString() } });
});

// GET /platform/nodes/inventory - Get hardware inventory
router.get('/nodes/inventory', (_req: Request, res: Response): void => {
  const inventory = getInventory();
  res.json({ success: true, data: inventory, meta: { requestId: uuidv4(), timestamp: new Date().toISOString() } });
});

// POST /platform/nodes/:nodeId/drift-check - Check baseline drift
router.post('/nodes/:nodeId/drift-check', (req: Request, res: Response): void => {
  const node = getNode(req.params.nodeId);
  if (!node) { res.status(404).json({ success: false, error: { code: 'NODE_NOT_FOUND', message: 'Node not found' } }); return; }
  const drifts = checkBaselineDrift(node);
  res.json({ success: true, data: { nodeId: req.params.nodeId, drifts, driftCount: drifts.length }, meta: { requestId: uuidv4(), timestamp: new Date().toISOString() } });
});

// POST /platform/agents/register - Register an edge agent
router.post('/agents/register', (req: Request, res: Response): void => {
  const agent = req.body;
  if (!agent.agentId || !agent.nodeId) {
    res.status(400).json({ success: false, error: { code: 'MISSING_FIELDS', message: 'agentId and nodeId are required' } });
    return;
  }

  // Validate and set defaults for heartbeat monitoring
  if (!agent.lastHeartbeat) {
    agent.lastHeartbeat = new Date().toISOString();
  } else {
    // Validate lastHeartbeat is a valid ISO date
    const heartbeatDate = new Date(agent.lastHeartbeat);
    if (isNaN(heartbeatDate.getTime())) {
      res.status(400).json({ success: false, error: { code: 'INVALID_DATE', message: 'lastHeartbeat must be a valid ISO 8601 date' } });
      return;
    }
  }

  if (!agent.status) {
    agent.status = 'online';
  } else if (!['online', 'offline', 'degraded'].includes(agent.status)) {
    res.status(400).json({ success: false, error: { code: 'INVALID_STATUS', message: 'status must be one of: online, offline, degraded' } });
    return;
  }

  registerAgent(agent);
  res.status(201).json({ success: true, data: { agentId: agent.agentId }, meta: { requestId: uuidv4(), timestamp: new Date().toISOString() } });
});

// POST /platform/agents/:agentId/heartbeat - Agent heartbeat
router.post('/agents/:agentId/heartbeat', (req: Request, res: Response): void => {
  const updated = updateHeartbeat(req.params.agentId);
  if (!updated) { res.status(404).json({ success: false, error: { code: 'AGENT_NOT_FOUND', message: 'Agent not found' } }); return; }
  res.json({ success: true, data: { acknowledged: true }, meta: { requestId: uuidv4(), timestamp: new Date().toISOString() } });
});

// GET /platform/agents - List all edge agents
router.get('/agents', (_req: Request, res: Response): void => {
  const agents = getAgents();
  res.json({ success: true, data: { agents, total: agents.length }, meta: { requestId: uuidv4(), timestamp: new Date().toISOString() } });
});

export default router;
