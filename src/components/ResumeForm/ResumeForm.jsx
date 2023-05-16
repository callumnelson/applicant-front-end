import { useState } from "react"

import styles from './ResumeForm.module.css'

const ResumeForm = ({handleAddResume}) => {
  const [formData, setFormData] = useState({baseResume: ''})

  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    handleAddResume(formData)
    setFormData({baseResume: ''})
  }

  return ( 
    <main >
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="baseResume"></label>
        <input 
          type="text" 
          name="baseResume" 
          value={formData.baseResume} 
          placeholder="Add link to resume"
          autoComplete="off"
          onChange={handleChange}
        />
        <button type="submit">✅</button>
      </form>
    </main>
  )
}

export default ResumeForm