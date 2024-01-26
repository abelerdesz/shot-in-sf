import { DropdownMenu, Flex, IconButton, Switch } from '@radix-ui/themes'
import {
  CircleBackslashIcon,
  CircleIcon,
  MixerHorizontalIcon,
} from '@radix-ui/react-icons'
import { Spinner } from '../../Spinner/Spinner'
import { DropdownText, FullWidthDropdownSeparator } from './styles'
import type { Column } from '../types'

interface Props {
  columns: Column[]
  defaultColumns: string[]
  displayedColumns: string[]
  setDisplayedColumns: (columns: string[]) => void
  isFetching: boolean
  isFiltering: boolean
}

export const ColumnControls = ({
  columns,
  displayedColumns,
  setDisplayedColumns,
  isFetching,
  isFiltering,
}: Props) => {
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

  const handleSelectAllColumns = (event: Event) => {
    event.preventDefault()
    setDisplayedColumns(columns.map((column) => column.key))
  }

  const handleSelectNoColumns = (event: Event) => {
    event.preventDefault()
    setDisplayedColumns([])
  }

  if (isFetching || isFiltering) {
    return <Spinner />
  }

  return (
    <DropdownMenu.Root dir="rtl">
      <DropdownMenu.Trigger>
        <IconButton size="3" variant="outline">
          <MixerHorizontalIcon width={20} height={20} />
        </IconButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        {columns.map((column) => (
          <DropdownMenu.Item
            key={column.key}
            onSelect={(e) => handleColumnSelect(e, column)}
          >
            <DropdownText as="label" size="2">
              <Flex gap="3">
                <Switch
                  size="1"
                  checked={displayedColumns.includes(column.key)}
                />{' '}
                {column.title}
              </Flex>
            </DropdownText>
          </DropdownMenu.Item>
        ))}

        <FullWidthDropdownSeparator />

        <DropdownMenu.Item onSelect={handleSelectAllColumns}>
          <Flex align="center" gap="2">
            <CircleIcon />
            Select all
          </Flex>
        </DropdownMenu.Item>

        <DropdownMenu.Item onSelect={handleSelectNoColumns}>
          <Flex align="center" gap="2">
            <CircleBackslashIcon />
            Clear all
          </Flex>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
