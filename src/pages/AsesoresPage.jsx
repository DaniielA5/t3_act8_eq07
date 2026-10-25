import { useAsesores } from '../hooks/useAsesores'

function AsesoresPage() {
  const { asesores, isLoading, errorMessage, retryLoadAsesores } = useAsesores()

  if (isLoading) return <p>Cargando asesores...</p>
  if (errorMessage) {
    return (
      <div>
        <p>{errorMessage}</p>
        <button onClick={retryLoadAsesores}>Reintentar</button>
      </div>
    )
  }

  return <p>Se cargaron {asesores.length} asesores. Primero: {asesores[0]?.firstName} ({asesores[0]?.company?.department})</p>
}

export default AsesoresPage