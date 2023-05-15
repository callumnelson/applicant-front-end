import { useState } from "react";

import styles from './ResumeForm.module.css'

const ResumeForm = ({handleAddResume}) => {
  const [formData, setFormData] = useState({resume: ''})

  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    handleAddResume(formData)
    setFormData({resume: ''})
  }

  return ( 
    <main className={styles.form}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="resume"></label>
        <input 
          type="text" 
          name="resume" 
          value={formData.resume} 
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