import { useEffect, useState } from 'react'
import { createAsesor, deleteAsesor, getAsesores, updateAsesor } from '../services/asesoresService'

function buildAsesorPayload(asesorFormData) {
  return {
    firstName: asesorFormData.firstName.trim(),
    lastName: asesorFormData.lastName.trim(),
    email: asesorFormData.email.trim(),
    university: asesorFormData.university.trim(),
    company: { department: asesorFormData.department },
  }
}

function isNotFoundForLocalAsesor(error, asesor) {
  return asesor.isLocal && error.status === 404
}

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

  async function addAsesor(asesorFormData) {
    const payload = buildAsesorPayload(asesorFormData)
    const avatarSeed = `${payload.firstName}${payload.lastName}`.toLowerCase()
    const createdAsesor = await createAsesor({
      ...payload,
      image: `https://dummyjson.com/icon/${encodeURIComponent(avatarSeed)}/128`,
    })

    setAsesores((currentAsesores) => {
      const nextId = Math.max(0, ...currentAsesores.map((asesor) => asesor.id)) + 1
      return [{ ...createdAsesor, id: nextId, isLocal: true }, ...currentAsesores]
    })
  }

  async function editAsesor(asesorToEdit, asesorFormData) {
    const payload = buildAsesorPayload(asesorFormData)

    try {
      await updateAsesor(asesorToEdit.id, payload)
    } catch (error) {
      if (!isNotFoundForLocalAsesor(error, asesorToEdit)) throw error
    }

    setAsesores((currentAsesores) =>
      currentAsesores.map((asesor) =>
        asesor.id === asesorToEdit.id
          ? { ...asesor, ...payload, company: { ...asesor.company, ...payload.company } }
          : asesor,
      ),
    )
  }

  async function removeAsesor(asesorToDelete) {
    try {
      await deleteAsesor(asesorToDelete.id)
    } catch (error) {
      if (!isNotFoundForLocalAsesor(error, asesorToDelete)) throw error
    }

    setAsesores((currentAsesores) =>
      currentAsesores.filter((asesor) => asesor.id !== asesorToDelete.id),
    )
  }

  return {
    asesores,
    isLoading,
    errorMessage,
    retryLoadAsesores,
    addAsesor,
    editAsesor,
    removeAsesor,
  }
}