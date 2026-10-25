import { useAsesores } from '../hooks/useAsesores'
import { useTableParams } from '../hooks/useTableParams'
import AsesoresFilters from '../componentes/asesores/AsesoresFilters'
import AsesoresTable from '../componentes/asesores/AsesoresTable'
import Pagination from '../componentes/asesores/Pagination'

function AsesoresPage() {
  const { asesores, isLoading, errorMessage, retryLoadAsesores } = useAsesores()
  const {
    searchText,
    selectedArea,
    pageSize,
    currentPage,
    setSearchText,
    setSelectedArea,
    setPageSize,
    setCurrentPage,
  } = useTableParams()

  // Se conectan con el CRUD más adelante
  function handleEditAsesor() {}
  function handleDeleteAsesor() {}

  if (isLoading) return <p>Cargando asesores...</p>

  if (errorMessage) {
    return (
      <div>
        <p>{errorMessage}</p>
        <button type="button" onClick={retryLoadAsesores}>Reintentar</button>
      </div>
    )
  }

  const areas = [...new Set(asesores.map((asesor) => asesor.company?.department).filter(Boolean))].sort()

  const normalizedSearch = searchText.trim().toLowerCase()
  const filteredAsesores = asesores.filter((asesor) => {
    const fullName = `${asesor.firstName} ${asesor.lastName}`.toLowerCase()
    const email = asesor.email?.toLowerCase() ?? ''
    const matchesSearch = fullName.includes(normalizedSearch) || email.includes(normalizedSearch)
    const matchesArea = selectedArea === '' || asesor.company?.department === selectedArea
    return matchesSearch && matchesArea
  })

  const totalPages = Math.max(1, Math.ceil(filteredAsesores.length / pageSize))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const startIndex = (safeCurrentPage - 1) * pageSize
  const paginatedAsesores = filteredAsesores.slice(startIndex, startIndex + pageSize)

  return (
    <section>
      <h2>Asesores</h2>
      <AsesoresFilters
        searchText={searchText}
        selectedArea={selectedArea}
        areas={areas}
        onSearchTextChange={setSearchText}
        onAreaChange={setSelectedArea}
      />
      <AsesoresTable
        asesores={paginatedAsesores}
        onEditAsesor={handleEditAsesor}
        onDeleteAsesor={handleDeleteAsesor}
      />
      <Pagination
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={filteredAsesores.length}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
      />
    </section>
  )
}

export default AsesoresPage