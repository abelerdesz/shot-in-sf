import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Text, TextField } from '@radix-ui/themes'

export const StyledTable = styled.table`
  width: 100%;
  border-spacing: 0;
`

export const DropdownText = styled(Text)`
  pointer-events: none;
`

export const TableHeaderRow = styled.tr`
  background-color: var(--accent-4);
`

export const TableBodyRow = styled.tr`
  &:nth-child(even) {
    background-color: var(--accent-3);
  }
`

export const TableCell = styled.td<{
  singleLine?: boolean
  minWidth?: number
}>(
  (props) => css`
    text-align: left;
    vertical-align: top;
    padding: var(--space-3);

    ${props.singleLine && 'white-space: nowrap;'}
    ${props.minWidth && `min-width: ${props.minWidth}px;`}
  `
)

export const StyledTextFieldRoot = styled(TextField.Root)`
  flex-grow: 1;
`
