/**
 * SmartFront Activation Server - Usage Report Endpoint
 *
 * Copyright (c) 2024-2026 Roman Tsehynka. All Rights Reserved.
 *
 * Deploy this to Vercel, Railway, or any Node.js hosting.
 * Receives usage reports from SmartFront installations.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'

// In-memory storage for demo (use MongoDB in production)
const activations: Array<{
  domain: string
  clientId: string
  version: string
  timestamp: string
  environment: string
  metadata?: Record<string, unknown>
  ip: string
  receivedAt: string
}> = []

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-License-Package, X-License-Version')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const {
      domain,
      clientId,
      version,
      timestamp,
      environment,
      metadata,
    } = req.body

    // Validate required fields
    if (!domain || !clientId) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Get IP address
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
               req.headers['x-real-ip'] as string ||
               'unknown'

    // Record activation
    const record = {
      domain,
      clientId,
      version: version || 'unknown',
      timestamp: timestamp || new Date().toISOString(),
      environment: environment || 'unknown',
      metadata,
      ip,
      receivedAt: new Date().toISOString(),
    }

    activations.push(record)

    // Log for monitoring
    console.log(`[Activation] ${domain} | ${environment} | ${clientId}`)

    // TODO: In production, save to MongoDB:
    // await db.collection('activations').insertOne(record)

    // TODO: Send notification email for new domains:
    // if (isNewDomain(domain)) {
    //   await sendEmail({
    //     to: process.env.NOTIFICATION_EMAIL,
    //     subject: `New SmartFront Installation: ${domain}`,
    //     body: `Domain: ${domain}\nEnvironment: ${environment}\nTime: ${timestamp}`
    //   })
    // }

    return res.status(200).json({
      success: true,
      message: 'Usage recorded',
    })
  } catch (error) {
    console.error('[Activation Error]', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

// Helper: Check if domain is new
// async function isNewDomain(domain: string): Promise<boolean> {
//   const existing = await db.collection('activations').findOne({ domain })
//   return !existing
// }
