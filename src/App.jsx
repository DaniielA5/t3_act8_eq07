import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'

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
    <DashboardPage
      user={user}
      activeView={activeView}
      onNavigate={setActiveView}
      onLogout={handleLogout}
    />
  )
}

export default App