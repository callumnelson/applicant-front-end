// npm modules
import { useState } from "react"

// css
import styles from './NewResource.module.css'

const NewResource = ({handleAddResource, setAddResource}) => {
  const [formData, setFormData ] = useState({
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
		handleAddResource(formData)
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
              value={formData.title}
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
          onClick={() => setAddResource(false)}
        >
          Cancel
        </button>
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  )
}

export default NewResource