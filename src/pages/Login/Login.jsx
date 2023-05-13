// npm modules
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// services
import * as authService from '../../services/authService'

// css
import styles from './Login.module.css'

const LoginPage = ({ handleAuthEvt }) => {
  const navigate = useNavigate()

  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = evt => {
    setMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
        throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
      }
      await authService.login(formData)
      handleAuthEvt()
      navigate('/')
    } catch (err) {
      console.log(err)
      setMessage(err.message)
    }
  }

  const { email, password } = formData

  const isFormInvalid = () => {
    return !(email && password)
  }

  return (
    <main className={styles.container}>
      <section>
        LOGO
      </section>
      <section>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <p>{message}</p>
          <label>
            Email
            <input
              type="text"
              value={email}
              name="email"
              onChange={handleChange}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              name="password"
              onChange={handleChange}
            />
          </label>
          <div>
            <button disabled={isFormInvalid()}>LOG IN</button>
            <Link to="/">CANCEL</Link>
          </div>
        </form>
      </section>
    </main>
  )
}

export default LoginPage
