import { Dialog } from '@headlessui/react';
import {
  Bars3Icon,
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  DocumentDuplicateIcon,
  ChartPieIcon,
  XMarkIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Team', href: '/about', icon: UsersIcon },
    { name: 'Conversion', href: '/convert', icon: PhotoIcon },
    { name: 'Calendar', href: '#', icon: CalendarIcon },
    { name: 'Documents', href: '#', icon: DocumentDuplicateIcon },
    { name: 'Reports', href: '#', icon: ChartPieIcon },
  ];

  return (
    <>
      {/* Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:min-h-screen bg-gray-900 p-4">
        <div className="flex items-center mb-8">
          <h2 className="text-white font-bold text-lg">Sharpify</h2>
        </div>
        <nav className="space-y-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-3 text-sm font-medium rounded p-2 ${
                location.pathname === item.href
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

Sidebar.MobileBurger = function MobileBurger() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Team', href: '/about', icon: UsersIcon },
    { name: 'Projects', href: '/convert', icon: FolderIcon },
    { name: 'Calendar', href: '#', icon: CalendarIcon },
    { name: 'Documents', href: '#', icon: DocumentDuplicateIcon },
    { name: 'Reports', href: '#', icon: ChartPieIcon },
  ];

  return (
    <>
      <button
        onClick={() => setSidebarOpen(true)}
        className="text-gray-700"
        aria-label="Open sidebar"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      <Dialog open={sidebarOpen} onClose={() => setSidebarOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-y-0 right-0 w-64 bg-gray-900 p-4 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-white font-semibold text-lg">Sharpify</h2>
            <button onClick={() => setSidebarOpen(false)}>
              <XMarkIcon className="h-6 w-6 text-gray-400 hover:text-white" />
            </button>
          </div>
          <nav className="space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 text-sm font-medium rounded p-2 ${
                  location.pathname === item.href
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </Dialog>
    </>
  );
};
