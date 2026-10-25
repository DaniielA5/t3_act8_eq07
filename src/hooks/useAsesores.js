import { useEffect, useState } from 'react'
import { getAsesores } from '../services/asesoresService'

export function useAsesores() {
  const [asesores, setAsesores] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [reloadCount, setReloadCount] = useState(0)

  useEffect(() => {
    let isCancelled = false

    getAsesores()
      .then((asesoresData) => {
        if (!isCancelled) setAsesores(asesoresData)
      })
      .catch((error) => {
        if (!isCancelled) setErrorMessage(error.message)
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false)
      })

    return () => {
      isCancelled = true
    }
  }, [reloadCount])

  function retryLoadAsesores() {
    setIsLoading(true)
    setErrorMessage('')
    setReloadCount((count) => count + 1)
  }

  return { asesores, isLoading, errorMessage, retryLoadAsesores }
}