import './AsesoresTable.css'

function AsesoresTable({ asesores, onEditAsesor, onDeleteAsesor }) {
  if (asesores.length === 0) {
    return <p className="table-empty">No se encontraron asesores.</p>
  }

  return (
    <div className="table-wrapper">
      <table className="asesores-table">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Universidad</th>
            <th>Área</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {asesores.map((asesor) => (
            <tr key={asesor.id}>
              <td>
                <img
                  className="asesor-avatar"
                  src={asesor.image}
                  alt={`Foto de ${asesor.firstName}`}
                  width="40"
                  height="40"
                />
              </td>
              <td className="asesor-name">{asesor.firstName} {asesor.lastName}</td>
              <td>{asesor.email}</td>
              <td>{asesor.university}</td>
              <td>
                {asesor.company?.department && (
                  <span className="area-badge">{asesor.company.department}</span>
                )}
              </td>
              <td>
                <div className="table-actions">
                  <button className="table-action" type="button" onClick={() => onEditAsesor(asesor)}>
                    Editar
                  </button>
                  <button
                    className="table-action table-action-danger"
                    type="button"
                    onClick={() => onDeleteAsesor(asesor)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AsesoresTable
