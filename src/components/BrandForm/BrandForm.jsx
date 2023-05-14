import { useState } from "react";

import styles from './BrandForm.module.css'

const BrandForm = () => {
  const [formData, setFormData] = useState({text: ''})

  return ( 
    <form action="">
      <label htmlFor="brand"></label>
      <input 
        type="text" 
        name="brand" 
        value={formData.brand} 
        placeholder="Add link to branding statment" 
      />
      <button type="submit">SUBMIT</button>
    </form>
  )
}

export default BrandForm