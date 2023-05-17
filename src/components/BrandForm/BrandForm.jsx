//npm modules
import { useState } from "react"
import { TextField } from "@mui/material"

//css
import styles from './BrandForm.module.css'

//components
import Icon from "../Icon/Icon"

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
        <label htmlFor="standard-basic"></label>
        <TextField
          type="text"
          id="standard-basic"
          label="brand statement URL"
          variant="standard"
          outline="none"
          name="brandStatement" 
          value={formData.brandStatement} 
          placeholder="Add link to brand statement"
          autoComplete="off"
          onChange={handleChange}
        />
        <button type="submit"><Icon category="Check" /></button>
      </form>
    </main>
  )
}

export default BrandForm