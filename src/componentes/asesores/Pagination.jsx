import { PAGE_SIZE_OPTIONS } from '../../hooks/useTableParams'

function Pagination({ currentPage, totalPages, pageSize, totalItems, onPageChange, onPageSizeChange }) {
  const firstItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const lastItem = Math.min(currentPage * pageSize, totalItems)
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  return (
    <div className="pagination">
      <p className="pagination-info">
        Mostrando {firstItem}–{lastItem} de {totalItems} asesores
      </p>

      <label className="pagination-size">
        Mostrar{' '}
        <select value={pageSize} onChange={(event) => onPageSizeChange(Number(event.target.value))}>
          {PAGE_SIZE_OPTIONS.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>{' '}
        por página
      </label>

      <div className="pagination-controls">
        <button type="button" onClick={() => onPageChange(1)} disabled={isFirstPage}>« Primera</button>
        <button type="button" onClick={() => onPageChange(currentPage - 1)} disabled={isFirstPage}>‹ Anterior</button>
        <span>Página {currentPage} de {totalPages}</span>
        <button type="button" onClick={() => onPageChange(currentPage + 1)} disabled={isLastPage}>Siguiente ›</button>
        <button type="button" onClick={() => onPageChange(totalPages)} disabled={isLastPage}>Última »</button>
      </div>
    </div>
  )
}

export default Pagination