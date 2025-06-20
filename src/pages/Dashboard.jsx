
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, TrendingUp } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/e9c8adec-92c0-4d77-954c-48bfea47a5a7/0086dcdafa998094ec220382749622c8.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('cvsPartnerPlusUser');
    if (!storedUser) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(storedUser);
    setUserData(user);

    const storedTransactions = localStorage.getItem(`cvsPartnerPlusTransactions_${user.username}`);
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    } else {
      const initialTransactions = [
        {
          id: 1,
          type: 'Daily Interest',
          description: 'Earned from Essential Care Plan',
          amount: 11.07,
          date: new Date().toISOString(),
          icon: TrendingUp
        },
        {
          id: 2,
          type: 'Daily Interest',
          description: 'Earned from Essential Care Plan',
          amount: 11.07,
          date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          icon: TrendingUp
        },
        {
          id: 3,
          type: 'Daily Interest',
          description: 'Earned from Essential Care Plan',
          amount: 11.07,
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          icon: TrendingUp
        }
      ];
      setTransactions(initialTransactions);
      localStorage.setItem(`cvsPartnerPlusTransactions_${user.username}`, JSON.stringify(initialTransactions));
    }
  }, [navigate]);


  const handleSend = () => {
    toast({
      title: "🚧 Send Feature Coming Soon",
      description: "Send functionality isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleReceive = () => {
    toast({
      title: "🚧 Receive Feature Coming Soon", 
      description: "Receive functionality isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };


  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - CVS PartnerPlus</title>
        <meta name="description" content="Your CVS PartnerPlus investment dashboard. Monitor your portfolio, track daily interest, and manage your passive income investments." />
      </Helmet>
      
      <div className="pb-20"> {/* Added padding to prevent overlap with bottom nav */}
        <div className="px-4 py-5 space-y-5"> {/* Adjusted padding and spacing */}
          {/* User Info and Greeting - Kept Tailwind for this section for consistency with overall page structure */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6 bg-white p-6 rounded-lg shadow-sm"
          >
            <div className="flex justify-center mb-3">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center ring-2 ring-red-300">
                <User className="w-8 h-8 text-gray-500" />
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-gray-700">
              Hello {userData.username}
            </h1>
             <div className="w-20 h-px bg-red-400 mx-auto mt-1"></div>
          </motion.div>
          
          {/* Balance Card - Using custom CSS classes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="balance-card"
          >
            <div className="flex items-center justify-center mb-2">
                <img src={logoUrl} alt="CVS Pharmacy Logo" className="h-5 mr-2 object-contain" />
                <h2>Balance</h2>
            </div>
            <div className="amount">
              ₱{userData.balance.toFixed(2)}
            </div>
            <div className="btn-group">
              <button onClick={handleSend}>Send</button>
              <button onClick={handleReceive}>Receive</button>
            </div>
          </motion.div>

          {/* Transactions Card - Using custom CSS classes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="transactions"
          >
            <div className="flex justify-between items-center mb-2">
              <h3>Recent Transactions</h3>
              <button 
                onClick={() => toast({ title: "🚧 View All Coming Soon", description: "This feature isn't implemented yet."})} 
                className="text-xs text-red-600 font-medium hover:underline"
              >
                View All
              </button>
            </div>
            
            {transactions.length > 0 ? transactions.slice(0, 3).map((transaction) => (
              <div key={transaction.id} className="transaction-item">
                <div>
                  <span className="block font-medium">{transaction.type}</span>
                  <span className="text-xs text-gray-500">{transaction.description} - {new Date(transaction.date).toLocaleDateString()}</span>
                </div>
                <span className="amount">+₱{transaction.amount.toFixed(2)}</span>
              </div>
            )) : (
              <p className="text-center text-gray-500 py-3 text-sm">No transactions yet.</p>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
