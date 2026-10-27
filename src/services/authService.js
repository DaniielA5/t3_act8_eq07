import { apiRequest } from './apiClient'

export async function loginUser(username, password) {
  try {
    return await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password, expiresInMins: 30 }),
    })
  } catch (error) {
    // DummyJSON responde 400 cuando las credenciales no son válidas
    if (error.status === 400) {
      throw new Error('Usuario o contraseña incorrectos.')
    }
    throw error
  }
}