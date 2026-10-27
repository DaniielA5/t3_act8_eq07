import './Navbar.css'

function Navbar({ user, onLogout }) {
  return (
    <header className="navbar">
      <div className="navbar-user">
        {/* Foto y nombre que vienen de la respuesta del login de DummyJSON */}
        <img className="navbar-avatar" src={user.image} alt={user.username} />
        <span className="navbar-name">
          {user.firstName} {user.lastName}
        </span>
      </div>

      <button className="navbar-logout" type="button" onClick={onLogout}>
        Cerrar sesión
      </button>
    </header>
  )
}

export default Navbar