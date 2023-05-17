// services
import * as tokenService from './tokenService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/resources`

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

const create = async (resourceFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resourceFormData),
    })
    return res.json()
  } catch (err) {
    console.log(err)
  }
}

const update = async (resourceFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${resourceFormData._id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resourceFormData),
    })
    return res.json()
  } catch (err) {
    console.log(err)
  }
}

const deleteResource = async (resourceId) => {
  try {
    const res = await fetch(`${BASE_URL}/${resourceId}`, {
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

const createReview = async (resourceId, reviewFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${resourceId}/reviews`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewFormData),
    })
    return res.json()
  } catch (err) {
    console.log(err)
  }
}

const deleteReview = async (resourceId, reviewId) => {
  try {
    const res = await fetch(`${BASE_URL}/${resourceId}/reviews/${reviewId}`, {
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

const updateReview = async (resourceId, reviewId, reviewFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${resourceId}/reviews/${reviewId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewFormData),
    })
    return res.json()
  } catch (err) {
    console.log(err)
  }
}

const addStarredResource = async (resource, user) => {
  try {
    const res = await fetch(`${BASE_URL}/${resource._id}/starredResources/${user.profile}`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resource),
    })
    return res.json()
  }
  catch (err) {
    throw new Error(err)
  }
}

const removeStarredResource = async (resource, user) => {
  try {
    const res = await fetch(`${BASE_URL}/${resource._id}/starredResources/${user.profile}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
      },
    })
    return res.json()
  } catch (err) {
    throw new Error(err)
  }
}

export {
  index,
  create,
  update,
  deleteResource,
  createReview,
  deleteReview,
  updateReview, 
  addStarredResource,
  removeStarredResource,
}