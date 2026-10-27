import { useState } from 'react'
import './AsesorForm.css'

const TEXT_FIELDS = [
  { name: 'firstName', label: 'Nombre', type: 'text' },
  { name: 'lastName', label: 'Apellido', type: 'text' },
  { name: 'email', label: 'Correo', type: 'email' },
  { name: 'university', label: 'Universidad', type: 'text' },
]

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getInitialValues(asesor) {
  return {
    firstName: asesor?.firstName ?? '',
    lastName: asesor?.lastName ?? '',
    email: asesor?.email ?? '',
    university: asesor?.university ?? '',
    department: asesor?.company?.department ?? '',
  }
}

function validateAsesorForm(values) {
  const errors = {}
  if (!values.firstName.trim()) errors.firstName = 'Escribe el nombre.'
  if (!values.lastName.trim()) errors.lastName = 'Escribe el apellido.'
  if (!values.email.trim()) {
    errors.email = 'Escribe el correo.'
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Escribe un correo válido (ejemplo@correo.com).'
  }
  if (!values.university.trim()) errors.university = 'Escribe la universidad.'
  if (!values.department) errors.department = 'Elige un área.'
  return errors
}

function AsesorForm({ asesorToEdit, areas, isSubmitting, submitError, onSubmit, onCancel }) {
  const [formValues, setFormValues] = useState(() => getInitialValues(asesorToEdit))
  const [fieldErrors, setFieldErrors] = useState({})

  const submitLabel = asesorToEdit ? 'Guardar cambios' : 'Agregar asesor'

  function handleFieldChange(event) {
    const { name, value } = event.target
    setFormValues((currentValues) => ({ ...currentValues, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const errors = validateAsesorForm(formValues)
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return
    onSubmit(formValues)
  }

  return (
    <form className="asesor-form" onSubmit={handleSubmit} noValidate>
      {TEXT_FIELDS.map((field) => (
        <div className="form-field" key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            value={formValues[field.name]}
            onChange={handleFieldChange}
          />
          {fieldErrors[field.name] && <p className="form-error">{fieldErrors[field.name]}</p>}
        </div>
      ))}

      <div className="form-field">
        <label htmlFor="department">Área</label>
        <select id="department" name="department" value={formValues.department} onChange={handleFieldChange}>
          <option value="">Selecciona un área</option>
          {areas.map((area) => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
        {fieldErrors.department && <p className="form-error">{fieldErrors.department}</p>}
      </div>

      {submitError && <p className="form-error form-error-box">{submitError}</p>}

      <div className="form-actions">
        <button className="form-cancel" type="button" onClick={onCancel} disabled={isSubmitting}>Cancelar</button>
        <button className="form-submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : submitLabel}
        </button>
      </div>
    </form>
  )
}

export default AsesorForm