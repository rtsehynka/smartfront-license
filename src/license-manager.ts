/**
 * @headless/license - License Manager
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

import type {
  LicenseMode,
  LicenseStatus,
  LicenseCheckResult,
  LicenseConfig,
  AuthorInfo,
} from './types'
import {
  AUTHOR_INFO,
  DEFAULT_CONFIG,
  ENV_VARS,
  MESSAGES,
  LICENSE_CHECK_CACHE_TTL,
  GRACE_PERIOD_DAYS,
  VERSION,
} from './constants'
import { reportUsage } from './license-reporter'

/**
 * Cached license status
 */
let cachedStatus: LicenseStatus | null = null
let lastCheckTimestamp = 0

/**
 * Get current license mode from environment
 */
export function getLicenseMode(): LicenseMode {
  const envMode = process.env[ENV_VARS.LICENSE_MODE]
  if (envMode === 'warn' || envMode === 'enforce') {
    return envMode
  }
  return 'track' // Default mode
}

/**
 * Get current configuration from environment
 */
export function getConfig(): LicenseConfig {
  return {
    ...DEFAULT_CONFIG,
    mode: getLicenseMode(),
    serverUrl: process.env[ENV_VARS.LICENSE_SERVER_URL],
    licenseKey: process.env[ENV_VARS.LICENSE_KEY],
  }
}

/**
 * Get author information
 */
export function getAuthorInfo(): AuthorInfo {
  return AUTHOR_INFO
}

/**
 * Get current domain from environment or request
 */
function getCurrentDomain(): string {
  const siteUrl = process.env[ENV_VARS.SITE_URL]
  if (siteUrl) {
    try {
      return new URL(siteUrl).hostname
    } catch {
      return siteUrl
    }
  }
  return 'localhost'
}

/**
 * Get environment type
 */
function getEnvironment(): 'development' | 'production' | 'test' {
  const nodeEnv = process.env[ENV_VARS.NODE_ENV]
  if (nodeEnv === 'production') return 'production'
  if (nodeEnv === 'test') return 'test'
  return 'development'
}

/**
 * Generate or retrieve client ID
 */
function getClientId(): string {
  // On server side, generate based on domain and timestamp
  const domain = getCurrentDomain()
  const hash = Buffer.from(`${domain}-${Date.now()}`).toString('base64').slice(0, 16)
  return `client_${hash}`
}

/**
 * Validate license status
 * Currently permissive - returns valid status in track/warn modes
 */
async function validateLicense(): Promise<LicenseStatus> {
  const config = getConfig()
  const licenseKey = config.licenseKey

  // No license key - grace period
  if (!licenseKey) {
    return {
      isValid: false,
      isGracePeriod: true,
      mode: config.mode,
      daysRemaining: GRACE_PERIOD_DAYS,
    }
  }

  // In track/warn mode - always allow but note status
  if (config.mode === 'track' || config.mode === 'warn') {
    return {
      isValid: true,
      isGracePeriod: false,
      mode: config.mode,
      licenseKey: licenseKey.slice(0, 8) + '...', // Partial key for logs
    }
  }

  // Enforce mode - validate license key
  // TODO: Implement actual license validation when needed
  // For now, accept any key in enforce mode
  return {
    isValid: true,
    isGracePeriod: false,
    mode: config.mode,
    licenseKey: licenseKey.slice(0, 8) + '...',
  }
}

/**
 * Main license check function
 * Call this at application entry points (layouts, API routes)
 */
export async function checkLicense(): Promise<LicenseCheckResult> {
  const now = Date.now()
  const config = getConfig()

  // Return cached result if still valid
  if (cachedStatus && now - lastCheckTimestamp < LICENSE_CHECK_CACHE_TTL) {
    return buildCheckResult(cachedStatus, config.mode)
  }

  try {
    // Validate license
    const status = await validateLicense()
    cachedStatus = status
    lastCheckTimestamp = now

    // Report usage in background (non-blocking)
    reportUsageInBackground()

    return buildCheckResult(status, config.mode)
  } catch (error) {
    console.error('[License] Check failed:', error)

    // On error, allow access but set grace period
    const gracePeriodStatus: LicenseStatus = {
      isValid: false,
      isGracePeriod: true,
      mode: config.mode,
      error: 'License check failed',
    }
    cachedStatus = gracePeriodStatus
    lastCheckTimestamp = now

    return buildCheckResult(gracePeriodStatus, config.mode)
  }
}

/**
 * Build check result from status
 */
function buildCheckResult(status: LicenseStatus, mode: LicenseMode): LicenseCheckResult {
  // Determine if access is allowed
  let allowed = true
  if (mode === 'enforce' && !status.isValid && !status.isGracePeriod) {
    allowed = false
  }

  // Determine if warning should be shown
  let showWarning = false
  let warningMessage: string | undefined

  if (mode === 'warn') {
    showWarning = true
    warningMessage = status.isGracePeriod
      ? MESSAGES.GRACE_PERIOD
      : MESSAGES.OWNERSHIP_NOTICE
  } else if (mode === 'enforce' && status.isGracePeriod) {
    showWarning = true
    warningMessage = MESSAGES.LICENSE_REQUIRED
  }

  return {
    allowed,
    showWarning,
    warningMessage,
    status,
    author: AUTHOR_INFO,
  }
}

/**
 * Report usage in background without blocking
 */
function reportUsageInBackground(): void {
  const domain = getCurrentDomain()
  const clientId = getClientId()
  const environment = getEnvironment()

  // Fire and forget - don't await
  reportUsage({
    domain,
    clientId,
    version: VERSION,
    timestamp: new Date().toISOString(),
    environment,
  }).catch(() => {
    // Silently fail - don't break app if reporting fails
  })
}

/**
 * Force clear the license cache
 * Useful for testing or after configuration changes
 */
export function clearLicenseCache(): void {
  cachedStatus = null
  lastCheckTimestamp = 0
}

/**
 * Get cached status without performing new check
 */
export function getCachedStatus(): LicenseStatus | null {
  return cachedStatus
}
