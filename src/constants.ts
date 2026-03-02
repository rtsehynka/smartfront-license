/**
 * @headless/license - Constants and Author Information
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

import type { AuthorInfo, LicenseConfig } from './types'

/**
 * Author and intellectual property owner information
 */
export const AUTHOR_INFO: AuthorInfo = {
  name: 'Roman Tsehynka',
  email: 'roman.tsehynka@gmail.com',
  linkedin: 'https://www.linkedin.com/in/roman-tsehynka-%F0%9F%87%BA%F0%9F%87%A6-61646812a/',
  copyrightYears: '2024-2026',
  createdOutsideWorkHours: true,
} as const

/**
 * GitHub profile URL
 */
export const GITHUB_URL = 'https://github.com/rtsehynka'

/**
 * License package repository URL
 */
export const REPOSITORY_URL = 'https://github.com/rtsehynka/smartfront-license'

/**
 * Copyright header for source files
 */
export const COPYRIGHT_HEADER = `/**
 * SmartFront Headless E-commerce Platform
 * Copyright (c) ${AUTHOR_INFO.copyrightYears} ${AUTHOR_INFO.name}. All Rights Reserved.
 *
 * This software is the intellectual property of ${AUTHOR_INFO.name}.
 * Created outside of regular work hours as a personal project.
 *
 * Author: ${AUTHOR_INFO.name}
 * Contact: ${AUTHOR_INFO.email}
 * LinkedIn: ${AUTHOR_INFO.linkedin}
 *
 * UNAUTHORIZED USE, COPYING, OR DISTRIBUTION IS PROHIBITED.
 */
`

/**
 * Package version
 */
export const VERSION = '1.0.0'

/**
 * Package name
 */
export const PACKAGE_NAME = '@headless/license'

/**
 * Default configuration
 */
export const DEFAULT_CONFIG: LicenseConfig = {
  mode: 'track',
  reportInterval: 60 * 60 * 1000, // 1 hour
  reportingEnabled: true,
}

/**
 * Grace period duration in days (when no license key is set)
 */
export const GRACE_PERIOD_DAYS = 14

/**
 * Cache TTL for license checks in ms
 */
export const LICENSE_CHECK_CACHE_TTL = 60 * 1000 // 1 minute

/**
 * Warning messages
 */
export const MESSAGES = {
  GRACE_PERIOD: `SmartFront Platform by ${AUTHOR_INFO.name}. License not configured.`,
  OWNERSHIP_NOTICE: `Copyright (c) ${AUTHOR_INFO.copyrightYears} ${AUTHOR_INFO.name}. All Rights Reserved.`,
  LICENSE_REQUIRED: `Valid license required. Contact: ${AUTHOR_INFO.email}`,
  LICENSE_EXPIRED: `License has expired. Contact: ${AUTHOR_INFO.email}`,
  LICENSE_INVALID: `Invalid license key. Contact: ${AUTHOR_INFO.email}`,
  USAGE_TRACKED: `Usage tracked for license compliance.`,
} as const

/**
 * Environment variable names
 */
export const ENV_VARS = {
  LICENSE_MODE: 'LICENSE_MODE',
  LICENSE_SERVER_URL: 'LICENSE_SERVER_URL',
  LICENSE_KEY: 'SMARTFRONT_LICENSE_KEY',
  SITE_URL: 'NEXT_PUBLIC_SITE_URL',
  NODE_ENV: 'NODE_ENV',
} as const

/**
 * Client ID storage key (for localStorage/cookies)
 */
export const CLIENT_ID_KEY = 'smartfront_client_id'

/**
 * Last report timestamp storage key
 */
export const LAST_REPORT_KEY = 'smartfront_last_license_report'
