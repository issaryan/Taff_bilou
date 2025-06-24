'use client';


import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoText}>
          PARTE<span>NARIS</span>
        </div>

        <div className={styles.buttons}>
          <Link href="/login">
            <button className={styles.button}>Connexion</button>
          </Link>
          <Link href="/register">
            <button className={styles.buttonSecondary}>Inscription</button>
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <h1>
          Bienvenue sur <span className={styles.brand}>PARTENARIS</span>
        </h1>
        <p>Une solution complète pour gérer vos partenaires, clients et fournisseurs.</p>
        <p>Optimisez la relation, la visibilité et la performance de vos tiers.</p>
      </main>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} Tiers 360. Tous droits réservés.
      </footer>
    </div>
  );
}
