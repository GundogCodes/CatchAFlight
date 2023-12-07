import Image from 'next/image'
import styles from './page.module.css'
import FrontPage from './Pages/FrontPage/FrontPage'

export default function Home() {
  return (
    <main className={styles.main}>
      <FrontPage />
    </main>
  )
}
