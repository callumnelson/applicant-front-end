import { useState } from "react";

import styles from './BrandForm.module.css'

const BrandForm = () => {
  const [formData, setFormData] = useState({brand: ''})

  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()

  }

  return ( 
    <main className={styles.form}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="brand"></label>
        <input 
          type="text" 
          name="brand" 
          value={formData.brand} 
          placeholder="Add link to branding statement" 
          onChange={handleChange}
        />
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  )
}

export default BrandForm