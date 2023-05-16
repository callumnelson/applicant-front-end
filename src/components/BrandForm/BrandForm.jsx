import { useState } from "react"

import styles from './BrandForm.module.css'

const BrandForm = ({handleAddBrand, brandStatement}) => {
  const [formData, setFormData] = useState({brandStatement: `${brandStatement}`})

  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    handleAddBrand(formData)
  }

  return ( 
    <main>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="brandStatement"></label>
        <input 
          type="text" 
          name="brandStatement" 
          value={formData.brandStatement} 
          placeholder="Add link to brand statement"
          autoComplete="off"
          onChange={handleChange}
        />
        <button type="submit">✅</button>
      </form>
    </main>
  )
}

export default BrandForm