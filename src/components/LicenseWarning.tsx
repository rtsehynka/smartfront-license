/**
 * @headless/license - License Warning Component
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
import type { LicenseWarningProps, AuthorInfo } from '../types'
import { AUTHOR_INFO, MESSAGES } from '../constants'

/**
 * Warning banner component displayed when in 'warn' mode
 * Shows ownership notice and author information
 */
export function LicenseWarning({
  message,
  author = AUTHOR_INFO,
  dismissible = false,
  onDismiss,
}: LicenseWarningProps) {
  const displayMessage = message || MESSAGES.OWNERSHIP_NOTICE

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fbbf24',
        color: '#1f2937',
        padding: '8px 16px',
        fontSize: '14px',
        textAlign: 'center',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
      role="alert"
      aria-live="polite"
    >
      <span>{displayMessage}</span>

      <a
        href={`mailto:${author.email}`}
        style={{
          color: '#1f2937',
          fontWeight: 600,
          textDecoration: 'underline',
        }}
      >
        {author.email}
      </a>

      {dismissible && onDismiss && (
        <button
          onClick={onDismiss}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 8px',
            fontSize: '16px',
            color: '#1f2937',
          }}
          aria-label="Dismiss warning"
        >
          &times;
        </button>
      )}
    </div>
  )
}

/**
 * Wrapper that adds padding to account for warning banner
 */
export function LicenseWarningWrapper({
  children,
  message,
  author,
}: {
  children: React.ReactNode
  message?: string
  author?: AuthorInfo
}) {
  return (
    <>
      <LicenseWarning message={message} author={author} />
      <div style={{ paddingTop: '40px' }}>{children}</div>
    </>
  )
}
