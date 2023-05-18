// npm modules
import { useState } from "react"

// components
import Icon from "../Icon/Icon"

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
    <div className={styles.container}>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className={styles.row}>
          <div>
            <p>
              Resource Info
            </p>
          </div>
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
            required
            type="url"
            name="link"
            id="link-input"
            value={formData.link}
            placeholder="URL Link to Resource"
            onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.detailsCard}>
          <div className={styles.instructions}>
            <h4>Instructions:</h4>
            <textarea
              required
              type="text"
              name="instructions"
              id="text-input"
              value={formData.instructions}
              placeholder="Type resource instructions here..."
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              onClick={() => handleCancel()}
            >
              <Icon category={'Cancel'}/>
            </button>
            <button type="submit">
              <Icon category={'Check'}/>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ResourceForm