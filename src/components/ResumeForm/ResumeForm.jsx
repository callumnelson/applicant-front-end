import { useState } from "react";

import styles from './ResumeForm.module.css'

const BrandForm = () => {
  const [formData, setFormData] = useState({resume: ''})

  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()

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
          onChange={handleChange}
        />
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  )
}

export default BrandForm