import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const TableScrollWrapper = styled.div`
  overflow-x: scroll;
  border-radius: var(--radius-4);
`

export const TableElement = styled.table`
  width: 100%;
  border-spacing: 0;
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
  width?: number
  maxWidth?: number
  as?: string
}>(
  (props) => css`
    text-align: left;
    vertical-align: top;
    padding: var(--space-4);

    ${props.as === 'th' && 'padding: var(--space-4) var(--space-4);'}
    ${props.singleLine && 'white-space: nowrap;'}
    ${props.width && `width: ${props.width}px;`}
    ${props.maxWidth && `max-width: ${props.maxWidth}px;`}
  `
)
