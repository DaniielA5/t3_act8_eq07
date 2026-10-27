import { useState } from 'react'
import { loginUser } from '../services/authService'
import './LoginPage.css'

function LoginPage({ onLoginSuccess }) {
  // Lo que el usuario escribe en cada campo
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // Errores de validación por campo.
  const [fieldErrors, setFieldErrors] = useState({})
  // Error que viene de la API.
  const [submitError, setSubmitError] = useState('')
  // true mientras se espera la respuesta; desactiva el botón
  const [isLoading, setIsLoading] = useState(false)


  const validateFields = () => {
    const errors = {}
    if (!username.trim()) errors.username = 'Escribe tu usuario o correo.'
    if (!password.trim()) errors.password = 'Escribe tu contraseña.'
    return errors
  }

  const handleSubmit = async (event) => {
    event.preventDefault() // evita que el form recargue la página
    setSubmitError('')

    // Si hay errores de validación, los muestra y NO llama a la API
    const errors = validateFields()
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    setIsLoading(true)
    try {
      const user = await loginUser(username.trim(), password)
      onLoginSuccess(user) // le pasa el usuario a App.jsx
    } catch (error) {
      setSubmitError(error.message) // muestra el error en pantalla
    } finally {
      setIsLoading(false) // se ejecuta siempre, salga bien o mal
    }
  }

  return (
    <main className="login-page">
      {/* noValidate: desactiva las validaciones del navegador para usar las nuestras */}
      <form className="login-card" onSubmit={handleSubmit} noValidate>
        <h1 className="login-title">Iniciar sesión</h1>
        <p className="login-subtitle">Plataforma de asesorías</p>

        <label className="login-label" htmlFor="username">Usuario</label>
        {/* Input controlado: React guarda el valor en el estado con cada tecla */}
        <input
          id="username"
          className="login-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="emilys"
          autoComplete="username"
        />
        {/* Se muestra solo si existe ese error */}
        {fieldErrors.username && <p className="login-error">{fieldErrors.username}</p>}

        <label className="login-label" htmlFor="password">Contraseña</label>
        <input
          id="password"
          className="login-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          autoComplete="current-password"
        />
        {fieldErrors.password && <p className="login-error">{fieldErrors.password}</p>}

        {submitError && <p className="login-error login-error-box">{submitError}</p>}

        {/* Mientras carga, el botón se desactiva y cambia el texto */}
        <button className="login-button" type="submit" disabled={isLoading}>
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </main>
  )
}

export default LoginPage