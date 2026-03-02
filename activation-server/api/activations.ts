/**
 * SmartFront Activation Server - List Activations
 *
 * Copyright (c) 2024-2026 Roman Tsehynka. All Rights Reserved.
 *
 * Protected endpoint to view all activations.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Simple auth check
  const authHeader = req.headers.authorization
  const expectedToken = `Bearer ${process.env.ACTIVATION_SECRET}`

  if (authHeader !== expectedToken) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    // TODO: In production, fetch from MongoDB:
    // const activations = await db.collection('activations')
    //   .find({})
    //   .sort({ receivedAt: -1 })
    //   .limit(100)
    //   .toArray()

    // Demo response
    return res.status(200).json({
      success: true,
      count: 0,
      activations: [],
      message: 'Connect to MongoDB to see real data',
    })
  } catch (error) {
    console.error('[Activations Error]', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
