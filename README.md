# @headless/license

License management system for SmartFront Headless E-commerce Platform.

## Author

**Roman Tsehynka**
- GitHub: [rtsehynka](https://github.com/rtsehynka)
- Email: roman.tsehynka@gmail.com
- LinkedIn: [Profile](https://www.linkedin.com/in/roman-tsehynka-%F0%9F%87%BA%F0%9F%87%A6-61646812a/)

## Copyright

Copyright (c) 2024-2026 Roman Tsehynka. All Rights Reserved.

This software was created by Roman Tsehynka outside of regular work hours as a
personal project. All intellectual property rights belong exclusively to
Roman Tsehynka.

## Description

This package provides license management and usage tracking capabilities for the
SmartFront Headless E-commerce Platform. It is a required dependency that:

- Tracks platform usage (domains, access times)
- Documents intellectual property ownership
- Provides configurable enforcement modes
- Integrates at the core application level

## Installation

This package is included as a workspace dependency:

```bash
yarn workspace smartfront add @headless/license
```

## Usage

### Basic License Check

```typescript
import { checkLicense } from '@headless/license'

const result = await checkLicense()

if (result.showWarning) {
  console.log(result.warningMessage)
}
```

### Layout Integration

```typescript
import { checkLicense, LicenseWarning } from '@headless/license'

export default async function Layout({ children }) {
  const license = await checkLicense()

  return (
    <>
      {license.showWarning && <LicenseWarning />}
      {children}
    </>
  )
}
```

### Get Author Information

```typescript
import { getAuthorInfo } from '@headless/license'

const author = getAuthorInfo()
// { name: 'Roman Tsehynka', email: '...', linkedin: '...' }
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `LICENSE_MODE` | Operating mode: `track`, `warn`, `enforce` | `track` |
| `LICENSE_SERVER_URL` | URL for usage reporting | - |
| `SMARTFRONT_LICENSE_KEY` | License key (for enforce mode) | - |

### License Modes

| Mode | Behavior |
|------|----------|
| `track` | Silent usage tracking only |
| `warn` | Track + show ownership warning banner |
| `enforce` | Block access without valid license |

## API Reference

### Functions

#### `checkLicense(): Promise<LicenseCheckResult>`

Performs license check and usage reporting.

```typescript
interface LicenseCheckResult {
  allowed: boolean
  showWarning: boolean
  warningMessage?: string
  author: AuthorInfo
}
```

#### `reportUsage(data?: Partial<UsageReport>): Promise<void>`

Reports usage data to license server.

#### `getAuthorInfo(): AuthorInfo`

Returns author/owner information.

#### `getLicenseMode(): LicenseMode`

Returns current operating mode.

### Components

#### `<LicenseWarning />`

Warning banner component for displaying ownership notice.

#### `<OwnershipFooter />`

Footer component with author attribution.

## License

UNLICENSED - Proprietary software owned by Roman Tsehynka.

See [LICENSE](./LICENSE) and [OWNERSHIP.md](./OWNERSHIP.md) for details.

## Important Notice

This package is a required dependency of the SmartFront Platform. Removal or
modification of this package:

1. May cause platform malfunction
2. Constitutes breach of license terms
3. Removes intellectual property documentation
4. May result in legal action

For licensing inquiries, contact: roman.tsehynka@gmail.com
