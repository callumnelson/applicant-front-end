import { useState } from 'react'

import styles from './Reviews.module.css'

import ReviewCard from '../ReviewCard/ReviewCard'
import ReviewForm from '../ReviewForm/ReviewForm'

const Reviews = ({selectedResource, user, handleAddReview, handleUpdateReview, handleDeleteReview, setSelectedResource}) => {
  const [reviewFormVisible, setReviewFormVisible] = useState(false)
  const [showButton, setShowButton] = useState(true)


  const userReview = selectedResource?.reviews.find(review => review.author._id === user.profile)

  const handleReviewButtonClick = () => {
    setReviewFormVisible(true)
    setShowButton(false)
  }


  const handleReviewSort = (evt) => {
    const sortType = evt.target.value
    const sortedReviews = [...selectedResource.reviews].sort((a, b) => {
      if (sortType === 'newest') {
        return new Date(b.updatedAt) - new Date(a.updatedAt)
      } else if (sortType === 'oldest') {
        return new Date(a.updatedAt) - new Date(b.updatedAt)
      } else if (sortType === 'highest') {
        return b.rating - a.rating
      } else if (sortType === 'lowest') {
        return a.rating - b.rating
      }
    })
    setSelectedResource({...selectedResource, reviews: sortedReviews})
  }

  if (!selectedResource) return (
    <>
      <nav className={styles.nav}>
          <h1>Reviews</h1>
      </nav>
      <header className={styles.header}>
        <div>
          <h2>Select a resource to see reviews</h2>
        </div>
      </header>
    </>
  )

  return (  
    <div className={styles.container}>
      <nav className={styles.nav}>
        <h1>
          Reviews
          {(selectedResource.reviews.length > 0) && ' (' + selectedResource.reviews.length + ')'}
        </h1>
      </nav>
      <header className={styles.header}>
          {selectedResource.reviews.length ? 
          <>
            <div className={styles.info}>
              <div className={StyleSheet.average}>
                <h2>
                  {selectedResource.averageRating.toFixed(1)}
                  {' '}
                  {Array.from({ length: Math.floor(selectedResource.averageRating) }, (_, index) => (
                    <span key={index}>★</span>
                  ))}
                </h2>
              </div>
              <div className={styles.rating}>
                <select 
                  id='rating-selector'
                  name='rating-selector'
                  onChange={handleReviewSort}
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="highest">Highest</option>
                  <option value="lowest">Lowest</option>
                </select>
              </div>
            </div>
          </> :
          <header className={styles.header}>
            <h2>Be The First To Review!</h2>
          </header>
          }

        <div className={styles.buttons}>
          {showButton && (
            userReview ? (
              <button
                className={styles.button}
                onClick={() => handleReviewButtonClick()}>Edit My Review</button>
            ) : (
              <button
                className={styles.button} 
                onClick={() => handleReviewButtonClick()}>Add Review</button>
            )
          )}
        </div>
      </header>
      {reviewFormVisible && 
        <div>
          <ReviewForm 
            setReviewFormVisible={setReviewFormVisible} 
            setShowButton={setShowButton} 
            handleAddReview={handleAddReview} 
            selectedResource={selectedResource}
            handleUpdateReview={handleUpdateReview}
            userReview={userReview}
            handleDeleteReview={handleDeleteReview}
          />
        </div>
      }
      <section className={styles.reviews}>
        {selectedResource.reviews.map(review =>
          <ReviewCard key={review._id} review={review} />
        )}
      </section>
    </div>
  )
}

export default Reviews