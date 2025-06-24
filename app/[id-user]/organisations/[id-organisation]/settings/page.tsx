// components/SettingOrganisation.tsx
'use client'; // This directive is necessary for client-side hooks like useState and useMemo.

import { useState, useMemo } from 'react';
import { usePathname } from 'next/navigation'; // Though not directly used in this component, kept for consistency with your Dashboard.tsx
import SideBarOrganisation from '@/components/SideBarOrganisation'; // Assuming you have this component
import { Search, Plus, UserPlus, Trash2, Edit, XCircle, CheckCircle } from 'lucide-react'; // Icons from lucide-react
import styles from '../../../../../styles/Dashboard.module.css';
// --- Dummy Data (Replace with real data fetching from an API) ---
interface Member {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member' | 'guest';
  status: 'active' | 'invited' | 'inactive';
  lastActive: string; // e.g., "2025-06-20"
}

const initialMembers: Member[] = [
  { id: '1', name: 'Alice Smith', email: 'alice@org.com', role: 'admin', status: 'active', lastActive: '2025-06-22' },
  { id: '2', name: 'Bob Johnson', email: 'bob@org.com', role: 'member', status: 'active', lastActive: '2025-06-21' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@org.com', role: 'member', status: 'invited', lastActive: 'N/A' },
  { id: '4', name: 'Diana Miller', email: 'diana@org.com', role: 'guest', status: 'active', lastActive: '2025-06-18' },
  { id: '5', name: 'Eve Davis', email: 'eve@org.com', role: 'admin', status: 'active', lastActive: '2025-06-23' },
  { id: '6', name: 'Frank White', email: 'frank@org.com', role: 'member', status: 'inactive', lastActive: '2025-05-15' },
];

const availableRoles = ['admin', 'member', 'guest'];
const availableStatuses = ['active', 'invited', 'inactive'];

// --- Main Component ---
export default function SettingOrganisation() {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<'admin' | 'member' | 'guest'>('member');
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [editingMemberRole, setEditingMemberRole] = useState<'admin' | 'member' | 'guest'>('member');

  // Filtered and sorted members
  const filteredMembers = useMemo(() => {
    let filtered = members.filter(member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterRole !== 'all') {
      filtered = filtered.filter(member => member.role === filterRole);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(member => member.status === filterStatus);
    }

    // Sort alphabetically by name
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [members, searchTerm, filterRole, filterStatus]);

  // --- Handlers ---
  const handleInviteMember = () => {
    if (!newMemberEmail || !newMemberRole) {
      alert('Veuillez entrer l\'email et sélectionner un rôle.');
      return;
    }
    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(newMemberEmail)) {
        alert('Veuillez entrer une adresse email valide.');
        return;
    }

    // Simulate sending invitation and adding to list
    const newId = String(members.length + 1); // Simple ID generation
    const newMember: Member = {
      id: newId,
      name: newMemberEmail.split('@')[0], // Simple name extraction
      email: newMemberEmail,
      role: newMemberRole,
      status: 'invited',
      lastActive: 'N/A',
    };
    setMembers(prev => [...prev, newMember]);
    setNewMemberEmail('');
    alert(`Invitation envoyée à ${newMemberEmail} avec le rôle ${newMemberRole}.`);
    // In a real app, you'd make an API call here
  };

  const handleRemoveMember = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir exclure ce membre ? Cette action est irréversible.')) {
      setMembers(prev => prev.filter(member => member.id !== id));
      alert('Membre exclu avec succès.');
      // API call to remove member
    }
  };

  const handleEditRole = (id: string, currentRole: 'admin' | 'member' | 'guest') => {
    setEditingMemberId(id);
    setEditingMemberRole(currentRole);
  };

  const handleSaveRole = (id: string) => {
    setMembers(prev =>
      prev.map(member =>
        member.id === id ? { ...member, role: editingMemberRole } : member
      )
    );
    setEditingMemberId(null);
    alert(`Rôle mis à jour pour le membre ID ${id} à ${editingMemberRole}.`);
    // API call to update role
  };

  const handleCancelEdit = () => {
    setEditingMemberId(null);
  };

  const handleResendInvitation = (memberId: string, memberEmail: string) => {
    alert(`Invitation renvoyée à ${memberEmail}.`);
    // API call to resend invitation
  };

  return (
    <div className={styles.layout}>
      <SideBarOrganisation />

      <main className={styles.content}>
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Paramètres de l'Organisation</h1>

        {/* Members Management Section */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6A flex items-center">
            Gérer les Membres <UserPlus className="ml-2 text-blue-600" size={24} />
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher par nom ou email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Role Filter */}
            <select
              className="w-full sm:w-auto p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="all">Tous les rôles</option>
              {availableRoles.map(role => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)} {/* Capitalize first letter */}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              className="w-full sm:w-auto p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              {availableStatuses.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)} {/* Capitalize first letter */}
                </option>
              ))}
            </select>
          </div>

          {/* Members Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dernière activité</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <tr key={member.id}>
                      <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-900">{member.name}</td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-600">{member.email}</td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-900">
                        {editingMemberId === member.id ? (
                          <select
                            value={editingMemberRole}
                            onChange={(e) => setEditingMemberRole(e.target.value as 'admin' | 'member' | 'guest')}
                            className="p-1 border border-gray-300 rounded-md text-sm"
                          >
                            {availableRoles.map(role => (
                              <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
                            ))}
                          </select>
                        ) : (
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                            ${member.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                             member.role === 'member' ? 'bg-blue-100 text-blue-800' :
                             'bg-gray-100 text-gray-800'}`}>
                            {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${member.status === 'active' ? 'bg-green-100 text-green-800' :
                           member.status === 'invited' ? 'bg-yellow-100 text-yellow-800' :
                           'bg-red-100 text-red-800'}`}>
                          {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-500">{member.lastActive}</td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm font-medium">
                        {editingMemberId === member.id ? (
                          <>
                            <button
                              onClick={() => handleSaveRole(member.id)}
                              className="text-green-600 hover:text-green-900 mr-2"
                              title="Sauvegarder le rôle"
                            >
                              <CheckCircle size={20} />
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="text-red-600 hover:text-red-900"
                              title="Annuler"
                            >
                              <XCircle size={20} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEditRole(member.id, member.role)}
                              className="text-indigo-600 hover:text-indigo-900 mr-2"
                              title="Modifier le rôle"
                            >
                              <Edit size={20} />
                            </button>
                            {member.status === 'invited' ? (
                              <button
                                onClick={() => handleResendInvitation(member.id, member.email)}
                                className="text-blue-600 hover:text-blue-900 mr-2"
                                title="Renvoyer l'invitation"
                              >
                                <UserPlus size={20} />
                              </button>
                            ) : null}
                            <button
                              onClick={() => handleRemoveMember(member.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Exclure le membre"
                            >
                              <Trash2 size={20} />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-gray-500">
                      Aucun membre trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Invite Members Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
            Inviter de Nouveaux Membres <Plus className="ml-2 text-green-600" size={24} />
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <label htmlFor="member-email" className="block text-sm font-medium text-gray-700 mb-1">Email(s)</label>
              <input
                type="email" // Use type="email" for better mobile keyboard and basic validation
                id="member-email"
                placeholder="nom@exemple.com"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-500">Séparez les emails par des virgules si vous en ajoutez plusieurs (non implémenté pour l'instant).</p>
            </div>

            <div className="w-full sm:w-auto">
              <label htmlFor="member-role" className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
              <select
                id="member-role"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newMemberRole}
                onChange={(e) => setNewMemberRole(e.target.value as 'admin' | 'member' | 'guest')}
              >
                {availableRoles.map(role => (
                  <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleInviteMember}
              className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
            >
              <UserPlus className="mr-2" size={20} /> Envoyer l'Invitation
            </button>
          </div>
        </section>

        {/* You can add more sections here, like Role Management or Audit Log */}
      </main>
    </div>
  );
}