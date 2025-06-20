
import React, { useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, DollarSign, Gift, User, LogOut, Menu as MenuIcon, X, LayoutDashboard, ArrowDownToLine, ArrowUpFromLine, Send, FileText, Users, Briefcase, CreditCard, UserCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import MenuDrawer from '@/components/MenuDrawer';

const navItems = [
  { path: '/dashboard', icon: Home, label: 'Home' },
  { path: '/investments', icon: DollarSign, label: 'Invest' },
  { path: '/referrals', icon: Gift, label: 'Referrals' },
  // Profile is now in MenuDrawer
];

const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/e9c8adec-92c0-4d77-954c-48bfea47a5a7/0086dcdafa998094ec220382749622c8.png";

const SharedLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('cvsPartnerPlusUser');
    // Ensure all relevant localStorage items are cleared
    const user = JSON.parse(localStorage.getItem('cvsPartnerPlusUser')); // This will be null, but for safety
    if (user && user.username) {
      localStorage.removeItem(`cvsPartnerPlusTransactions_${user.username}`);
      localStorage.removeItem(`cvsPartnerPlusReferrals_${user.username}`);
    } else {
      // Fallback if username is not available, attempt to clear generic keys if any were set without username
      localStorage.removeItem('cvsPartnerPlusTransactions');
      localStorage.removeItem('cvsPartnerPlusReferrals');
    }
    
    toast({
      title: "Logged Out Successfully",
      description: "You have been logged out of CVS PartnerPlus.",
    });
    navigate('/');
  };

  const toggleMenuDrawer = () => {
    setIsMenuDrawerOpen(!isMenuDrawerOpen);
  };
  
  const menuDrawerItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/deposit', icon: ArrowDownToLine, label: 'Deposit' },
    { path: '/withdraw', icon: ArrowUpFromLine, label: 'Withdraw' },
    { path: '/transfer-fund', icon: Send, label: 'Transfer Fund' },
    { path: '/request-fund', icon: FileText, label: 'Request Fund' },
    { path: '/income-history', icon: DollarSign, label: 'Income History' },
    { path: '/deposit-history', icon: FileText, label: 'Deposit History' },
    { path: '/withdraw-records', icon: FileText, label: 'Withdraw Records' },
    { path: '/referrals', icon: Users, label: 'Referrals' },
    { path: '/franchise-application', icon: Briefcase, label: 'Franchise Application' },
    { path: '/cvs-credit-application', icon: CreditCard, label: 'CVS Credit Application' },
    { path: '/cvs-profile', icon: UserCircle, label: 'CVS Profile' },
  ];


  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm px-4 sm:px-6 py-3 sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <img src={logoUrl} alt="CVS Pharmacy Logo" className="h-8 sm:h-10 object-contain" />
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-gray-500 hover:text-red-600 transition-colors rounded-full hover:bg-red-50"
            aria-label="Logout"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <MenuDrawer 
        isOpen={isMenuDrawerOpen} 
        onClose={toggleMenuDrawer} 
        menuItems={menuDrawerItems} 
        username={JSON.parse(localStorage.getItem('cvsPartnerPlusUser'))?.username || "User"}
        logoUrl={logoUrl}
      />

      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.2 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-top rounded-t-2xl sm:rounded-t-3xl overflow-hidden z-40"
      >
        <div className="max-w-md mx-auto flex justify-around items-center h-16 sm:h-20">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive: navLinkIsActive }) => 
                  `flex flex-col items-center justify-center p-2 sm:p-3 rounded-lg transition-all duration-200 ease-out group w-1/4
                   ${ navLinkIsActive 
                    ? 'text-red-500' 
                    : 'text-gray-500 hover:text-red-400'}`
                }
              >
                <item.icon className={`w-6 h-6 sm:w-7 sm:h-7 mb-0.5 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'transform scale-110' : ''}`} />
                <span className={`text-xs sm:text-sm font-medium transition-opacity duration-200 ${isActive ? 'opacity-100 font-bold' : 'opacity-80 group-hover:opacity-100'}`}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId={`active-nav-indicator-${item.label}`}
                    className="absolute bottom-1 left-1/2 w-1.5 h-1.5 bg-red-500 rounded-full"
                    style={{ x: '-50%'}}
                  />
                )}
              </NavLink>
            );
          })}
           <button
            onClick={toggleMenuDrawer}
            className="flex flex-col items-center justify-center p-2 sm:p-3 rounded-lg transition-all duration-200 ease-out group w-1/4 text-gray-500 hover:text-red-400"
          >
            <MenuIcon className="w-6 h-6 sm:w-7 sm:h-7 mb-0.5 transition-transform duration-200 group-hover:scale-110" />
            <span className="text-xs sm:text-sm font-medium transition-opacity duration-200 opacity-80 group-hover:opacity-100">
              Menu
            </span>
          </button>
        </div>
      </motion.nav>
      <div className="h-16 sm:h-20"></div> {/* Spacer for bottom nav */}
    </div>
  );
};

export default SharedLayout;
