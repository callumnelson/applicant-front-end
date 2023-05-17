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


  return (  
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
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
              onClick={() => handleStarClick(1)}
            >
              ★
            </span>
            <span
              onClick={() => handleStarClick(2)}
            >
              {formData.rating >= 2 ? "★" : "☆"}
            </span>
            <span
              onClick={() => handleStarClick(3)}
            >
              {formData.rating >= 3 ? "★" : "☆"}
            </span>
            <span
              onClick={() => handleStarClick(4)}
            >
              {formData.rating >= 4 ? "★" : "☆"}
            </span>
            <span
              onClick={() => handleStarClick(5)}
            >
              {formData.rating >= 5 ? "★" : "☆"}
            </span>
          </div>
        </div>
        <div>
          {userReview && 
            <button
              onClick={() => handleDeleteReview(selectedResource, userReview)}
            >
              Delete
            </button>
          } 
          <button type="submit" >
            {userReview ? 'Update' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ReviewForm