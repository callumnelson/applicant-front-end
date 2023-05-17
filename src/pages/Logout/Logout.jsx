// css
import styles from './Logout.module.css'

//assets
import logo from '../../assets/branding/logo.svg'

const Logout = () => {
  return (
    <main className={styles.container}>
      <img src={logo} alt="appliCANt logo" />
      <h2> See you soon! </h2>
    </main>
  )
}

export default Logout