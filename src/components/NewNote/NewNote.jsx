// npm imports
import { useState } from "react"

// css 
import styles from './NewNote.module.css'

const NewNote = ({notesCategory, handleAddNote}) => {
  const [formData, setFormData] = useState({ 
    notesCategory,
    title: '',
    content: '' 
  })

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleAddNote(formData)
    setFormData({ ...formData, title: '', content: '' })
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input
        required
        type="text"
        name="title"
        id="title-input"
        value={formData.title}
        placeholder="Add a Note"
        onChange={handleChange}
      />
      <textarea
        required
        type="text"
        name="content"
        id="content-input"
        value={formData.content}
        placeholder="Type your note here..."
        onChange={handleChange}
      />
      <button type="submit">✅</button>
    </form>
  )
}

export default NewNote