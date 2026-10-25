import { useAsesores } from '../hooks/useAsesores'
import AsesoresTable from '../componentes/asesores/AsesoresTable'

function AsesoresPage() {
  const { asesores, isLoading, errorMessage, retryLoadAsesores } = useAsesores()

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

  return (
    <section>
      <h2>Asesores</h2>
      <AsesoresTable
        asesores={asesores.slice(0, 10)}
        onEditAsesor={handleEditAsesor}
        onDeleteAsesor={handleDeleteAsesor}
      />
    </section>
  )
}

export default AsesoresPage