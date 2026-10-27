import { apiRequest } from "./apiClient";

const ASESOR_FIELDS = 'firstName,lastName,email,image,university,company'

export async function getAsesores() {
    const data = await apiRequest(`/users?limit=0&select=${ASESOR_FIELDS}`)
    return data.users
} 

export function createAsesor(asesorData ) {
    return apiRequest('/users/add', {
        method: 'POST',
        body: JSON.stringify(asesorData),
    })
}
export function updateAsesor(asesorId, asesorData) { 
    return apiRequest(`/users/${asesorId}`, {
        method: 'PUT',
        body: JSON.stringify(asesorData),
    })
}

export function deleteAsesor(asesorId) { 
    return apiRequest(`/users/${asesorId}`, { method: 'DELETE'})
}