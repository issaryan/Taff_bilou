'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddClientPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    id: '',
    shortName: '',
    longName: '',
    Categorie: '',
    registreCommerce: '',
    numeroFiscal: '',
    géolocalisation: '',
    logo: '',
    emailPrincipale: '',
    siteWeb: '',
    telephone: '',
    adressePrincipale: '',
    adresseSecondaire: '',
    Statut: '',
    Devise: '',
    langue: '',
    canalDDeComPrefere: '',
    secteurActivite: '',
    tailleEntreprise: '',
    Description: '',
    DateCreation: '',
    canalAcquisition: '',
    plafondCredit: '',
    Segment: '',
    domainePartenariat:'',
    dateDedebut:'',
    dateDeFin:'',
    niveauCollaboration:'',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Client enregistré :', formData);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 text-center">Ajouter un nouveau partenaire</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Remplissez les informations ci-dessous pour enregistrer un nouveau partenaire.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Section 1: Identité */}
            <div className="col-span-2">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Identité</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputField label="ID" name="id" value={formData.id} onChange={handleChange} required />
                <InputField label="Short Name" name="shortName" value={formData.shortName} onChange={handleChange} required />
                <InputField label="Long Name" name="longName" value={formData.longName} onChange={handleChange} required/>
              </div>
            </div>

            {/* Section 2: Infos légales & localisation */}
            <div className="col-span-2">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Infos légales & géolocalisation</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputField label="Catégorie" name="Categorie" value={formData.Categorie} onChange={handleChange} required />
                <InputField label="Registre Commerce" name="registreCommerce" value={formData.registreCommerce} onChange={handleChange} />
                <InputField label="Numéro Fiscal" name="numeroFiscal" value={formData.numeroFiscal} onChange={handleChange} />
                <InputField label="Géolocalisation" name="géolocalisation" value={formData.géolocalisation} onChange={handleChange} />
                <InputField label="Adresse Principale" name="adressePrincipale" value={formData.adressePrincipale} onChange={handleChange} />
                <InputField label="Adresse Secondaire" name="adresseSecondaire" value={formData.adresseSecondaire} onChange={handleChange} />
               
              </div>
            </div>

            {/* Section 3: Contact */}
            <div className="col-span-2">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Contact & Présence en ligne</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputField label="Email Principale" name="emailPrincipale" value={formData.emailPrincipale} onChange={handleChange} />
                <InputField label="Site Web" name="siteWeb" value={formData.siteWeb} onChange={handleChange} />
                <InputField label="Téléphone" name="telephone" value={formData.telephone} onChange={handleChange} type="tel" />
              </div>
            </div>

            {/* Section 4: Business */}
            <div className="col-span-2">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Business</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputField label="Statut" name="Statut" value={formData.Statut} onChange={handleChange} />
                <InputField label="Devise" name="Devise" value={formData.Devise} onChange={handleChange} />
                <InputField label="Langue" name="langue" value={formData.langue} onChange={handleChange} />
                <InputField label="Canal de com. préféré" name="canalDDeComPrefere" value={formData.canalDDeComPrefere} onChange={handleChange} />
                <InputField label="Secteur d'activité" name="secteurActivite" value={formData.secteurActivite} onChange={handleChange} />
                <InputField label="Taille entreprise" name="tailleEntreprise" value={formData.tailleEntreprise} onChange={handleChange} />
                <InputField label="Date de création" name="DateCreation" value={formData.DateCreation} onChange={handleChange} />
                 <InputField label="Niveau Collaboration" name="niveauCollaboration" value={formData.niveauCollaboration} onChange={handleChange} />
            
              </div>
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
              Enregistrer le partenaire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// InputField: Composant réutilisable
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
