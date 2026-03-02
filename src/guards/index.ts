/**
 * @headless/license - Guards Module
 *
 * Copyright (c) 2024-2026 Roman Tsehynka. All Rights Reserved.
 *
 * Author: Roman Tsehynka
 * Email: roman.tsehynka@gmail.com
 * Created: March 2, 2026
 */

// License check utilities
export {
  checkLicense,
  getLicenseMode,
  getAuthorInfo,
  getConfig,
  clearLicenseCache,
  getCachedStatus,
} from './check-license'

// React components for layouts
export { LayoutGuard, withLicenseGuard, getLicenseResult } from './layout-guard'

// Types
export type {
  LicenseCheckResult,
  LicenseStatus,
  LicenseMode,
  AuthorInfo,
} from './check-license'
