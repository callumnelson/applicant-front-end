import { useState } from "react"

import styles from './ReviewForm.module.css'

const ReviewForm = () => {

  const [formData, setFormData ] = useState({
    rating: 0,
    content: '',
  })

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = (evt) => {}


  return (  
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.content}>
          <textarea
            required
            type="text"
            name="content"
            id="text-input"
            value={formData.content}
            placeholder="What did you think?"
            onChange={handleChange}
          />
        </div>
        <div className={styles.rating}>
        <select
          required
          name="rating"
          id="category-input"
          value={formData.rating}
          onChange={handleChange}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option> 
        </select>
        </div>
      </form>
    </div>
  )
}

export default ReviewForm