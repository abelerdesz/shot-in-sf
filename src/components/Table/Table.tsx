import { useMemo, useState } from 'react'
import { v4 } from 'uuid'
import { Text, Flex } from '@radix-ui/themes'
import { Spinner } from '../Spinner/Spinner'
import { QueryControls } from './QueryControls'
import { ColumnControls } from './ColumnControls'
import {
  TableElement,
  TableCell,
  TableHeaderRow,
  TableBodyRow,
  TableScrollWrapper,
} from './styles'
import { useDataFilter } from '../../hooks/useDataFilter'
import { EmptyTableMessage } from './EmptyTableMessage/EmptyTableMessage'
import type { Column } from './types'

interface RowData {
  [key: string]: string | number
}

type RenderedRowData = RowData & { id: string }

interface Props {
  columns: Column[]
  defaultColumns: string[]
  data: RowData[]
  isFetching: boolean
  queryTranslations?: { [key: string]: keyof RowData }
}

export const Table = (props: Props) => {
  const [filterQuery, setFilterQuery] = useState('')
  const { applyFilter, isFiltering, results, error } = useDataFilter(
    filterQuery,
    props.data,
    props.queryTranslations
  )
  const [displayedColumns, setDisplayedColumns] = useState(props.defaultColumns)

  const columns = useMemo(
    () =>
      props.columns.filter((column) => displayedColumns.includes(column.key)),
    [props.columns, displayedColumns]
  )

  const renderedResults = useMemo<RenderedRowData[]>(
    () =>
      results.map((row) => ({
        ...row,
        id: v4(),
      })),
    [results]
  )

  if (props.isFetching || isFiltering) {
    return <Spinner />
  }

  return (
    <>
      <Flex mb="8" gap="3">
        <QueryControls
          filterQuery={filterQuery}
          setFilterQuery={setFilterQuery}
          applyFilter={applyFilter}
          error={error}
        />
        <ColumnControls
          columns={props.columns}
          defaultColumns={props.defaultColumns}
          displayedColumns={displayedColumns}
          setDisplayedColumns={setDisplayedColumns}
          isFetching={props.isFetching}
          isFiltering={isFiltering}
        />
      </Flex>

      <TableScrollWrapper>
        <TableElement>
          <thead>
            <TableHeaderRow>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  as="th"
                  singleLine={column.singleLine}
                  width={column.width}
                  maxWidth={column.maxWidth}
                >
                  <Text size="2">{column.title}</Text>
                </TableCell>
              ))}
            </TableHeaderRow>
          </thead>

          <tbody>
            {renderedResults.map((row) => (
              <TableBodyRow key={row.id}>
                {columns.map((column) => (
                  <TableCell
                    key={`row-${row.id}-col-${column.key}`}
                    singleLine={column.singleLine}
                  >
                    <Text size="2">{row[column.key]}</Text>
                  </TableCell>
                ))}
              </TableBodyRow>
            ))}
          </tbody>
        </TableElement>
      </TableScrollWrapper>

      {!renderedResults.length && (
        <EmptyTableMessage>No results!</EmptyTableMessage>
      )}

      {!displayedColumns.length && (
        <EmptyTableMessage>No columns selected.</EmptyTableMessage>
      )}
    </>
  )
}
