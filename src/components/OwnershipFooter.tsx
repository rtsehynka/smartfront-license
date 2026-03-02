/**
 * @headless/license - Ownership Footer Component
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
import type { OwnershipFooterProps } from '../types'
import { AUTHOR_INFO } from '../constants'

/**
 * Footer component showing author attribution
 * Use in admin panel or other appropriate locations
 */
export function OwnershipFooter({
  showEmail = true,
  showLinkedIn = false,
  className = '',
}: OwnershipFooterProps) {
  return (
    <footer
      className={className}
      style={{
        padding: '16px',
        textAlign: 'center',
        fontSize: '12px',
        color: '#6b7280',
        borderTop: '1px solid #e5e7eb',
        marginTop: 'auto',
      }}
    >
      <p style={{ margin: 0 }}>
        Powered by SmartFront — Copyright © {AUTHOR_INFO.copyrightYears}{' '}
        <strong>{AUTHOR_INFO.name}</strong>
      </p>

      {(showEmail || showLinkedIn) && (
        <p style={{ margin: '8px 0 0 0', display: 'flex', justifyContent: 'center', gap: '16px' }}>
          {showEmail && (
            <a
              href={`mailto:${AUTHOR_INFO.email}`}
              style={{ color: '#3b82f6', textDecoration: 'none' }}
            >
              {AUTHOR_INFO.email}
            </a>
          )}
          {showLinkedIn && (
            <a
              href={AUTHOR_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#3b82f6', textDecoration: 'none' }}
            >
              LinkedIn
            </a>
          )}
        </p>
      )}
    </footer>
  )
}

/**
 * Minimal ownership text for tight spaces
 */
export function OwnershipText() {
  return (
    <span style={{ fontSize: '11px', color: '#9ca3af' }}>
      © {AUTHOR_INFO.copyrightYears} {AUTHOR_INFO.name}
    </span>
  )
}
