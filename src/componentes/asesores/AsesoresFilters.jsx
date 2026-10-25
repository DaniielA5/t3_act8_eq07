function AsesoresFilters({ searchText, selectedArea, areas, onSearchTextChange, onAreaChange }) {
  return (
    <div className="table-filters">
      <input
        type="search"
        placeholder="Buscar por nombre o correo..."
        aria-label="Buscar asesor"
        value={searchText}
        onChange={(event) => onSearchTextChange(event.target.value)}
      />

      <select
        aria-label="Filtrar por área"
        value={selectedArea}
        onChange={(event) => onAreaChange(event.target.value)}
      >
        <option value="">Todas las áreas</option>
        {areas.map((area) => (
          <option key={area} value={area}>{area}</option>
        ))}
      </select>
    </div>
  )
}

export default AsesoresFilters