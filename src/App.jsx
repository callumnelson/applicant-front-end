// npm modules
import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Admin from './pages/Admin/Admin'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import Jobs from './pages/Jobs/Jobs'
import Resources from './pages/Resources/Resources'
import Logout from './pages/Logout/Logout'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as profileService from './services/profileService'
import * as resourceService from './services/resourcesService'

// styles
import './App.css'

function App() {
  const [user, setUser] = useState(authService.getUser())
  const [profile, setProfile] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      setProfile(null)
      return
    }
    const fetchProfile = async () => {
      const data = await profileService.getProfile(user)
      setProfile(data)
    }
    fetchProfile()
  }, [user])

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = () => {
    setUser(authService.getUser())

  }

  const handleAddStarredResource = async (resource, user) => {
    const starredResource = await resourceService.addStarredResource(resource, user)
    setProfile({...profile, starredResources: [starredResource, ...profile.starredResources]})
  }

  const handleRemoveStarredResource = async (resource, user) => {
    const unstarredResource = await resourceService.removeStarredResource(resource, user)
    setProfile({...profile, starredResources: profile.starredResources.filter(r => r._id !== unstarredResource._id)})
  }

  return (
    <>
      <NavBar user={user} profile={profile} handleLogout={handleLogout} />
      <Routes>
        <Route 
          path="/" 
          element={
            <Landing 
              user={user} 
              profile={profile}
              setProfile={setProfile}
              handleRemoveStarredResource={handleRemoveStarredResource}
            />
          } 
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user}>
              <Admin profile={profile} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute user={user}>
              <Jobs 
                user={user}
                profile={profile}
                setProfile={setProfile}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resources"
          element={
            <ProtectedRoute user={user}>
              <Resources 
                user={user}
                profile={profile}
                setProfile={setProfile}
                handleAddStarredResource={handleAddStarredResource}
                handleRemoveStarredResource={handleRemoveStarredResource}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route 
          path="/auth/logout"
          element={<Logout />}
        />
        <Route
          path="/auth/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
