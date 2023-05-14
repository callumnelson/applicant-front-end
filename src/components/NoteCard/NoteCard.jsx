// css
import styles from './NoteCard.module.css'

const NoteCard = ({note}) => {
  return (
    <div className={styles.container}>
      <h4>{note.title}</h4>
      <p>{note.content}</p>
      <p>{new Date(note.createdAt).toLocaleDateString()}</p>
    </div>
  )
}
 
export default NoteCard