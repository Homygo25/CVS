
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { X, UserCircle, UploadCloud } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const MenuDrawer = ({ isOpen, onClose, menuItems, username, logoUrl }) => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    if (username) {
      const storedProfilePic = localStorage.getItem(`cvsPartnerPlusProfilePic_${username}`);
      if (storedProfilePic) {
        setProfilePic(storedProfilePic);
      }
    }
  }, [username, isOpen]); // Re-check on open in case it was updated elsewhere

  const handleNavigation = (path, label) => {
    // CVS Profile page is now a real page
    if (path === '/dashboard' || path === '/referrals' || path === '/cvs-profile') {
      navigate(path);
    } else {
      const isImplemented = ['/dashboard', '/referrals', '/cvs-profile'].includes(path);
      if (isImplemented) {
        navigate(path);
      } else {
         toast({
            title: `🚧 ${label} Coming Soon`,
            description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
          });
      }
    }
    onClose();
  };


  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-full w-full max-w-xs bg-white shadow-xl z-50 flex flex-col"
          >
            <div className="p-5 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <img src={logoUrl} alt="CVS Pharmacy Logo" className="h-10 object-contain" />
                <button onClick={onClose} className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative w-12 h-12 rounded-full ring-2 ring-red-300 flex items-center justify-center bg-gray-200 overflow-hidden">
                  {profilePic ? (
                    <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <UserCircle className="w-8 h-8 text-gray-500" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Welcome back,</p>
                  <p className="font-semibold text-lg text-gray-800">{username}</p>
                </div>
              </div>
            </div>

            <nav className="flex-grow p-5 space-y-1 overflow-y-auto">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path, item.label)}
                  className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150 group"
                >
                  <item.icon className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
            
            <div className="p-5 border-t border-gray-200">
                <p className="text-xs text-gray-400 text-center">&copy; {new Date().getFullYear()} CVS PartnerPlus. All rights reserved.</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MenuDrawer;
