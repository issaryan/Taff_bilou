"use client";
import { Bell, UserCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
{/* Fetching organisation data from the backend (img & name) */}
{/* Displaying them */}
const mockOrganizations = Array.from({ length: 50 }).map((_, index) => ({
  id: index + 1,
  name: `Organisation ${index + 1}`,
  description: `Ceci est une description de l'organisation numéro ${index + 1}.`,
  logo: `https://via.placeholder.com/50x50.png?text=O${index + 1}`,
}));
function OrganizationCard({ org }: { org: typeof mockOrganizations[0] }) {
  return (
    <Link
      href={`/organisations/${org.id}`}
      className="flex items-center gap-4 p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition w-full max-w-2xl mx-auto"
    >
      <img src={org.logo} alt={`${org.name} logo`} className="w-12 h-12 rounded-full" />
      <div>
        <h3 className="text-lg font-semibold text-[#0070f3]">{org.name}</h3>
        <p className="text-sm text-gray-600">{org.description}</p>
      </div>
    </Link>
  );
}

export default function UserPage() {
    const [displayedOrgs, setDisplayedOrgs] = useState(mockOrganizations.slice(0, 10));
const [hasMore, setHasMore] = useState(true);
const loadMoreRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasMore) {
      setDisplayedOrgs((prev) => {
        const next = mockOrganizations.slice(prev.length, prev.length + 10);
        if (next.length === 0) setHasMore(false);
        return [...prev, ...next];
      });
    }
  });

  if (loadMoreRef.current) {
    observer.observe(loadMoreRef.current);
  }

  return () => {
    if (loadMoreRef.current) {
      observer.unobserve(loadMoreRef.current);
    }
  };
}, [hasMore]);

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
  <div className="space-y-4">
    {displayedOrgs.map((org) => (
      <OrganizationCard key={org.id} org={org} />
    ))}
  </div>
  <div ref={loadMoreRef} className="h-10" />
</main>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 py-4 border-t bg-white">
        © 2025 Partenaris
      </footer>
    </div>
  );
}
