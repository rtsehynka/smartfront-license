/**
 * @headless/license - License Check Guard
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

// Re-export from license-manager for convenience
export {
  checkLicense,
  getLicenseMode,
  getAuthorInfo,
  getConfig,
  clearLicenseCache,
  getCachedStatus,
} from '../license-manager'

// Re-export types
export type {
  LicenseCheckResult,
  LicenseStatus,
  LicenseMode,
  AuthorInfo,
} from '../types'
