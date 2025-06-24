'use client';

import Link from 'next/link';
import styles from '../../styles/Login.module.css';

export default function LoginPage() {
   function handleSubmit(){
    /* Basically should take the username  & password , send to the backend through a 
    post request, the backend verify if there is 
    a map(username,password or email password) given in the database 
    if yes connect the user if no, if the username (email) is present
    in the username(email) database display incorrect password,if the username
    (email) not present un message d'alerte avec ces id ne correspond
    à aucun user*/
  }
  return (
    <div className={styles.container}>
      <div className={styles.logoText}>
        PARTE<span>NARIS</span>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Connexion</h2>

        <label htmlFor="identifier" className={styles.label}>
          Nom d'utilisateur ou Email
        </label>
        <input
          type="text"
          id="identifier"
          name="identifier"
          required
          className={styles.input}
        />

        <label htmlFor="password" className={styles.label}>
          Mot de passe
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Se connecter
        </button>

        <div className={styles.links}>
          <Link href="/forgot-password" className={styles.link}>
            Mot de passe oublié ?
          </Link>
          <span>
            Pas encore inscrit ?{' '}
            <Link href="/register" className={styles.link}>
              S'inscrire
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
