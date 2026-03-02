/**
 * @headless/license - Type Definitions
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

/**
 * License operating modes
 * - track: Silent tracking only (default)
 * - warn: Track + show warning banner
 * - enforce: Block access without valid license
 */
export type LicenseMode = 'track' | 'warn' | 'enforce'

/**
 * Author/Owner information
 */
export interface AuthorInfo {
  name: string
  email: string
  linkedin: string
  copyrightYears: string
  createdOutsideWorkHours: boolean
}

/**
 * License status information
 */
export interface LicenseStatus {
  isValid: boolean
  isGracePeriod: boolean
  mode: LicenseMode
  error?: string
  licenseKey?: string
  expiresAt?: string
  daysRemaining?: number
}

/**
 * Result of license check operation
 */
export interface LicenseCheckResult {
  /** Whether access is allowed */
  allowed: boolean
  /** Whether to show warning banner */
  showWarning: boolean
  /** Warning message to display */
  warningMessage?: string
  /** Current license status */
  status: LicenseStatus
  /** Author information */
  author: AuthorInfo
}

/**
 * Usage report data sent to license server
 */
export interface UsageReport {
  /** Domain where platform is running */
  domain: string
  /** Unique client/installation identifier */
  clientId: string
  /** Platform version */
  version: string
  /** Timestamp of report */
  timestamp: string
  /** Environment type */
  environment: 'development' | 'production' | 'test'
  /** Active features/modules */
  features?: string[]
  /** Additional metadata */
  metadata?: Record<string, unknown>
}

/**
 * Configuration for license manager
 */
export interface LicenseConfig {
  /** Operating mode */
  mode: LicenseMode
  /** License server URL for reporting */
  serverUrl?: string
  /** License key (for enforce mode) */
  licenseKey?: string
  /** Report throttle interval in ms */
  reportInterval?: number
  /** Enable/disable reporting */
  reportingEnabled?: boolean
}

/**
 * License server response
 */
export interface LicenseServerResponse {
  success: boolean
  message?: string
  licenseValid?: boolean
  features?: string[]
  expiresAt?: string
}

/**
 * Props for license warning component
 */
export interface LicenseWarningProps {
  message?: string
  author?: AuthorInfo
  dismissible?: boolean
  onDismiss?: () => void
}

/**
 * Props for ownership footer component
 */
export interface OwnershipFooterProps {
  showEmail?: boolean
  showLinkedIn?: boolean
  className?: string
}
