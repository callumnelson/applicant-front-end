// services
import * as tokenService from './tokenService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/profiles`

async function getAllProfiles() {
  try {
    const res = await fetch(BASE_URL, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
  }
}

async function addPhoto(photoData) {
  try {
    const photoFormData = new FormData()
    photoFormData.append('photo', photoData)
    const profileId = tokenService.getUserFromToken().profile
    const res = await fetch(`${BASE_URL}/${profileId}/add-photo`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
      body: photoFormData,
    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
  }
}

async function getProfile(user) {
  try {
    const res = await fetch(`${BASE_URL}/${user.profile}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
  }
}

async function createResume(user, resumeFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${user.profile}/resume`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resumeFormData),
    })
    return res.json()
  } catch (err) {
    throw new Error(err)
  }
}

async function createBrandStatement(user, brandFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${user.profile}/brand`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(brandFormData),
    })
    return res.json()
  } catch (err) {
    throw new Error(err)
  }
}


export { 
  getAllProfiles, 
  addPhoto,
  getProfile,
  createResume,
  createBrandStatement
}
