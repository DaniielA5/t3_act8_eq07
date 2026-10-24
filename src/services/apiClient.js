const BASE_URL = 'https://dummyjson.com'

export async function apiRequest(endpoint, options = {} ) {
    let response

    try {
        response = await fetch(`${BASE_URL}${endpoint}`, {
            headers: { 'Content-Type': 'application/json' },
            ...options,
        })

    } catch {
        throw new Error ('No se pudo conectar al servidor. Revisa tu conexion a internet. ')

    }
    const data = await response.json().catch(() => null ) 

    if (!response.ok ){
        const error = new Error(data?.message || `Ocurrio un error en la peticion (${response.status}).` )
        error.status = response.status
        throw error
    }

    return data
}