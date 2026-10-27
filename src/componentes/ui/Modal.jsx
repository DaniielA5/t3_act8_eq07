import { useEffect } from 'react'
import './Modal.css'

function Modal({ isOpen, title, onClose, children }) {
  // Cierra el modal al presionar Escape (solo mientras está abierto)
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    // Limpieza: quita el listener cuando se cierra o se desmonta
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Si no está abierto, no renderiza nada
  if (!isOpen) return null

  return (
    // Clic en el fondo oscuro cierra el modal
    <div className="modal-overlay" onClick={onClose}>
      {/* stopPropagation: un clic dentro de la ventana no debe cerrarla */}
      <div
        className="modal-window"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" type="button" onClick={onClose} aria-label="Cerrar">
            ✕
          </button>
        </header>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}

export default Modal