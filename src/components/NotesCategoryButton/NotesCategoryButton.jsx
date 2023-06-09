// css
import styles from './NotesCategoryButton.module.css'

const NotesCategoryButton = ({notesCategory, category, handleNoteCategoryChange}) => {
  return (
    <button
      className={`${styles.container} ${notesCategory===category? styles.selectednote : ''}`}
      onClick={handleNoteCategoryChange}
      value={category}
    >
      {category}
    </button>
  )
}
 
export default NotesCategoryButton