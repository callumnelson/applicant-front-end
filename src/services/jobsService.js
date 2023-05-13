// services
import * as tokenService from './tokenService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/jobs`

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: {'Authorization': `Bearer ${tokenService.getToken()}`}
    })
    return res.json()
  } catch (err) {
    console.log(err)
  }
}

const create = async (jobFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobFormData),
    })
    return res.json()
  } catch (err) {
    console.log(err)
  }
}

const update = async (jobFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${jobFormData._id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobFormData),
    })
    return res.json()
  } catch (err) {
    console.log(err)
  }
}

const deleteJob = async (jobId) => {
  try {
    const res = await fetch(`${BASE_URL}/${jobId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      }
    })
    return res.json()
  } catch (err) {
    console.log(err)
  }
}

const createNote = async (jobId, noteFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${jobId}/notes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteFormData),
    })
    return res.json()
  } catch (err) {
    console.log(err)
  }
}

const deleteNote = async (jobId, noteId) => {
  try {
    const res = await fetch(`${BASE_URL}/${jobId}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
      },
    })
    return res.json()
  } catch (err) {
    console.log(err)
  }
}

{
  index,
  create,
  update,
  deleteJob,
  createNote,
  deleteNote
}