'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditClientPage() {
  const router = useRouter();
  const params = useParams();
  const clientId = params?.id;

  // ⚠️ Remplace par un vrai appel API dans un vrai projet
  const mockClientData = {
    id: '123',
    shortName: 'ACME',
    longName: 'ACME Corporation',
    Categorie: 'Industrie',
    registreCommerce: 'RC12345',
    numeroFiscal: 'NF67890',
    géolocalisation: 'Paris, France',
    logo: '',
    emailPrincipale: 'contact@acme.com',
    siteWeb: 'https://acme.com',
    telephone: '0123456789',
    adressePrincipale: '123 rue Lafayette',
    adresseSecondaire: '',
    Statut: 'Actif',
    Devise: 'EUR',
    langue: 'Français',
    canalDDeComPrefere: 'Email',
    secteurActivite: 'Technologie',
    tailleEntreprise: 'Grande',
    Description: 'ACME est une entreprise technologique innovante.',
    DateCreation: '2010-05-20',
    canalAcquisition: 'Réseau',
    plafondCredit: '100000',
    Segment: 'Premium',
  };

  const [formData, setFormData] = useState(mockClientData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Client mis à jour :', formData);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 text-center">Modifier un client</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Mettez à jour les informations du client.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Identité */}
            <SectionTitle title="Identité" />
            <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField label="ID" name="id" value={formData.id} onChange={handleChange} required />
              <InputField label="Short Name" name="shortName" value={formData.shortName} onChange={handleChange} required />
              <InputField label="Long Name" name="longName" value={formData.longName} onChange={handleChange} />
            </div>

            {/* Légales */}
            <SectionTitle title="Infos légales & géolocalisation" />
            <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField label="Catégorie" name="Categorie" value={formData.Categorie} onChange={handleChange} />
              <InputField label="Registre Commerce" name="registreCommerce" value={formData.registreCommerce} onChange={handleChange} />
              <InputField label="Numéro Fiscal" name="numeroFiscal" value={formData.numeroFiscal} onChange={handleChange} />
              <InputField label="Géolocalisation" name="géolocalisation" value={formData.géolocalisation} onChange={handleChange} />
              <InputField label="Adresse Principale" name="adressePrincipale" value={formData.adressePrincipale} onChange={handleChange} />
              <InputField label="Adresse Secondaire" name="adresseSecondaire" value={formData.adresseSecondaire} onChange={handleChange} />
            </div>

            {/* Contact */}
            <SectionTitle title="Contact & Présence en ligne" />
            <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField label="Email" name="emailPrincipale" value={formData.emailPrincipale} onChange={handleChange} />
              <InputField label="Site Web" name="siteWeb" value={formData.siteWeb} onChange={handleChange} />
              <InputField label="Téléphone" name="telephone" value={formData.telephone} onChange={handleChange} />
            </div>

            {/* Business */}
            <SectionTitle title="Business" />
            <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField label="Statut" name="Statut" value={formData.Statut} onChange={handleChange} />
              <InputField label="Devise" name="Devise" value={formData.Devise} onChange={handleChange} />
              <InputField label="Langue" name="langue" value={formData.langue} onChange={handleChange} />
              <InputField label="Canal préféré" name="canalDDeComPrefere" value={formData.canalDDeComPrefere} onChange={handleChange} />
              <InputField label="Secteur d’activité" name="secteurActivite" value={formData.secteurActivite} onChange={handleChange} />
              <InputField label="Taille entreprise" name="tailleEntreprise" value={formData.tailleEntreprise} onChange={handleChange} />
              <InputField label="Date de création" name="DateCreation" value={formData.DateCreation} onChange={handleChange} />
              <InputField label="Canal acquisition" name="canalAcquisition" value={formData.canalAcquisition} onChange={handleChange} />
              <InputField label="Plafond crédit" name="plafondCredit" value={formData.plafondCredit} onChange={handleChange} />
              <InputField label="Segment" name="Segment" value={formData.Segment} onChange={handleChange} />
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="pt-4 text-right">
            <button
              type="submit"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow"
            >
              Enregistrer les modifications
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// InputField composant
function InputField({
  label,
  name,
  value,
  onChange,
  required = false,
  type = 'text',
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}

// SectionTitle composant
function SectionTitle({ title }: { title: string }) {
  return (
    <div className="col-span-2 mt-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    </div>
  );
}
