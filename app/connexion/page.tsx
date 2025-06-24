'use client';

import Link from 'next/link';
import styles from '../../styles/Login.module.css';

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.logoText}>
        Tiers<span>360</span>
      </div>

      <form className={styles.form}>
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
