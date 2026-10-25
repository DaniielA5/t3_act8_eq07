import { useAsesores } from '../hooks/useAsesores'
import { useTableParams } from '../hooks/useTableParams'
import AsesoresTable from '../componentes/asesores/AsesoresTable'
import Pagination from '../componentes/asesores/Pagination'

function AsesoresPage() {
  const { asesores, isLoading, errorMessage, retryLoadAsesores } = useAsesores()
  const { pageSize, currentPage, setPageSize, setCurrentPage } = useTableParams()

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

  const totalPages = Math.max(1, Math.ceil(asesores.length / pageSize))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const startIndex = (safeCurrentPage - 1) * pageSize
  const paginatedAsesores = asesores.slice(startIndex, startIndex + pageSize)

  return (
    <section>
      <h2>Asesores</h2>
      <AsesoresTable
        asesores={paginatedAsesores}
        onEditAsesor={handleEditAsesor}
        onDeleteAsesor={handleDeleteAsesor}
      />
      <Pagination
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={asesores.length}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
      />
    </section>
  )
}

export default AsesoresPage