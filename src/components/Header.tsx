import React, { useState } from 'react';
import { Menu, X, User, Settings, HelpCircle, LogOut, ChevronDown, Sprout } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
      <div className="container-custom py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-3 text-primary-600">
            <Sprout size={28} />
          </div>
          <h1 className="text-xl font-bold text-neutral-900">
            Agro<span className="text-primary-600">Talk</span>
          </h1>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-neutral-700 hover:text-primary-600 text-sm font-medium">Dashboard</a>
          <a href="#" className="text-neutral-700 hover:text-primary-600 text-sm font-medium">Culturas</a>
          <a href="#" className="text-neutral-700 hover:text-primary-600 text-sm font-medium">Financeiro</a>
          <a href="#" className="text-neutral-700 hover:text-primary-600 text-sm font-medium">Clima</a>
          <a href="#" className="text-neutral-700 hover:text-primary-600 text-sm font-medium">Relatórios</a>
        </nav>
        
        <div className="flex items-center">
          {/* Profile Dropdown */}
          <div className="relative hidden md:block">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 text-sm font-medium text-neutral-700 hover:text-primary-600"
            >
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                <User size={16} />
              </div>
              <span>João Silva</span>
              <ChevronDown size={16} />
            </button>
            
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-medium py-2"
                >
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                    <User size={16} className="mr-2" />
                    Perfil
                  </a>
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                    <Settings size={16} className="mr-2" />
                    Configurações
                  </a>
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                    <HelpCircle size={16} className="mr-2" />
                    Ajuda
                  </a>
                  <div className="border-t border-neutral-200 my-1"></div>
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-neutral-100">
                    <LogOut size={16} className="mr-2" />
                    Sair
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-neutral-700 hover:text-primary-600"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-neutral-200"
          >
            <div className="container-custom py-4 flex flex-col space-y-4">
              <a href="#" className="text-neutral-700 hover:text-primary-600 text-sm font-medium py-2">Dashboard</a>
              <a href="#" className="text-neutral-700 hover:text-primary-600 text-sm font-medium py-2">Culturas</a>
              <a href="#" className="text-neutral-700 hover:text-primary-600 text-sm font-medium py-2">Financeiro</a>
              <a href="#" className="text-neutral-700 hover:text-primary-600 text-sm font-medium py-2">Clima</a>
              <a href="#" className="text-neutral-700 hover:text-primary-600 text-sm font-medium py-2">Relatórios</a>
              
              <div className="border-t border-neutral-200 pt-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">João Silva</p>
                    <p className="text-xs text-neutral-500">joao.silva@exemplo.com</p>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-3">
                  <a href="#" className="flex items-center text-sm text-neutral-700">
                    <User size={16} className="mr-2" />
                    Perfil
                  </a>
                  <a href="#" className="flex items-center text-sm text-neutral-700">
                    <Settings size={16} className="mr-2" />
                    Configurações
                  </a>
                  <a href="#" className="flex items-center text-sm text-neutral-700">
                    <HelpCircle size={16} className="mr-2" />
                    Ajuda
                  </a>
                  <a href="#" className="flex items-center text-sm text-red-600">
                    <LogOut size={16} className="mr-2" />
                    Sair
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;