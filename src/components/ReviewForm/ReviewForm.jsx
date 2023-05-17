import { useState } from "react"

import styles from './ReviewForm.module.css'

const ReviewForm = ({setReviewFormVisible, setShowButton, selectedResource, handleAddReview, handleUpdateReview, userReview, handleDeleteReview }) => {

  const [formData, setFormData ] = useState(
    userReview ? userReview : {
    rating: 1,
    content: '',
  })

  const handleStarClick = (rating) => {
    setFormData({ ...formData, rating : rating })
  }

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (userReview) {
      handleUpdateReview(selectedResource, userReview, formData)
    } else {
      handleAddReview(selectedResource, formData)
    }
    setReviewFormVisible(false)
    setShowButton(true)
    setFormData({
      rating: 1,
      content: '',
    })
  }

  const handleCancel = () => {
    setReviewFormVisible(false)
    setShowButton(true)
    setFormData({
      rating: 1,
      content: '',
    })
  }

  const handleDeleteClick = () => {
    handleDeleteReview(selectedResource, userReview)
    setReviewFormVisible(false)
    setShowButton(true)
    setFormData({
      rating: 1,
      content: '',
    })
  }

  return (  
    <div className={styles.container}>
      <div className={styles.delete}>
        {userReview && 
          <span
            onClick={() => handleDeleteClick()}
          >
            🗑️
          </span>
        } 
      </div>
      <form
        className={styles.form} 
        onSubmit={handleSubmit}
      >
        <div>
          <textarea
            className={styles.content}
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
          <div className={styles.stars}>
            <span
              className={styles.star}
              onClick={() => handleStarClick(1)}
            >
              ★
            </span>
            <span
              className={styles.star}
              onClick={() => handleStarClick(2)}
            >
              {formData.rating >= 2 ? "★" : "☆"}
            </span>
            <span
              className={styles.star}
              onClick={() => handleStarClick(3)}
            >
              {formData.rating >= 3 ? "★" : "☆"}
            </span>
            <span
              className={styles.star}
              onClick={() => handleStarClick(4)}
            >
              {formData.rating >= 4 ? "★" : "☆"}
            </span>
            <span
              className={styles.star}
              onClick={() => handleStarClick(5)}
            >
              {formData.rating >= 5 ? "★" : "☆"}
            </span>
          </div>
        </div>
        <div className={styles.buttons}>
          <button 
            className={styles.button}
            type="submit" 
          >
            ✅
          </button>
          <button
            className={styles.button}
            onClick={() => handleCancel()}
          >
            ❌
          </button>
        </div>
      </form>
    </div>
  )
}

export default ReviewForm