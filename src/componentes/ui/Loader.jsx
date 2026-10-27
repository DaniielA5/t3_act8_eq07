import './Loader.css'

function Loader({ text = 'Cargando...' }) {
  return (
    // role="status" avisa a lectores de pantalla que algo está cargando
    <div className="loader" role="status">
      <span className="loader-spinner" />
      <p className="loader-text">{text}</p>
    </div>
  )
}

export default Loader