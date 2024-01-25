import { useMemo, useState } from 'react'
import {
  DropdownText,
  StyledTable,
  TableCell,
  TableHeaderRow,
  TableBodyRow,
  StyledTextFieldRoot,
} from './styles'
import { v4 } from 'uuid'
import {
  Box,
  DropdownMenu,
  Flex,
  IconButton,
  Switch,
  TextField,
} from '@radix-ui/themes'
import { MagnifyingGlassIcon, MixerHorizontalIcon } from '@radix-ui/react-icons'

interface Column {
  key: string
  title: string
  singleLine?: boolean
  minWidth?: number
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
    <Box>
      <Flex my="8" gap="3">
        <StyledTextFieldRoot>
          <TextField.Input size="3" placeholder="Filter the results…" />
          <TextField.Slot>
            <IconButton size="3" variant="ghost">
              <MagnifyingGlassIcon height="20" width="20" />
            </IconButton>
          </TextField.Slot>
        </StyledTextFieldRoot>
        <DropdownMenu.Root dir="rtl">
          <DropdownMenu.Trigger>
            <IconButton size="3">
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
      </Flex>
      <StyledTable>
        <thead>
          <TableHeaderRow>
            {columns.map((column) => (
              <TableCell
                as="th"
                singleLine={column.singleLine}
                key={column.key}
              >
                {column.title}
              </TableCell>
            ))}
          </TableHeaderRow>
        </thead>
        <tbody>
          {renderedData.map((row) => (
            <TableBodyRow key={row.id}>
              {columns.map((column) => (
                <TableCell
                  singleLine={column.singleLine}
                  minWidth={column.minWidth}
                  key={`row-${row.id}-col-${column.key}`}
                >
                  {row[column.key] as string | number}
                </TableCell>
              ))}
            </TableBodyRow>
          ))}
        </tbody>
      </StyledTable>
    </Box>
  )
}
