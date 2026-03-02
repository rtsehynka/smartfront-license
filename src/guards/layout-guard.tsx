/**
 * @headless/license - Layout Guard Component
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

import React from 'react'
import type { LicenseCheckResult } from '../types'
import { checkLicense } from '../license-manager'
import { LicenseWarning } from '../components/LicenseWarning'
import { LicenseBlockedPage } from '../components/LicenseBlockedPage'

interface LayoutGuardProps {
  children: React.ReactNode
}

/**
 * Server Component that wraps layout content with license check
 * Use this in app/layout.tsx or app/(admin)/layout.tsx
 *
 * @example
 * ```tsx
 * import { LayoutGuard } from '@headless/license/guards'
 *
 * export default async function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <LayoutGuard>{children}</LayoutGuard>
 *       </body>
 *     </html>
 *   )
 * }
 * ```
 */
export async function LayoutGuard({ children }: LayoutGuardProps) {
  const result = await checkLicense()

  // If access is blocked (enforce mode + no valid license)
  if (!result.allowed) {
    return <LicenseBlockedPage result={result} />
  }

  // If warning should be shown (warn mode)
  if (result.showWarning) {
    return (
      <>
        <LicenseWarning message={result.warningMessage} author={result.author} />
        {children}
      </>
    )
  }

  // Normal operation
  return <>{children}</>
}

/**
 * HOC version for wrapping page components
 * Use when you need to wrap individual pages
 *
 * @example
 * ```tsx
 * import { withLicenseGuard } from '@headless/license/guards'
 *
 * async function AdminPage() {
 *   return <div>Admin Content</div>
 * }
 *
 * export default withLicenseGuard(AdminPage)
 * ```
 */
export function withLicenseGuard<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> {
  return async function LicenseGuardedComponent(props: P) {
    const result = await checkLicense()

    if (!result.allowed) {
      return <LicenseBlockedPage result={result} />
    }

    return (
      <>
        {result.showWarning && (
          <LicenseWarning message={result.warningMessage} author={result.author} />
        )}
        <Component {...props} />
      </>
    )
  }
}

/**
 * Get license check result without rendering
 * Use for manual handling in server components
 *
 * @example
 * ```tsx
 * import { getLicenseResult } from '@headless/license/guards'
 *
 * export default async function Page() {
 *   const license = await getLicenseResult()
 *
 *   if (!license.allowed) {
 *     redirect('/license-required')
 *   }
 *
 *   return <div>Content</div>
 * }
 * ```
 */
export async function getLicenseResult(): Promise<LicenseCheckResult> {
  return checkLicense()
}
