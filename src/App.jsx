import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'

function App() {
  // Datos del usuario logueado.
  const [user, setUser] = useState(null)
  // Vista activa del sidebar: 'inicio', 'asesores' o 'mis-asesorias'
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

  // Con sesión iniciada se muestra el sistema: sidebar, navbar y la vista activa
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