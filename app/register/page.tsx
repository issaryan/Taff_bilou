'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Register.module.css';

export default function RegisterPage() {
    function handleSubmit(){
        /* Doit etre implement mais typiquement recupere les données de tous 
        les champs ,verifie si l'username figure
        les enregistres dans la BD puis clear  data field et 
        affiche le message d'alerte inscription valider à l'écran 
        et redirige l'utilisateur vers la page login*/
    }
  

  return (
    <div className={styles.container}>
      <div className={styles.logoText}>
        PARTE<span>NARIS</span>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}
      >
        <h2 className={styles.title}>Inscription</h2>

        <label htmlFor="username" className={styles.label}>
          Nom d'utilisateur
        </label>
        <input
          type="text"
          id="username"
          name="username"
          required
          className={styles.input}
         /* onChange={Verifie que le username entrer n'est pas présent 
            dans la BD }*/
        />

        <label htmlFor="email" className={styles.label}>
          Adresse email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className={styles.input}
          /*onChange={Verifie que l'email entrer n'est pas présent 
            dans la BD }*/
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

        <label htmlFor="confirmPassword" className={styles.label}>
          Confirmer le mot de passe
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          S’inscrire
        </button>

        <div className={styles.links}>
          <span>
            Déjà inscrit ?{' '}
            <Link href="/login" className={styles.link}>
              Se connecter
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
