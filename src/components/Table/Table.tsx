import { useMemo, useState } from 'react'
import { DropdownText, StyledTable } from './styles'
import { v4 } from 'uuid'
import { Box, DropdownMenu, Flex, IconButton, Switch } from '@radix-ui/themes'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'

interface Column {
  key: string
  title: string
}

interface RowData {
  [key: string]: string | number
}

type RenderedRowData = RowData & { id: string }

interface Props {
  columns: Column[]
  displayedColumns: string[]
  data: RowData[]
}

export const Table = (props: Props) => {
  const [displayedColumns, setDisplayedColumns] = useState(
    props.displayedColumns
  )

  const columns = useMemo(
    () =>
      props.columns.filter((column) => displayedColumns.includes(column.key)),
    [props.columns, displayedColumns]
  )

  const handleColumnSelect = (e: Event, selectedColumn: Column) => {
    e.preventDefault()

    if (displayedColumns.includes(selectedColumn.key)) {
      setDisplayedColumns(
        displayedColumns.filter((column) => column !== selectedColumn.key)
      )
    } else {
      setDisplayedColumns([...displayedColumns, selectedColumn.key])
    }
  }

  const renderedData = useMemo<RenderedRowData[]>(
    () =>
      props.data.map((row) => ({
        ...row,
        id: v4(),
      })),
    [props.data]
  )

  return (
    <Box position="relative">
      <Box position="absolute" top="0" right="0">
        <DropdownMenu.Root dir="rtl">
          <DropdownMenu.Trigger>
            <IconButton>
              <MixerHorizontalIcon width={20} height={20} />
            </IconButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            {props.columns.map((column) => (
              <DropdownMenu.Item
                key={column.key}
                onSelect={(e) => handleColumnSelect(e, column)}
              >
                <DropdownText as="label" size="2">
                  <Flex gap="2">
                    <Switch checked={displayedColumns.includes(column.key)} />{' '}
                    {column.title}
                  </Flex>
                </DropdownText>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Box>
      <StyledTable>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {renderedData.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={`row-${row.id}-col-${column.key}`}>
                  {row[column.key] as string | number}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </Box>
  )
}
