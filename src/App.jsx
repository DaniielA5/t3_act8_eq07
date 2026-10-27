import { useState } from 'react'
import LoginPage from './pages/LoginPage'

function App() {
  // Datos del usuario logueado.
  const [user, setUser] = useState(null)
  // Vista activa del sidebar (la usará tu compañero con <Sidebar />)
  const [activeView, setActiveView] = useState('asesores')

  // Se ejecuta cuando LoginPage avise que el login salió bien
  const handleLoginSuccess = (loggedUser) => {
    setUser(loggedUser)
  }

  // Borra la sesión y regresa a la pantalla de login
  const handleLogout = () => {
    setUser(null)
    setActiveView('asesores')
  }

  if (!user) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />
  }

  // TEMPORAL: aquí tu compañero pondrá <Navbar />, <Sidebar /> y la tabla
  return (
    <div>
      <h1>Bienvenido, {user.firstName}</h1>
      <img src={user.image} alt={user.username} width="64" />
      <p>Vista activa: {activeView}</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  )
}

export default App