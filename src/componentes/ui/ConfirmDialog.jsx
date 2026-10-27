import Modal from './Modal'
import './ConfirmDialog.css'

function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = 'Confirmar', // si no le pasan texto, dice "Confirmar"
  onConfirm,
  onCancel,
  isConfirming = false,
  isDanger = false,
}) {
  return (
    // onClose del Modal = cancelar (✕, clic en el fondo y Escape)
    <Modal isOpen={isOpen} title={title} onClose={onCancel}>
      <p className="confirm-message">{message}</p>

      <div className="confirm-actions">
        <button
          className="confirm-button confirm-cancel"
          type="button"
          onClick={onCancel}
          disabled={isConfirming}
        >
          Cancelar
        </button>

        {/* isDanger agrega la clase roja; isConfirming desactiva y cambia el texto */}
        <button
          className={`confirm-button ${isDanger ? 'confirm-danger' : 'confirm-primary'}`}
          type="button"
          onClick={onConfirm}
          disabled={isConfirming}
        >
          {isConfirming ? 'Procesando...' : confirmText}
        </button>
      </div>
    </Modal>
  )
}

export default ConfirmDialog