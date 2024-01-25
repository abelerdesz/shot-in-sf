export interface Movie {
  title: string
  release_year: number
  locations: string
  production_company: string
  distributor: string
  director: string
  writer: string
  actor_1: string
  actor_2: string
  actor_3: string

  // Make interface play nice with Record<string, string | number>
  [key: string]: string | number
}
