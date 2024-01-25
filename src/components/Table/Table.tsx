import { useMemo, useState } from 'react'
import { StyledTable } from './styles'
import { v4 } from 'uuid'

interface Column {
  key: string
  title: string
}

type RowData = Record<string, string | number>

interface Props {
  columns: Column[]
  displayedColumns: string[]
  data: Array<RowData>
}

type DisplayedData = Record<string, unknown> & { id: string }

export const Table = (props: Props) => {
  const [displayedColumns, setDisplayedColumns] = useState<string[]>(
    props.displayedColumns
  )

  const displayedData: DisplayedData[] = useMemo(
    () =>
      props.data.map((row) => ({
        ...row,
        id: v4()
      })),
    [props.data]
  )

  return (
    <StyledTable>
      <thead>
        <tr>
          {displayedColumns.map((colKey) => (
            <th key={colKey}>
              {props.columns.find((col) => col.key === colKey)?.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {displayedData.map((row) => (
          <tr key={row.id}>
            {displayedColumns.map((colKey) => (
              <td key={`${row.id}-col-${colKey}`}>
                {row[colKey] as string | number}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  )
}
