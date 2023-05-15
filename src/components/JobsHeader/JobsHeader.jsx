// css
import styles from './JobsHeader.module.css'

const JobsHeader = ({headers, sort, handleUpdateSort}) => {
  return (
    <header>
      {headers.map(header => (
        <div key={header.col} className={styles[header]}>
          <h4 
            id={header.schemaName}
            onClick={handleUpdateSort}
          >
            {header.col} {sort.schemaName === header.schemaName ? 
              sort.order > 0 ? 
                '⌃' : '⌄'
              : ''}
          </h4>
        </div>
      ))}
    </header>
  )
}
 
export default JobsHeader