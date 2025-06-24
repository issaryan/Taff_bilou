// Dashboard.tsx
'use client';
import { usePathname } from 'next/navigation';
import styles from '../styles/Dashboard.module.css';


import { LogOut } from 'lucide-react';


export default function SideBarOrganisation() {
  const pathname = usePathname();

  return (
   
      <aside className={styles.sidebar}>
        <div className={styles.logo}>PARTENARIS</div>
        <div className={styles.organisation}>OrganisationX</div>
        <nav className={styles.nav}>
  <a href="/id-user/organisations/id-organisation" className={pathname === '/id-user/organisations/id-organisation' ? styles.active : ''}>Dashboard</a>
  <a href="/id-user/organisations/id-organisation/clients" className={pathname === '/id-user/organisations/id-organisation/clients' ? styles.active : ''}>Clients</a>
  <a href="/id-user/organisations/id-organisation/fournisseurs" className={pathname === '/id-user/organisations/id-organisation/fournisseurs' ? styles.active : ''}>Fournisseurs</a>
  <a href="/id-user/organisations/id-organisation/partenaires" className={pathname === '/id-user/organisations/id-organisation/partenaires' ? styles.active : ''}>Partenaires</a>
  <a href="/id-user/organisations/id-organisation/commerciales"  className={pathname === '/id-user/organisations/id-organisation/commerciales' ? styles.active : ''}>Commerciales</a>
 
    <a href="/utilisateurs" className={pathname === '/utilisateurs' ? styles.active : ''}>Utilisateurs</a>
  
  <a href="/parametres" className={pathname === '/parametres' ? styles.active : ''}>Paramètres</a>
</nav>

        <button className={styles.logout}>
          <LogOut size={20} />
          Déconnexion
        </button>
      </aside>
  );
}
