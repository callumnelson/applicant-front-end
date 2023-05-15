import { useState } from "react";

import styles from './BrandForm.module.css'

const BrandForm = ({handleAddBrand}) => {
  const [formData, setFormData] = useState({brand: ''})

  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    handleAddBrand(formData)
    setFormData({brand: ''})
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
          autoComplete="off"
          onChange={handleChange}
        />
        <button type="submit">✅</button>
      </form>
    </main>
  )
}

export default BrandForm