

// app/members/page.tsx ou pages/members.tsx (ajustez le chemin selon votre routeur)
'use client'; // Indique que ce composant s'exécute côté client
import styles from '../../../../../styles/Dashboard.module.css';
import { useState, useMemo } from 'react';
import SideBarOrganisation from '@/components/SideBarOrganisation'; // Votre composant de barre latérale
import { Users, Search, ChevronUp, ChevronDown } from 'lucide-react'; // Icônes pour la recherche et le tri

// --- Données factices (à remplacer par un appel API réel) ---
interface Member {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member' | 'guest';
}

const allMembers: Member[] = [
  { id: '1', name: 'Alice Smith', email: 'alice@org.com', role: 'admin' },
  { id: '2', name: 'Bob Johnson', email: 'bob@org.com', role: 'member' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@org.com', role: 'member' },
  { id: '4', name: 'Diana Miller', email: 'diana@org.com', role: 'guest' },
  { id: '5', name: 'Eve Davis', email: 'eve@org.com', role: 'admin' },
  { id: '6', name: 'Frank White', email: 'frank@org.com', role: 'member' },
  { id: '7', name: 'Grace Lee', email: 'grace@org.com', role: 'member' },
  { id: '8', name: 'Henry King', email: 'henry@org.com', role: 'guest' },
];

type SortKey = 'name' | 'email' | 'role'; // Clés possibles pour le tri

// --- Composant principal ---
export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name'); // Clé de tri par défaut
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc'); // Direction de tri par défaut

  // Logique de filtrage et de tri
  const displayedMembers = useMemo(() => {
    let filtered = allMembers.filter(member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Tri des membres
    filtered.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [allMembers, searchTerm, sortKey, sortDirection]);

  // Gérer le changement de tri
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc'); // Réinitialiser à ascendant pour une nouvelle colonne
    }
  };

  // Icône de tri
  const SortIcon = ({ currentKey }: { currentKey: SortKey }) => {
    if (sortKey === currentKey) {
      return sortDirection === 'asc' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />;
    }
    return null;
  };

  return (
    <div className={styles.layout}>
      <SideBarOrganisation />

      <main className={styles.content}>
        <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
          Membres de l'Organisation <Users className="ml-3 text-blue-600" size={32} />
        </h1>

        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-700">Liste des Membres</h2>
            {/* Barre de recherche */}
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher un membre..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Tableau des membres */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">Nom <SortIcon currentKey="name" /></div>
                  </th>
                  <th
                    className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => handleSort('email')}
                  >
                    <div className="flex items-center">Email <SortIcon currentKey="email" /></div>
                  </th>
                  <th
                    className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => handleSort('role')}
                  >
                    <div className="flex items-center">Rôle <SortIcon currentKey="role" /></div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {displayedMembers.length > 0 ? (
                  displayedMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="py-3 px-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.name}</td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-600">{member.email}</td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${member.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                           member.role === 'member' ? 'bg-blue-100 text-blue-800' :
                           'bg-gray-100 text-gray-800'}`}>
                          {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-6 text-center text-gray-500">
                      Aucun membre trouvé correspondant à la recherche.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}