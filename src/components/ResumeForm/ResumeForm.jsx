//npm modules
import { useState } from "react"
import { TextField } from "@mui/material"

//css
import styles from './ResumeForm.module.css'

//components
import Icon from "../Icon/Icon"

const ResumeForm = ({handleAddResume, resume}) => {
  const [formData, setFormData] = useState({baseResume: `${resume}`})

  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    handleAddResume(formData)
  }

  return ( 
    <main >
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="standard-basic"></label>
        <TextField
          type="text"
          id="standard-basic"
          label="resume URL"
          variant="standard"
          outline="none" 
          name="baseResume" 
          value={formData.baseResume} 
          placeholder="Add link to resume"
          autoComplete="off"
          onChange={handleChange}
        />
        <button type="submit"><Icon category="Check"/></button>
      </form>
    </main>
  )
}

export default ResumeForm