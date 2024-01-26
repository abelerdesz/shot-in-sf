import styled from '@emotion/styled'
import { DropdownMenu, Text } from '@radix-ui/themes'

export const DropdownText = styled(Text)`
  pointer-events: none;
`

export const FullWidthDropdownSeparator = styled(DropdownMenu.Separator)`
  margin-left: calc(-1 * var(--base-menu-content-padding));
  margin-right: calc(-1 * var(--base-menu-content-padding));
`
