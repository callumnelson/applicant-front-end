// npm modules
import { useState } from "react"

// css
import styles from './ResourceForm.module.css'

const ResourceForm = ({handleAddResource, setAddResource, editedResource, handleUpdateResource, setEditedResource}) => {
  const [formData, setFormData ] = useState(
    editedResource ? editedResource : {
    name: '',
    link: '',
    category: 'Networking',
    instructions: '',
  })

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (editedResource) {
      handleUpdateResource(formData)
    } else {
      handleAddResource(formData)
    }
  }

  const handleCancel = () => {
    if (editedResource) {
      setEditedResource(null)
    } else {
      setAddResource(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.resource}>
          <div className={styles.name}>
            <input
              required
              type="text"
              name="name"
              id="title-input"
              value={formData.name}
              placeholder="Name"
              onChange={handleChange}
            />
          </div>
          <div className={styles.category}>
            <select
              required
              name="category"
              id="category-input"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Networking">Networking</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Job Search">Job Search</option>
              <option value="Resumes">Resumes</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className={styles.link}>
            <input 
            type="text"
            name="link"
            id="link-input"
            value={formData.link}
            placeholder="URL Link to Resource"
            onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.details}>
          <div className={styles.instructions}>
            <textarea
              required
              type="text"
              name="instructions"
              id="text-input"
              value={formData.instructions}
              placeholder="instructions"
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          onClick={() => handleCancel()}
        >
          Cancel
        </button>
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  )
}

export default ResourceForm