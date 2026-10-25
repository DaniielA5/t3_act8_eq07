function AsesoresTable({ asesores, onEditAsesor, onDeleteAsesor }) {
  if (asesores.length === 0) {
    return <p className="table-empty">No se encontraron asesores.</p>
  }

  return (
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
                src={asesor.image}
                alt={`Foto de ${asesor.firstName}`}
                width="40"
                height="40"
              />
            </td>
            <td>{asesor.firstName} {asesor.lastName}</td>
            <td>{asesor.email}</td>
            <td>{asesor.university}</td>
            <td>{asesor.company?.department}</td>
            <td>
              <button type="button" onClick={() => onEditAsesor(asesor)}>Editar</button>
              <button type="button" onClick={() => onDeleteAsesor(asesor)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default AsesoresTable