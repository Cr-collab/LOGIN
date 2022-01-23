import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn , isAuthenticated } = useContext(AuthContext)

  async function handleSubmit(event: FormEvent) {

    event.preventDefault()
    

    const data = {
      email,
      password
    }

     signIn(data)
  }
  return (
    <div className={styles.container}>
      <form onSubmit={(event) =>handleSubmit(event)}>
        <p>email :</p>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <p>password : </p>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button type="submit"> logar </button>
      </form>
    </div>
  )
}
