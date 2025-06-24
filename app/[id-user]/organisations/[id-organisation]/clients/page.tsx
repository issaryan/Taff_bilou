// Dashboard.tsx
'use client';
import { usePathname } from 'next/navigation';
import styles from '../../../../../styles/Dashboard.module.css';
import SideBarOrganisation from '../../../../../components/SideBarOrganisation';
import Link from 'next/link';

export default function Dashboard() {

   const clients = [
    {
      id: 1,
      shortname: 'ACME',
      categorie: 'Entreprise',
      geolocalisation: 'Paris, France',
      adresse: '123 Rue Lafayette',
      telephone: '+33 1 23 45 67 89',
    },
    {
      id: 2,
      shortname: 'Globex',
      categorie: 'Startup',
      geolocalisation: 'Lyon, France',
      adresse: '456 Avenue des Champs',
      telephone: '+33 4 56 78 90 12',
    },
    {
      id: 3,
      shortname: 'Soylent',
      categorie: 'ONG',
      geolocalisation: 'Marseille, France',
      adresse: '789 Boulevard National',
      telephone: '+33 6 78 90 12 34',
    },
  ];
 
  return (
    <div className={styles.layout}>
    <SideBarOrganisation/> 

      <main className={styles.content}>
       <main className="flex-1 p-6">
         <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Liste des clients</h1>
          <Link href="/id-user/organisations/id-organisation/clients/new">
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm">
              Ajouter un client
            </button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                <th className="p-4 border-b">ID</th>
                <th className="p-4 border-b">Shortname</th>
                <th className="p-4 border-b">Catégorie</th>
                <th className="p-4 border-b">Géolocalisation</th>
                <th className="p-4 border-b">Adresse principale</th>
                <th className="p-4 border-b">Téléphone</th>
                <th className="p-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50 text-sm">
                  <td className="p-4 border-b">{client.id}</td>
                  <td className="p-4 border-b">{client.shortname}</td>
                  <td className="p-4 border-b">{client.categorie}</td>
                  <td className="p-4 border-b">{client.geolocalisation}</td>
                  <td className="p-4 border-b">{client.adresse}</td>
                  <td className="p-4 border-b">{client.telephone}</td>
                  <td className="p-4 border-b space-x-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs">Voir</button>
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-xs">Modifier</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      </main>
    </div>
  );
}
