import { Container, Flex, Heading, Theme } from '@radix-ui/themes'
import { Table } from '../../components/Table'
import { useMovies } from '../../hooks/useMovies'
import type { Column } from '../../components/Table/types'
import { StyledSunIcon } from './styles'

const columns: Column[] = [
  { key: 'title', title: 'Title', width: 140 },
  { key: 'release_year', title: 'Year', width: 50 },
  { key: 'locations', title: 'Locations', maxWidth: 160 },
  { key: 'production_company', title: 'Company', maxWidth: 120 },
  { key: 'distributor', title: 'Distributor', maxWidth: 120 },
  { key: 'director', title: 'Director', maxWidth: 120 },
  { key: 'writer', title: 'Writer', maxWidth: 120 },
  { key: 'actor_1', title: 'Actor 1', maxWidth: 120 },
  { key: 'actor_2', title: 'Actor 2', maxWidth: 120 },
  { key: 'actor_3', title: 'Actor 3', maxWidth: 120 },
]

const defaultColumns = [
  'title',
  'release_year',
  'locations',
  'production_company',
  'distributor',
  'director',
  'writer',
]

const queryTranslations = {
  Title: 'title',
  Year: 'release_year',
  Locations: 'locations',
  Company: 'production_company',
  Distributor: 'distributor',
  Director: 'director',
  Writer: 'writer',
  'Actor 1': 'actor_1',
  'Actor 2': 'actor_2',
  'Actor 3': 'actor_3',
}

export const TableDemo = () => {
  const { movies, isFetching } = useMovies()

  return (
    <Theme accentColor="cyan">
      <Container size="4">
        <Flex align="center" gap="3">
          <StyledSunIcon width={28} height={28} color="brown" />
          <Heading size="7" my="8" color="gray" trim="both">
            Shot in SF
          </Heading>
        </Flex>
        <Table
          columns={columns}
          defaultColumns={defaultColumns}
          data={movies}
          isFetching={isFetching}
          queryTranslations={queryTranslations}
        ></Table>
      </Container>
    </Theme>
  )
}
