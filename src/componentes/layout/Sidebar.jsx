import './Sidebar.css'

// Opciones del menú: value es lo que recibe onNavigate
const MENU_ITEMS = [
  { value: 'inicio', label: 'Inicio' },
  { value: 'asesores', label: 'Asesores' },
  { value: 'mis-asesorias', label: 'Mis asesorías' },
]

function Sidebar({ activeView, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">AyudITO</div>

      <nav className="sidebar-nav">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.value}
            type="button"
            // Si es la vista activa, agrega la clase que la resalta
            className={`sidebar-item ${activeView === item.value ? 'sidebar-item-active' : ''}`}
            onClick={() => onNavigate(item.value)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar