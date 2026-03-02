/**
 * @headless/license - License Blocked Page Component
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
import { AUTHOR_INFO } from '../constants'

interface LicenseBlockedPageProps {
  result: LicenseCheckResult
}

/**
 * Full-page component displayed when license is invalid in 'enforce' mode
 * Shows author information and contact details prominently
 */
export function LicenseBlockedPage({ result }: LicenseBlockedPageProps) {
  const author = result.author || AUTHOR_INFO

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <title>License Required - SmartFront</title>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              body {
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                color: #fff;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
              }
              .container {
                max-width: 600px;
                text-align: center;
                background: rgba(255, 255, 255, 0.05);
                padding: 60px 40px;
                border-radius: 20px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
              }
              .logo {
                font-size: 64px;
                margin-bottom: 24px;
              }
              h1 {
                font-size: 32px;
                margin-bottom: 16px;
                font-weight: 700;
              }
              .error-message {
                color: #fbbf24;
                margin-bottom: 32px;
                font-size: 16px;
                line-height: 1.6;
              }
              .author-section {
                background: rgba(255, 255, 255, 0.1);
                padding: 32px;
                border-radius: 16px;
                margin-top: 32px;
              }
              .author-label {
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 2px;
                opacity: 0.7;
                margin-bottom: 8px;
              }
              .author-name {
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 8px;
              }
              .author-title {
                opacity: 0.8;
                margin-bottom: 24px;
                font-size: 14px;
              }
              .contact-link {
                color: #60a5fa;
                text-decoration: none;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                margin: 12px 0;
                font-size: 16px;
                transition: color 0.2s;
              }
              .contact-link:hover {
                color: #93c5fd;
                text-decoration: underline;
              }
              .copyright {
                margin-top: 40px;
                font-size: 12px;
                opacity: 0.6;
                line-height: 1.8;
              }
              .badge {
                display: inline-block;
                background: rgba(251, 191, 36, 0.2);
                color: #fbbf24;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 12px;
                margin-top: 16px;
              }
            `,
          }}
        />
      </head>
      <body>
        <div className="container">
          <div className="logo">🔐</div>
          <h1>SmartFront License Required</h1>
          <p className="error-message">
            {result.status.error || 'A valid license is required to use this platform.'}
            <br />
            Please contact the author to obtain a license.
          </p>

          <div className="author-section">
            <div className="author-label">Creator & Intellectual Property Owner</div>
            <div className="author-name">{author.name}</div>
            <div className="author-title">
              SmartFront Headless E-commerce Platform
            </div>

            <a className="contact-link" href={`mailto:${author.email}`}>
              📧 {author.email}
            </a>
            <a
              className="contact-link"
              href={author.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              💼 LinkedIn Profile
            </a>

            <div className="badge">
              Created Outside Work Hours
            </div>
          </div>

          <p className="copyright">
            Copyright © {author.copyrightYears} {author.name}. All Rights Reserved.
            <br />
            This software is protected by intellectual property laws.
            <br />
            Unauthorized use, copying, or distribution is prohibited.
          </p>
        </div>
      </body>
    </html>
  )
}
