
import React, { useState } from 'react';
import {
  Menu,
  X,
  ChevronRight,
  Home,
  Leaf,
  Users,
  Settings,
  BarChart2,
  Calendar,
  CloudRain,
  Store,
  DollarSign
} from 'lucide-react';
import Headers from './Header';
import '../styles/mainlayout.css';


const Layout = () => {
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    { icon: Home, label: 'Dashboard', href: '#' },
    { icon: Leaf, label: 'Crops Management', href: '#' },
    { icon: CloudRain, label: 'Weather & Irrigation', href: '#' },
    { icon: Store, label: 'Inventory', href: '#' },
    { icon: Calendar, label: 'Planting Calendar', href: '#' },
    { icon: Users, label: 'Farm Workers', href: '#' },
    { icon: BarChart2, label: 'Analytics', href: '#' },
    { icon: DollarSign, label: 'Financial Records', href: '#' },
    { icon: Settings, label: 'Settings', href: '#' },
  ];

  <Headers />

  return (
    <div className= {`flex h-screen bg-gray-100 sidebar ${isOpen ? 'w-64' : 'w-20'}`}>
      
      {/* Sidebar */}
      <div 
        className={`bg-green-800 text-white transition-all duration-300 ${
          isOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-green-700">
          <div className="flex items-center gap-3">
            {isOpen && <h1 className="text-xl font-bold bg-primary">Agricom</h1>}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-green-700 rounded-lg transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-2">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex items-center gap-4 p-3 text-gray-100 hover:bg-green-700 rounded-lg transition-colors group"
            >
              <item.icon size={20} />
              {isOpen && (
                <>
                  <span>{item.label}</span>
                  <ChevronRight
                    size={16}
                    className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </>
              )}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Layout;