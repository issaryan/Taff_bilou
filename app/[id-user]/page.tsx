import { Bell, UserCircle } from "lucide-react";
import Link from "next/link";

export default function UserPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f9f9f9] text-[#111]">
      {/* Header with navigation */}
      <header className="flex justify-between items-center px-6 py-4 bg-white border-b shadow-sm">
        {/* Left: Logo and Navigation */}
        <div className="flex items-center gap-10">
          <h1 className="text-[1.75rem] font-bold font-sans tracking-tight text-[#0070f3] leading-none">
            PARTENARIS
          </h1>
          <nav className="hidden md:flex gap-6">
            <Link href="/id-user" 
            className="text-sm font-medium text-gray-700 hover:text-[#0070f3] transition-colors">
              Accueil
            </Link>
            <Link href="/id-user/mes-organisations" 
            className="text-sm font-medium text-gray-700 hover:text-[#0070f3] transition-colors">
              Mes organisations
            </Link>
            <Link href="/id-user/organisations" 
            className="text-sm font-medium text-gray-700 hover:text-[#0070f3] transition-colors">
              Organisations
            </Link>
            <Link href="/id-user/new" 
            className="text-sm font-medium text-gray-700 hover:text-[#0070f3] transition-colors">
              Creer une organisation
            </Link>
            
            
          </nav>
        </div>

        {/* Right: User and Notification */}
        <div className="flex items-center gap-4">
          <button
            aria-label="Notifications"
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <span className="text-gray-800 font-medium text-sm">Username</span>
          <UserCircle className="w-8 h-8 text-gray-600" />
        </div>
      </header>

      {/* Welcome Section */}
      <main className="flex-1 p-6 md:p-12 bg-[#f9f9f9]">
        <section className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0070f3] mb-4 text-center">
            🎉 Bienvenue @Username !
          </h1>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed text-center">
            Découvrez notre plateforme de gestion de tiers, conçue pour simplifier votre
            quotidien professionnel.
            <br />
            Créez facilement votre organisation, ajoutez vos partenaires, clients ou
            fournisseurs, et gérez-les en toute simplicité.
            <br />
            🚀 Commencez dès maintenant à structurer votre écosystème avec efficacité et
            fluidité !
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 py-4 border-t bg-white">
        © 2025 Partenaris
      </footer>
    </div>
  );
}
