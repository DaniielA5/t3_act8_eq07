import './ErrorMessage.css'

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message" role="alert">
      <p className="error-message-text">{message}</p>

      {/* El botón solo aparece si pasamos onRetry */}
      {onRetry && (
        <button className="error-message-retry" type="button" onClick={onRetry}>
          Reintentar
        </button>
      )}
    </div>
  )
}

export default ErrorMessage