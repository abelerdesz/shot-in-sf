import { useEffect, useState } from 'react'
import type { Movie } from '../types/Movie'

const MOVIES_JSON_URL = 'https://data.sfgov.org/resource/yitu-d5am.json'
const textDecoder = new TextDecoder('utf-8')

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[] | null>(null)
  const [hasError, setError] = useState(false)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        const resp = await fetch(MOVIES_JSON_URL)

        if (resp.body) {
          const reader = resp.body.getReader()
          let json = ''
          let reading = true

          while (reading) {
            const { done, value } = await reader.read()

            if (value) {
              const chunkString = textDecoder.decode(value)
              json += chunkString
            }

            if (done) {
              const moviesFromJson = JSON.parse(json)
              setMovies(moviesFromJson)
              reading = false
            }
          }
        }
      } catch (e) {
        setError(true)
      }

      setLoading(false)
    }

    fetchMovies()
  }, [])

  return {
    movies,
    hasError,
    isLoading
  }
}
