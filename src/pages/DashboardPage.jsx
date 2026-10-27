import Sidebar from '../componentes/layout/Sidebar'
import Navbar from '../componentes/layout/Navbar'
import './DashboardPage.css'

// TEMPORAL: cuando AsesoresPage.jsx esté listo, se importa y se usa aquí
// import AsesoresPage from './AsesoresPage'

function DashboardPage({ user, activeView, onNavigate, onLogout }) {
  // Decide qué se muestra en el centro según la vista activa del sidebar
  const renderContent = () => {
    if (activeView === 'asesores') {
      // TEMPORAL: reemplazar por <AsesoresPage />
      return <p>Aquí irá la tabla de asesores.</p>
    }
    if (activeView === 'inicio') {
      return <p>Bienvenido, {user.firstName}.</p>
    }
    return <p>Próximamente.</p>
  }

  return (
    <div className="dashboard">
      <Sidebar activeView={activeView} onNavigate={onNavigate} />

      <div className="dashboard-main">
        <Navbar user={user} onLogout={onLogout} />
        <main className="dashboard-content">{renderContent()}</main>
      </div>
    </div>
  )
}

export default DashboardPage