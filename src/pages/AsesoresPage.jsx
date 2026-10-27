import { useState } from 'react'
import { useAsesores } from '../hooks/useAsesores'
import { useTableParams } from '../hooks/useTableParams'
import AsesoresFilters from '../componentes/asesores/AsesoresFilters'
import AsesoresTable from '../componentes/asesores/AsesoresTable'
import AsesorForm from '../componentes/asesores/AsesorForm'
import Pagination from '../componentes/asesores/Pagination'
import ConfirmDialog from '../componentes/ui/ConfirmDialog'
import ErrorMessage from '../componentes/ui/ErrorMessage'
import Loader from '../componentes/ui/Loader'
import Modal from '../componentes/ui/Modal'
import './AsesoresPage.css'

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
  }

  function handleCloseForm() {
    setIsFormOpen(false)
    setAsesorToEdit(null)
    setActionError('')
  }

  // El Modal también se cierra con Escape o clic en el fondo: no se permite mientras
  // se guarda o mientras la confirmación de edición está abierta encima del formulario
  function handleRequestCloseForm() {
    if (isSaving || pendingAction) return
    handleCloseForm()
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
    if (isSaving) return
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

  if (isLoading) return <Loader text="Cargando asesores..." />

  if (errorMessage) return <ErrorMessage message={errorMessage} onRetry={retryLoadAsesores} />

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
    <section className="asesores-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Asesores</h1>
          <p className="page-subtitle">Administra a los asesores de la plataforma.</p>
        </div>
        <button className="page-add-button" type="button" onClick={handleOpenCreateForm}>
          + Agregar asesor
        </button>
      </div>

      {successMessage && <p className="success-message" role="status">{successMessage}</p>}
      {!isFormOpen && actionError && <ErrorMessage message={actionError} />}

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

      <Modal
        isOpen={isFormOpen}
        title={asesorToEdit ? 'Editar asesor' : 'Agregar asesor'}
        onClose={handleRequestCloseForm}
      >
        <AsesorForm
          key={asesorToEdit?.id ?? 'nuevo'}
          asesorToEdit={asesorToEdit}
          areas={areas}
          isSubmitting={isSaving}
          submitError={actionError}
          onSubmit={handleSubmitAsesorForm}
          onCancel={handleRequestCloseForm}
        />
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(pendingAction)}
        title={confirmTitle}
        message={confirmMessage}
        confirmText={confirmText}
        onConfirm={handleConfirmPendingAction}
        onCancel={handleCancelPendingAction}
        isConfirming={isSaving}
        isDanger={isDeleteAction}
      />
    </section>
  )
}

export default AsesoresPage
