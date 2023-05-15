// npm modules
import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
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
      setProfile({...data, appsToDisplay: data.applications})
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

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} profile={profile} />} />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
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
