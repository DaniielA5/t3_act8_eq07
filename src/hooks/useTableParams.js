import { useSearchParams } from 'react-router-dom'

export const PAGE_SIZE_OPTIONS = [10, 20, 40, 50]
const DEFAULT_PAGE_SIZE = 10

export function useTableParams() {
  const [searchParams, setSearchParams] = useSearchParams()

  const searchText = searchParams.get('q') ?? ''
  const selectedArea = searchParams.get('area') ?? ''

  const limitFromUrl = Number(searchParams.get('limit'))
  const pageSize = PAGE_SIZE_OPTIONS.includes(limitFromUrl) ? limitFromUrl : DEFAULT_PAGE_SIZE

  const pageFromUrl = Number(searchParams.get('page'))
  const currentPage = Number.isInteger(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1

  function updateParams(newValues, { replace = false } = {}) {
    const nextParams = new URLSearchParams(searchParams)

    Object.entries(newValues).forEach(([key, value]) => {
      if (value === '' || value === null || value === undefined) {
        nextParams.delete(key)
      } else {
        nextParams.set(key, String(value))
      }
    })

    setSearchParams(nextParams, { replace })
  }

  return {
    searchText,
    selectedArea,
    pageSize,
    currentPage,
    setSearchText: (text) => updateParams({ q: text, page: 1 }, { replace: true }),
    setSelectedArea: (area) => updateParams({ area, page: 1 }),
    setPageSize: (size) => updateParams({ limit: size, page: 1 }),
    setCurrentPage: (page) => updateParams({ page }),
  }
}