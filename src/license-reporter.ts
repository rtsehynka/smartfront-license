/**
 * @headless/license - Usage Reporter
 *
 * Copyright (c) 2024-2026 Roman Tsehynka. All Rights Reserved.
 *
 * This software was created by Roman Tsehynka outside of regular work hours
 * as a personal project. All intellectual property rights belong exclusively
 * to Roman Tsehynka.
 *
 * Author: Roman Tsehynka
 * Email: roman.tsehynka@gmail.com
 * Created: March 2, 2026
 */

import type { UsageReport, LicenseServerResponse } from './types'
import { ENV_VARS, DEFAULT_CONFIG, VERSION } from './constants'

/**
 * Last report timestamp (in-memory, resets on server restart)
 */
let lastReportTime = 0

/**
 * Report queue for failed reports (retry later)
 */
const reportQueue: UsageReport[] = []

/**
 * Maximum queue size to prevent memory issues
 */
const MAX_QUEUE_SIZE = 100

/**
 * Check if reporting is throttled
 */
function isThrottled(): boolean {
  const now = Date.now()
  const interval = DEFAULT_CONFIG.reportInterval || 60 * 60 * 1000 // 1 hour default
  return now - lastReportTime < interval
}

/**
 * Get the license server URL from environment
 */
function getServerUrl(): string | null {
  return process.env[ENV_VARS.LICENSE_SERVER_URL] || null
}

/**
 * Send report to license server
 */
async function sendReport(report: UsageReport): Promise<LicenseServerResponse> {
  const serverUrl = getServerUrl()

  if (!serverUrl) {
    // No server configured - log locally instead
    logReportLocally(report)
    return { success: true, message: 'Logged locally (no server configured)' }
  }

  try {
    const response = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-License-Package': '@headless/license',
        'X-License-Version': VERSION,
      },
      body: JSON.stringify(report),
      // Don't wait too long - this should be quick
      signal: AbortSignal.timeout(5000),
    })

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`)
    }

    const data = await response.json()
    return data as LicenseServerResponse
  } catch (error) {
    // Queue for retry
    queueReport(report)
    throw error
  }
}

/**
 * Log report locally when no server is configured
 */
function logReportLocally(report: UsageReport): void {
  // In development, log to console for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log('[License] Usage report:', {
      domain: report.domain,
      timestamp: report.timestamp,
      environment: report.environment,
    })
  }

  // Could also write to a local file or database here
  // For now, we just acknowledge the report
}

/**
 * Add report to retry queue
 */
function queueReport(report: UsageReport): void {
  if (reportQueue.length >= MAX_QUEUE_SIZE) {
    // Remove oldest report to make room
    reportQueue.shift()
  }
  reportQueue.push(report)
}

/**
 * Process queued reports (called periodically or on successful connection)
 */
async function processQueue(): Promise<void> {
  const serverUrl = getServerUrl()
  if (!serverUrl || reportQueue.length === 0) {
    return
  }

  // Process up to 10 reports at a time
  const batch = reportQueue.splice(0, 10)

  for (const report of batch) {
    try {
      await sendReport(report)
    } catch {
      // Put back in queue if still failing
      queueReport(report)
      break // Stop processing if server is unavailable
    }
  }
}

/**
 * Main function to report usage
 * Call this from license manager
 */
export async function reportUsage(data: Partial<UsageReport> = {}): Promise<void> {
  // Check throttling
  if (isThrottled()) {
    return
  }

  // Build full report
  const report: UsageReport = {
    domain: data.domain || 'unknown',
    clientId: data.clientId || 'unknown',
    version: data.version || VERSION,
    timestamp: data.timestamp || new Date().toISOString(),
    environment: data.environment || 'development',
    features: data.features,
    metadata: data.metadata,
  }

  try {
    await sendReport(report)
    lastReportTime = Date.now()

    // Try to process any queued reports
    processQueue().catch(() => {
      // Ignore queue processing errors
    })
  } catch (error) {
    // Reporting failed - already queued in sendReport
    // Log warning but don't throw
    if (process.env.NODE_ENV === 'development') {
      console.warn('[License] Usage report failed:', error)
    }
  }
}

/**
 * Force immediate report (bypass throttling)
 * Use sparingly - mainly for testing or critical events
 */
export async function forceReport(data: Partial<UsageReport> = {}): Promise<void> {
  lastReportTime = 0 // Reset throttle
  await reportUsage(data)
}

/**
 * Get queue size (for monitoring)
 */
export function getQueueSize(): number {
  return reportQueue.length
}

/**
 * Clear the report queue
 */
export function clearQueue(): void {
  reportQueue.length = 0
}
