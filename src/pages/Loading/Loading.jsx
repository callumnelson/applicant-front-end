// css
import styles from './Loading.module.css'

//assets
import logo from '../../assets/branding/logo.svg'

const Loading = () => {
  return (
    <main className={styles.container}>
      <h1>Loading...</h1>
      <img src={logo} alt="appliCANt logo" />
    </main>
  )
}

export default Loading