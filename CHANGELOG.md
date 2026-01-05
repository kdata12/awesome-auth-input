# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-01-04

### Added

- Added ability to copy full auth code value to clipboard using Ctrl/Cmd+C

### Fixed

- Fixed accessibility issue with `aria-label` on `AuthCode.Input` components. Now correctly uses actual DOM position instead of user-provided `index` prop, ensuring accurate screen reader announcements regardless of index values (e.g., non-sequential or duplicate indices).
- Fixed bug where first input would not receive focus when auth code was cleared via controlled `value` prop

### Changed

- Added internal tracking of input rendering order for improved accessibility compliance. The `inputElements` ref now stores both the element and its position.

## [0.1.0] - 2025-12-29

### Added

- Initial release
- `AuthCode.Group` component for managing OTP input state
- `AuthCode.Input` component for individual character inputs
- Numeric, alphabetic, alphanumeric, and custom validation patterns
- Controlled and uncontrolled component modes
- Auto-submit functionality when all fields are filled
- Password/masked input mode
- Full keyboard navigation (arrow keys, backspace, paste)
- Hidden input for native form submission
- TypeScript support with exported types
- Accessible ARIA labels and focus management
- Storybook documentation

