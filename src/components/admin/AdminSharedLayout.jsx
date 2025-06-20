
import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, LogOut, Menu as MenuIcon, X, 
  ListChecks, ListX, CheckCheck, History, Zap, FileQuestion, FileCheck, DollarSign, DownloadCloud, UploadCloud, Send, Repeat, Settings2
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/e9c8adec-92c0-4d77-954c-48bfea47a5a7/0086dcdafa998094ec220382749622c8.png";

const AdminSharedLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem('cvsPartnerPlusAdmin');
    if (!storedAdmin) {
      toast({
        title: "Unauthorized Access",
        description: "Please login as admin.",
        variant: "destructive",
      });
      navigate('/admin/login');
    } else {
      setAdminUser(JSON.parse(storedAdmin));
    }
  }, [navigate]);

  const handleAdminLogout = () => {
    localStorage.removeItem('cvsPartnerPlusAdmin');
    toast({
      title: "Admin Logged Out",
      description: "You have successfully logged out of the admin panel.",
    });
    navigate('/admin/login');
  };

  const toggleAdminMenu = () => {
    setIsAdminMenuOpen(!isAdminMenuOpen);
  };

  const adminNavItems = [
    { path: '/admin/deposits/pending', icon: DownloadCloud, label: 'Pending Deposits' },
    { path: '/admin/deposits/approved', icon: CheckCheck, label: 'Approved Deposits' },
    { path: '/admin/withdrawals/pending', icon: UploadCloud, label: 'Pending Withdrawals' },
    { path: '/admin/withdrawals/approved', icon: CheckCheck, label: 'Approved Withdrawals' },
    { path: '/admin/request-fund/pending', icon: FileQuestion, label: 'Pending Request-Fund' },
    { path: '/admin/request-fund/approved', icon: FileCheck, label: 'Approved Request-Fund' },
    { path: '/admin/users', icon: Users, label: 'Manage Users' },
    { path: '/admin/transfer-history', icon: Repeat, label: 'Transfer History' },
    { path: '/admin/activation-funds', icon: Zap, label: 'Activation Funds' },
  ];

  if (!adminUser) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <motion.aside
        initial={{ x: isAdminMenuOpen ? 0 : '-100%' }}
        animate={{ x: 0 }}
        className={`bg-gray-800 text-gray-300 w-72 space-y-4 py-6 px-3 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-300 ease-in-out z-40 shadow-2xl`}
        style={{ display: isAdminMenuOpen || window.innerWidth >= 768 ? 'block' : 'none' }}
      >
        <div className="px-3 mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => navigate('/admin/dashboard')}>
            <img src={logoUrl} alt="CVS Admin" className="h-9 w-auto object-contain filter brightness-0 invert contrast-200" />
            <span className="text-xl font-bold text-white tracking-tight">Admin Panel</span>
          </div>
          <button onClick={toggleAdminMenu} className="md:hidden text-gray-400 hover:text-white p-1 rounded-md hover:bg-gray-700 transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="px-3 py-3 mb-3 bg-gray-700 rounded-lg">
            <p className="text-xs text-gray-400">Welcome back,</p>
            <p className="text-md font-semibold text-white">{adminUser.username || 'Administrator'}</p>
        </div>

        <nav className="flex-grow overflow-y-auto pr-1 custom-scrollbar" style={{ maxHeight: 'calc(100vh - 220px)'}}>
          {adminNavItems.map((item, index) => 
            item.type === 'divider' ? (
              <div key={`divider-${index}`} className="my-3 px-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{item.label}</span>
              </div>
            ) : (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => isAdminMenuOpen && window.innerWidth < 768 && setIsAdminMenuOpen(false)}
              className={({ isActive }) =>
                `block py-2.5 px-3.5 rounded-md transition duration-150 ease-in-out flex items-center space-x-3 text-sm mb-1 ${
                  isActive 
                    ? 'bg-red-600 text-white font-semibold shadow-md' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-4 left-0 right-0 px-4">
           <button
            onClick={handleAdminLogout}
            className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-md transition duration-200 bg-gray-700 hover:bg-red-700 hover:text-white text-gray-300 font-medium text-sm"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout Admin</span>
          </button>
        </div>
      </motion.aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-3.5 md:hidden sticky top-0 z-30 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2" onClick={() => navigate('/admin/dashboard')}>
                <img src={logoUrl} alt="CVS Admin" className="h-7 object-contain" />
                <span className="text-lg font-semibold text-gray-700">Admin</span>
            </div>
            <button onClick={toggleAdminMenu} className="text-gray-600 p-2 rounded-md hover:bg-gray-100 transition-colors">
              <MenuIcon size={26} />
            </button>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 bg-gray-100 overflow-y-auto custom-scrollbar">
          <Outlet />
        </main>
         <footer className="bg-white border-t border-gray-200 p-3 text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} CVS PartnerPlus Admin Control Panel. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
};

export default AdminSharedLayout;
