import { FormEventHandler } from 'react'
import { Text, Flex, TextField, Code, Button } from '@radix-ui/themes'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { FullWidthForm } from './styles'

interface Props {
  filterQuery: string
  setFilterQuery: (query: string) => void
  applyFilter: () => void
  error: string | null
}

export const QueryControls = ({
  filterQuery,
  setFilterQuery,
  applyFilter,
  error,
}: Props) => {
  const handleQueryChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setFilterQuery(event.target.value)
  }

  const handleQuerySubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    applyFilter()
  }

  return (
    <FullWidthForm onSubmit={handleQuerySubmit}>
      <TextField.Root>
        <TextField.Input
          size="3"
          placeholder="Filter the results…"
          value={filterQuery}
          onChange={handleQueryChange}
          variant="soft"
          color={error ? 'red' : 'gray'}
        />
        <TextField.Slot pr="0">
          <Button
            radius="none"
            size="3"
            variant="soft"
            color="gray"
            type="submit"
            disabled={!filterQuery.length}
          >
            Search
            <MagnifyingGlassIcon height="16" width="16" />
          </Button>
        </TextField.Slot>
      </TextField.Root>

      <Flex gap="1" mt="2">
        {Boolean(error) && (
          <Text size="2" color="red">
            {error}
          </Text>
        )}
        <Text size="2" color="gray">
          Hint: use the <Code>=</Code>, <Code>=~</Code>, and <Code>AND</Code>{' '}
          operators.
        </Text>
      </Flex>
    </FullWidthForm>
  )
}
