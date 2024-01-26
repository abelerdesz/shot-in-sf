import { useEffect, useState } from 'react'

const EXACT_MATCH_OPERATOR = '='
const PARTIAL_MATCH_OPERATOR = '=~'
const AND_OPERATOR = ' AND '

const isDefined = <T>(argument: T | undefined): argument is T => {
  return argument !== undefined && argument !== null
}

const isValidRuleString = (ruleString: string) =>
  Boolean(ruleString.length) && !ruleString.endsWith(AND_OPERATOR.trim())

const parseRuleString = (ruleString: string) => {
  if (ruleString.includes(PARTIAL_MATCH_OPERATOR)) {
    const parts = ruleString.split(PARTIAL_MATCH_OPERATOR)
    const trimmedParts = parts.map((part) => part.trim())

    if (
      trimmedParts.length === 2 &&
      trimmedParts.every((part) => part.length)
    ) {
      const [key, value] = parts.map((part) => part.trim())
      return { key, value, condition: 'partial' }
    }
  } else if (ruleString.includes(EXACT_MATCH_OPERATOR)) {
    const parts = ruleString.split(EXACT_MATCH_OPERATOR)
    const trimmedParts = parts.map((part) => part.trim())

    if (
      trimmedParts.length === 2 &&
      trimmedParts.every((part) => part.length)
    ) {
      const [key, value] = parts.map((part) => part.trim())
      return { key, value, condition: 'exact' }
    }
  }
}

export const useDataFilter = <T extends Record<string, string | number>>(
  query: string,
  data: T[],
  queryTranslations?: { [key: string]: keyof T }
) => {
  const [isFiltering, setIsFiltering] = useState(false)
  const [results, setResults] = useState<T[]>(data)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setResults(data)
  }, [data])

  if (!query.length && error) {
    setError(null)
  }

  const applyFilter = () => {
    setIsFiltering(true)
    const ruleStrings = query.length ? query.trim().split(AND_OPERATOR) : []
    const validRules = ruleStrings
      .filter(isValidRuleString)
      .map(parseRuleString)
      .filter(isDefined)

    if (ruleStrings.length !== validRules.length) {
      setError('There seems to be an error in your query.')
    } else {
      setError(null)
      setResults(
        data.filter((item) => {
          return validRules.every((rule) => {
            const key = queryTranslations
              ? queryTranslations[rule.key]
              : rule.key
            if (rule.condition === 'exact') {
              return String(item[key]) === rule.value
            } else if (rule.condition === 'partial') {
              return String(item[key]).includes(rule.value)
            }
          })
        })
      )
    }

    setIsFiltering(false)
  }

  return {
    applyFilter,
    isFiltering,
    results,
    error,
  }
}
