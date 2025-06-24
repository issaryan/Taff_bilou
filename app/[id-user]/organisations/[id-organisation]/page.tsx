// Dashboard.tsx
'use client';
import { usePathname } from 'next/navigation';
import styles from '../../../../styles/Dashboard.module.css';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
} from 'recharts';
import { LogOut } from 'lucide-react';
import SideBarOrganisation from '@/components/SideBarOrganisation';


const pieData = [
  { name: 'Clients', value: 30 },
  { name: 'Fournisseurs', value: 25 },
  { name: 'Partenaires', value: 20 },
  { name: 'Commerciales', value: 25 },
];

const COLORS = ['#0070f3', '#00c49f', '#ffbb28', '#ff4d4f'];

const lineData = [
  { month: 'Jan', value: 12 },
  { month: 'Feb', value: 18 },
  { month: 'Mar', value: 24 },
  { month: 'Apr', value: 30 },
  { month: 'May', value: 40 },
  { month: 'Jun', value: 38 },
];

const topCommerciaux = [
  { name: 'Alice', value: 50 },
  { name: 'Bob', value: 45 },
  { name: 'Charlie', value: 40 },
  { name: 'David', value: 35 },
  { name: 'Emma', value: 30 },
];

const topFournisseurs = [
  { name: 'F1 Corp', value: 70 },
  { name: 'F2 SARL', value: 60 },
  { name: 'F3 Ltd', value: 55 },
  { name: 'F4 Inc.', value: 50 },
  { name: 'F5 Global', value: 45 },
];

const partenairesFideles = [
  { name: 'Partenaire A', value: 90 },
  { name: 'Partenaire B', value: 80 },
  { name: 'Partenaire C', value: 75 },
  { name: 'Partenaire D', value: 70 },
  { name: 'Partenaire E', value: 65 },
];

const recentActivity = [
  'Client Dupont ajouté le 23 mai',
  'Fournisseur X mis à jour le 22 mai',
  'Partenaire A ajouté le 21 mai',
  'Commercial Emma enregistré le 20 mai',
];
const userRole = 'admin'; // ou 'visiteur' (à remplacer par une vraie logique d'authentification plus tard)
const clientsActifs = 120;
const evolutionClients = [
  { year: '2020', value: 40 },
  { year: '2021', value: 60 },
  { year: '2022', value: 85 },
  { year: '2023', value: 100 },
  { year: '2024', value: 120 },
];

const fournisseursActifs = 65;

const partenairesFidelesCount = 45;

const evolutionPartenaires = [
  { year: '2020', value: 10 },
  { year: '2021', value: 20 },
  { year: '2022', value: 30 },
  { year: '2023', value: 38 },
  { year: '2024', value: 45 },
];

const repartitionClientsRegion = [
  { name: 'Nord', value: 30 },
  { name: 'Sud', value: 25 },
  { name: 'Est', value: 20 },
  { name: 'Ouest', value: 15 },
  { name: 'Centre', value: 30 },
];

const fournisseursSansContrat = 12;

export default function Dashboard() {
  const pathname = usePathname();
  const totalTiers = pieData.reduce((sum, d) => sum + d.value, 0);
  const growthRate = (((lineData[5].value - lineData[4].value) / lineData[4].value) * 100).toFixed(1);

  return (
    <div className={styles.layout}>
    <SideBarOrganisation/> 

      <main className={styles.content}>
        <h1 className={styles.title}>Tableau de bord</h1>

        <div className={styles.cards}>
          {/* Clients actifs */}
<div className={styles.card}>
  <h3>Clients Actifs</h3>
  <p className={styles.value}>{clientsActifs}</p>
</div>

{/* Évolution Clients */}
<div className={styles.cardWide}>
  <h3>Évolution Annuelle des Clients</h3>
  <ResponsiveContainer width="100%" height={250}>
    <LineChart data={evolutionClients}>
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <Line type="monotone" dataKey="value" stroke="#00bcd4" strokeWidth={3} />
    </LineChart>
  </ResponsiveContainer>
</div>

{/* Fournisseurs actifs */}
<div className={styles.card}>
  <h3>Fournisseurs Actifs</h3>
  <p className={styles.value}>{fournisseursActifs}</p>
</div>

{/* Top 5 commerciaux */}
<div className={styles.card}>
  <h3>Top 5 Commerciaux</h3>
  <ResponsiveContainer width="100%" height={200}>
    <BarChart data={topCommerciaux}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#673ab7" radius={[10, 10, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
</div>

{/* Partenaires fidèles */}
<div className={styles.card}>
  <h3>Partenaires Fidèles</h3>
  <p className={styles.value}>{partenairesFidelesCount}</p>
</div>

{/* Évolution Partenaires */}
<div className={styles.cardWide}>
  <h3>Évolution Annuelle des Partenaires</h3>
  <ResponsiveContainer width="100%" height={250}>
    <LineChart data={evolutionPartenaires}>
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <Line type="monotone" dataKey="value" stroke="#ff9800" strokeWidth={3} />
    </LineChart>
  </ResponsiveContainer>
</div>

{/* Répartition clients par région */}
<div className={styles.card}>
  <h3>Répartition des Clients par Région</h3>
  <ResponsiveContainer width="100%" height={250}>
    <PieChart>
      <Pie
        data={repartitionClientsRegion}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={60}
        label
      >
        {repartitionClientsRegion.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend verticalAlign="bottom" height={36} />
    </PieChart>
  </ResponsiveContainer>
</div>

{/* Fournisseurs sans contrat */}
<div className={styles.card}>
  <h3>Fournisseurs sans Contrat</h3>
  <p className={styles.value}>{fournisseursSansContrat}</p>
</div>

        </div>
      </main>
    </div>
  );
}
