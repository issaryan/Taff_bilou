'use client'

import { Bell, UserCircle, Upload, X, Check } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

export default function UserPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({
        ...prev,
        image: 'Veuillez sélectionner un fichier image valide',
      }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: "L'image ne doit pas dépasser 5MB",
      }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
    if (errors.image) {
      setErrors((prev) => ({
        ...prev,
        image: 'd',
      }));
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Le nom de l'organisation est requis";
    } else if (formData.name.length < 3) {
      newErrors.name = "Le nom doit contenir au moins 3 caractères";
    }

    if (!formData.description.trim()) {
      newErrors.description = "La description est requise";
    } else if (formData.description.length < 10) {
      newErrors.description = "La description doit contenir au moins 10 caractères";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("Organisation créée avec succès !");
      setFormData({ name: '', description: '', image: null });
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f9f9f9] text-[#111]">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white border-b shadow-sm">
        <div className="flex items-center gap-10">
          <h1 className="text-[1.75rem] font-bold tracking-tight text-[#0070f3]">PARTENARIS</h1>
          <nav className="hidden md:flex gap-6">
            <Link href="/id-user" className="text-sm font-medium text-gray-700 hover:text-[#0070f3]">Accueil</Link>
            <Link href="/id-user/mes-organisations" className="text-sm font-medium text-gray-700 hover:text-[#0070f3]">Mes organisations</Link>
            <Link href="/id-user/organisations" className="text-sm font-medium text-gray-700 hover:text-[#0070f3]">Organisations</Link>
            <Link href="/id-user/new" className="text-sm font-medium text-[#0070f3] border-b-2 border-[#0070f3]">Créer une organisation</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button aria-label="Notifications" className="p-2 rounded-full hover:bg-gray-100">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <span className="text-gray-800 font-medium text-sm">Username</span>
          <UserCircle className="w-8 h-8 text-gray-600" />
        </div>
      </header>

      {/* Form Section */}
      <main className="flex-1 p-6 md:p-12">
        <div className="max-w-2xl mx-auto bg-white border shadow-sm rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Créer une nouvelle organisation</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Nom de l'organisation *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-[#0070f3]`}
                placeholder="Nom de votre organisation"
              />
              {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">Description *</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                name="description"
                rows={4}
                disabled={isSubmitting}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-[#0070f3] resize-none`}
                placeholder="Décrivez votre organisation..."
              />
              {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
              <p className="text-sm text-gray-500">{formData.description.length} caractères</p>
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium mb-1">Logo</label>
              {!imagePreview ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#0070f3] transition">
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600">Cliquez pour télécharger un fichier ou glissez-déposez</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    ref={fileInputRef}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="mt-4 inline-block cursor-pointer text-sm text-blue-600 underline">
                    Choisir une image
                  </label>
                  {errors.image && <p className="text-sm text-red-600 mt-2">{errors.image}</p>}
                </div>
              ) : (
                <div className="relative">
                  <img src={imagePreview} alt="Aperçu du logo" className="w-full h-48 object-cover rounded-lg border" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-6 py-3 text-white bg-[#0070f3] hover:bg-[#0051cc] rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-b-2 border-white rounded-full mr-2" />
                    Création...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Créer l'organisation
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 py-4 border-t bg-white">
        © 2025 Partenaris
      </footer>
    </div>
  );
}
