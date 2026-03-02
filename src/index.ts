/**
 * @headless/license
 *
 * License Management System for SmartFront Headless E-commerce Platform
 *
 * ============================================================================
 *                         INTELLECTUAL PROPERTY NOTICE
 * ============================================================================
 *
 * Copyright (c) 2024-2026 Roman Tsehynka. All Rights Reserved.
 *
 * This software package was created by Roman Tsehynka:
 * - Created: March 2, 2026
 * - Created outside of regular work hours
 * - As a personal project
 * - All intellectual property rights belong exclusively to Roman Tsehynka
 *
 * Author: Roman Tsehynka
 * Email: roman.tsehynka@gmail.com
 * LinkedIn: https://www.linkedin.com/in/roman-tsehynka-%F0%9F%87%BA%F0%9F%87%A6-61646812a/
 *
 * UNAUTHORIZED COPYING, MODIFICATION, OR DISTRIBUTION IS STRICTLY PROHIBITED.
 *
 * ============================================================================
 */

// ============================================================================
// Core License Functions
// ============================================================================

export {
  checkLicense,
  getLicenseMode,
  getAuthorInfo,
  getConfig,
  clearLicenseCache,
  getCachedStatus,
} from './license-manager'

// ============================================================================
// Usage Reporting
// ============================================================================

export {
  reportUsage,
  forceReport,
  getQueueSize,
  clearQueue,
} from './license-reporter'

// ============================================================================
// Constants
// ============================================================================

export {
  AUTHOR_INFO,
  COPYRIGHT_HEADER,
  VERSION,
  PACKAGE_NAME,
  DEFAULT_CONFIG,
  GRACE_PERIOD_DAYS,
  MESSAGES,
  ENV_VARS,
} from './constants'

// ============================================================================
// Types
// ============================================================================

export type {
  LicenseMode,
  LicenseStatus,
  LicenseCheckResult,
  LicenseConfig,
  AuthorInfo,
  UsageReport,
  LicenseServerResponse,
  LicenseWarningProps,
  OwnershipFooterProps,
} from './types'

// ============================================================================
// React Components
// ============================================================================

export {
  LicenseWarning,
  LicenseWarningWrapper,
} from './components/LicenseWarning'

export {
  LicenseBlockedPage,
} from './components/LicenseBlockedPage'

export {
  OwnershipFooter,
  OwnershipText,
} from './components/OwnershipFooter'

// ============================================================================
// Guards
// ============================================================================

export {
  LayoutGuard,
  withLicenseGuard,
  getLicenseResult,
} from './guards/layout-guard'
