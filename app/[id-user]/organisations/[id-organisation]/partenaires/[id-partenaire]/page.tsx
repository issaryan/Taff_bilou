'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ClientDetailsPage() {
  // Correctly handle the potential undefined nature of `id` from useParams()
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : ''; // Ensure id is a string

  const router = useRouter();

  const mockClient = {
    id: '123',
    shortName: 'ACME',
    longName: 'ACME Corporation',
    Categorie: 'Industrie',
    registreCommerce: 'RC12345',
    numeroFiscal: 'NF67890',
    geolocalisation: 'Paris, France',
    logo: '',
    emailPrincipale: 'contact@acme.com',
    siteWeb: 'https://acme.com',
    telephone: '0123456789',
    adressePrincipale: '123 rue Lafayette',
    adresseSecondaire: '456 avenue République',
    Statut: 'Actif',
    Devise: 'EUR',
    langue: 'Français',
    canalDDeComPrefere: 'Email',
    secteurActivite: 'Technologie',
    tailleEntreprise: 'Grande',
    Description: 'Entreprise innovante dans le domaine technologique.',
    DateCreation: '2010-05-20',
    canalAcquisition: 'Réseau',
    plafondCredit: '100000',
    Segment: 'Premium',
  };

  const [client] = useState(mockClient);

  const [comments, setComments] = useState([
    { id: 1, author: 'Alice', content: 'Client très sérieux.', date: '2024-12-01' },
    { id: 2, author: 'Bob', content: 'Toujours ponctuel dans les paiements.', date: '2025-01-15' },
  ]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: 'Moi',
        content: newComment,
        date: new Date().toISOString().split('T')[0],
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  const similarClients = [
    { id: '201', name: 'Client A', logo: '/logos/logo1.png' },
    { id: '202', name: 'Client B', logo: '/logos/logo2.png' },
    { id: '203', name: 'Client C', logo: '/logos/logo3.png' },
    { id: '204', name: 'Client D', logo: '/logos/logo4.png' },
    { id: '205', name: 'Client E', logo: '/logos/logo5.png' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleClients = similarClients.slice(currentIndex, currentIndex + 3);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 3, 0));
  };
  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 3, similarClients.length - 3));
  };

  const [userRating, setUserRating] = useState<number | null>(null);

  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  const handleDislike = () => {
    if (hasLiked) {
      setLikes((prev) => Math.max(prev - 1, 0));
      setHasLiked(false);
    }
  };

  const handleRating = (rating: number) => setUserRating(rating);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne gauche : carte client + feedback + similaires */}
        <div className="lg:col-span-2 space-y-6">
          {/* Détails client */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {client.shortName} — Détails
            </h1>

            <Section title="Identité">
              <Detail label="Nom court" value={client.shortName} />
              <Detail label="Nom complet" value={client.longName} />
              <Detail label="Statut" value={client.Statut} />
              <Detail label="Segment" value={client.Segment} />
              <Detail label="Taille entreprise" value={client.tailleEntreprise} />
              <Detail label="Date de création" value={client.DateCreation} />
              <Detail label="Description" value={client.Description} />
            </Section>

            <Section title="Contact">
              <Detail label="Email principale" value={client.emailPrincipale} />
              <Detail label="Téléphone" value={client.telephone} />
              <Detail label="Site web" value={client.siteWeb} />
              <Detail label="Adresse principale" value={client.adressePrincipale} />
              <Detail label="Adresse secondaire" value={client.adresseSecondaire} />
              <Detail label="Géolocalisation" value={client.geolocalisation} />
            </Section>

            <Section title="Informations légales & financières">
              <Detail label="Catégorie" value={client.Categorie} />
              <Detail label="Registre de commerce" value={client.registreCommerce} />
              <Detail label="Numéro fiscal" value={client.numeroFiscal} />
              <Detail label="Devise" value={client.Devise} />
              <Detail label="Plafond crédit" value={client.plafondCredit} />
            </Section>

            <Section title="Préférences et communication">
              <Detail label="Langue" value={client.langue} />
              <Detail label="Canal de communication préféré" value={client.canalDDeComPrefere} />
              <Detail label="Canal d’acquisition" value={client.canalAcquisition} />
              <Detail label="Secteur d’activité" value={client.secteurActivite} />
            </Section>

            <div className="mt-8 flex justify-between">
              <button onClick={() => router.back()} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Retour</button>
              <button onClick={() => router.push(`/dashboard/clients/${client.id}/edit`)} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Modifier</button>
            </div>
          </div>

          {/* Feedback section */}
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <div className="mt-10 space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Feedback</h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLike}
                  disabled={hasLiked}
                  className={`px-3 py-1 rounded text-white ${
                    hasLiked ? 'bg-green-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  👍 Like ({likes})
                </button>
                <button
                  onClick={handleDislike}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  👎 Dislike
                </button>
              </div>

              <div>
                <p className="text-gray-700 mb-1">Noter ce client :</p>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => handleRating(n)}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center ${
                        userRating === n ? 'bg-yellow-400 text-white' : 'bg-white text-gray-600'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                {userRating && <p className="text-sm text-gray-500 mt-2">Note donnée : {userRating}/5</p>}
              </div>
            </div>
          </div>

          {/* Tiers similaires */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Tiers similaires</h2>
            <div className="flex items-center space-x-4">
              <button onClick={handlePrev} disabled={currentIndex === 0} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">Prev</button>
              <div className="flex space-x-4">
                {visibleClients.map((client) => (
                  <div key={client.id} className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 border">
                    {/* It's good practice to have an empty string for src if client.logo is undefined */}
                    <img src={client.logo || ''} alt={client.name} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <button onClick={handleNext} disabled={currentIndex + 3 >= similarClients.length} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">Next</button>
            </div>
          </div>
        </div>

        {/* Colonne droite : Commentaires */}
        <div className="bg-white p-6 rounded-lg shadow h-fit">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Commentaires</h2>
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {comments.length > 0 ? (
              comments.map((c) => (
                <div key={c.id} className="bg-gray-100 p-3 rounded">
                  <p className="text-sm text-gray-600 mb-1">
                    {c.author} — <span className="text-xs text-gray-400">{c.date}</span>
                  </p>
                  <p className="text-gray-800">{c.content}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">Aucun commentaire</p>
            )}
          </div>

          <div className="mt-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              onClick={handleAddComment}
              className="mt-2 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Publier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-gray-900">{value || '-'}</p>
    </div>
  );
}