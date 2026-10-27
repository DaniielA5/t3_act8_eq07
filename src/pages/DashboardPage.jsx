import Sidebar from '../componentes/layout/Sidebar'
import Navbar from '../componentes/layout/Navbar'
import AsesoresPage from './AsesoresPage'
import './DashboardPage.css'

function DashboardPage({ user, activeView, onNavigate, onLogout }) {
  // Decide qué se muestra en el centro según la vista activa del sidebar
  const renderContent = () => {
    if (activeView === 'asesores') {
      return <AsesoresPage />
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