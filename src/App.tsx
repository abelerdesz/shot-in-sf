import { Container, Heading, Theme } from '@radix-ui/themes'
import { useMovies } from './hooks/useMovies'
import { Table } from './components/Table'

export const App = () => {
  const { movies } = useMovies()
  const columns = [
    { key: 'title', title: 'Title', minWidth: 170 },
    { key: 'release_year', title: 'Year', singleLine: true },
    { key: 'locations', title: 'Locations' },
    { key: 'production_company', title: 'Company' },
    { key: 'distributor', title: 'Distributor' },
    { key: 'director', title: 'Director' },
    { key: 'writer', title: 'Writer' },
    { key: 'actor_1', title: 'Actor 1' },
    { key: 'actor_2', title: 'Actor 2' },
    { key: 'actor_3', title: 'Actor 3' },
  ]

  return (
    <Theme>
      <Container size="4">
        <Heading size="8" my="7">
          Shot in SF
        </Heading>
        {movies && (
          <Table
            columns={columns}
            displayedColumns={['title', 'release_year', 'locations']}
            data={movies}
          ></Table>
        )}
      </Container>
    </Theme>
  )
}
