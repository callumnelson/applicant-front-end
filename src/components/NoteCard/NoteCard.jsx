// css
import styles from './NoteCard.module.css'

const NoteCard = ({note, handleDeleteNote, selectedJob}) => {
  return (
    <div className={styles.container}>
      <header>
        <h4>{note.title}</h4>
        <p
          onClick={() => handleDeleteNote(selectedJob, note)}
        >🗑️</p>
      </header>
      <p>{note.content}</p>
      <p>{new Date(note.createdAt).toLocaleDateString()}</p>
    </div>
  )
}
 
export default NoteCard