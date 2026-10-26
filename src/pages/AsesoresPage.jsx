import { useState } from 'react'
import { useAsesores } from '../hooks/useAsesores'
import { useTableParams } from '../hooks/useTableParams'
import AsesoresFilters from '../componentes/asesores/AsesoresFilters'
import AsesoresTable from '../componentes/asesores/AsesoresTable'
import AsesorForm from '../componentes/asesores/AsesorForm'
import Pagination from '../componentes/asesores/Pagination'

function AsesoresPage() {
  const {
    asesores,
    isLoading,
    errorMessage,
    retryLoadAsesores,
    addAsesor,
    editAsesor,
    removeAsesor,
  } = useAsesores()
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

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [asesorToEdit, setAsesorToEdit] = useState(null)
  const [pendingAction, setPendingAction] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [actionError, setActionError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  function resetFeedback() {
    setActionError('')
    setSuccessMessage('')
  }

  function handleOpenCreateForm() {
    resetFeedback()
    setAsesorToEdit(null)
    setIsFormOpen(true)
  }

  function handleOpenEditForm(asesor) {
    resetFeedback()
    setAsesorToEdit(asesor)
    setIsFormOpen(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleCloseForm() {
    setIsFormOpen(false)
    setAsesorToEdit(null)
    setActionError('')
  }

  async function handleSubmitAsesorForm(formValues) {
    if (asesorToEdit) {
      setPendingAction({ type: 'edit', asesor: asesorToEdit, formValues })
      return
    }

    setIsSaving(true)
    setActionError('')
    try {
      await addAsesor(formValues)
      handleCloseForm()
      setSuccessMessage(`Se agregó a ${formValues.firstName} ${formValues.lastName} correctamente.`)
      setCurrentPage(1)
    } catch (error) {
      setActionError(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  function handleRequestDelete(asesor) {
    resetFeedback()
    setPendingAction({ type: 'delete', asesor })
  }

  function handleCancelPendingAction() {
    setPendingAction(null)
  }

  async function handleConfirmPendingAction() {
    const { type, asesor, formValues } = pendingAction

    setIsSaving(true)
    setActionError('')
    try {
      if (type === 'edit') {
        await editAsesor(asesor, formValues)
        handleCloseForm()
        setSuccessMessage(`Se actualizaron los datos de ${formValues.firstName} ${formValues.lastName}.`)
      } else {
        await removeAsesor(asesor)
        setSuccessMessage(`Se eliminó a ${asesor.firstName} ${asesor.lastName}.`)
      }
    } catch (error) {
      setActionError(error.message)
    } finally {
      setIsSaving(false)
      setPendingAction(null)
    }
  }

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

  const isDeleteAction = pendingAction?.type === 'delete'
  const pendingAsesorName = pendingAction
    ? `${pendingAction.asesor.firstName} ${pendingAction.asesor.lastName}`
    : ''
  const confirmTitle = isDeleteAction ? 'Eliminar asesor' : 'Guardar cambios'
  const confirmMessage = isDeleteAction
    ? `¿Seguro que quieres eliminar a ${pendingAsesorName}? Esta acción no se puede deshacer.`
    : `¿Guardar los cambios de ${pendingAsesorName}?`
  const confirmText = isDeleteAction ? 'Eliminar' : 'Guardar'

  return (
    <section>
      <div className="page-header">
        <h2>Asesores</h2>
        <button type="button" onClick={handleOpenCreateForm}>+ Agregar asesor</button>
      </div>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {!isFormOpen && actionError && <p className="form-error form-error-box">{actionError}</p>}

      {/* TEMPORAL: se cambia por <ConfirmDialog /> cuando Isaac lo suba */}
      {pendingAction && (
        <div className="confirm-box" role="alertdialog" aria-labelledby="confirm-title">
          <h3 id="confirm-title">{confirmTitle}</h3>
          <p>{confirmMessage}</p>
          <button type="button" onClick={handleCancelPendingAction} disabled={isSaving}>Cancelar</button>
          <button type="button" onClick={handleConfirmPendingAction} disabled={isSaving}>
            {isSaving ? 'Procesando...' : confirmText}
          </button>
        </div>
      )}

      {isFormOpen && (
        <AsesorForm
          key={asesorToEdit?.id ?? 'nuevo'}
          asesorToEdit={asesorToEdit}
          areas={areas}
          isSubmitting={isSaving}
          submitError={actionError}
          onSubmit={handleSubmitAsesorForm}
          onCancel={handleCloseForm}
        />
      )}

      <AsesoresFilters
        searchText={searchText}
        selectedArea={selectedArea}
        areas={areas}
        onSearchTextChange={setSearchText}
        onAreaChange={setSelectedArea}
      />
      <AsesoresTable
        asesores={paginatedAsesores}
        onEditAsesor={handleOpenEditForm}
        onDeleteAsesor={handleRequestDelete}
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