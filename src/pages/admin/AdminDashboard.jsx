import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, DollarSign, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, ListChecks, ListX, UserCheck, UserX, Activity, BarChartBig } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const StatCard = ({ title, value, icon: Icon, color, hoverColor, isLoading, onClick, subtext }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`bg-white p-5 rounded-xl shadow-lg border-l-4 ${color} ${onClick ? `cursor-pointer hover:shadow-2xl hover:border-l-8 ${hoverColor} transition-all duration-200 ease-in-out transform hover:-translate-y-1` : ''}`}
    onClick={onClick}
  >
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</p>
        {isLoading ? (
          <div className="h-7 w-20 bg-gray-200 rounded animate-pulse mt-1 mb-1"></div>
        ) : (
          <p className="text-2xl md:text-3xl font-bold text-gray-800">{value}</p>
        )}
        {subtext && !isLoading && <p className="text-xs text-gray-400 mt-0.5">{subtext}</p>}
      </div>
      <div className={`p-2.5 rounded-lg bg-opacity-10 ${color.replace('border-', 'bg-')}`}>
        <Icon className={`w-6 h-6 ${color.replace('border-', 'text-')}`} />
      </div>
    </div>
  </motion.div>
);


const RecentActivityItem = ({ type, user, amount, status, time, icon: Icon, iconColor, id }) => (
 <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors duration-150 border-b border-gray-100 last:border-b-0"
  >
    <div className={`p-2 rounded-full mr-3 ${iconColor} bg-opacity-10`}>
      <Icon className={`w-5 h-5 ${iconColor}`} />
    </div>
    <div className="flex-grow">
      <p className="text-sm font-medium text-gray-700">
        {type === 'deposit' ? 'Deposit Request' : type === 'withdrawal' ? 'Withdrawal Request' : 'User Registration'} from <span className="font-semibold text-red-600">{user}</span>
      </p>
      <p className="text-xs text-gray-400">{time} (ID: {id.slice(0,6)}...)</p>
    </div>
    <div className="text-right ml-2">
        {amount !== undefined && (
            <p className={`text-sm font-semibold ${type === 'deposit' ? 'text-green-600' : 'text-orange-600'}`}>
                {type === 'deposit' ? '+' : '-' }₱{amount.toFixed(2)}
            </p>
        )}
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${
            status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
            status === 'Approved' || status === 'Active' ? 'bg-green-100 text-green-700' : 
            status === 'New' ? 'bg-blue-100 text-blue-700' :
            'bg-red-100 text-red-700'}`
        }>
            {status}
        </span>
    </div>
 </motion.div>
);


const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    pendingDeposits: 0,
    pendingWithdrawals: 0,
    totalInvested: 0,
    totalWithdrawn: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const storedUsers = JSON.parse(localStorage.getItem('cvsPartnerPlusAdminUsers') || '[]');
        const storedDeposits = JSON.parse(localStorage.getItem('cvsPartnerPlusAdminDeposits') || '[]');
        const storedWithdrawals = JSON.parse(localStorage.getItem('cvsPartnerPlusAdminWithdrawals') || '[]');

        setStats({
          totalUsers: storedUsers.length,
          activeUsers: storedUsers.filter(u => u.status === 'Active').length,
          pendingDeposits: storedDeposits.filter(d => d.status === 'Pending').length,
          pendingWithdrawals: storedWithdrawals.filter(w => w.status === 'Pending').length,
          totalInvested: storedDeposits.filter(d => d.status === 'Approved').reduce((sum, d) => sum + d.amount, 0),
          totalWithdrawn: storedWithdrawals.filter(w => w.status === 'Approved').reduce((sum, w) => sum + w.amount, 0),
        });
        
        const depositsActivity = storedDeposits
            .sort((a,b) => new Date(b.date) - new Date(a.date))
            .slice(0, 2)
            .map(d => ({
                id: d.id,
                type: 'deposit', 
                user: d.userId, 
                amount: d.amount, 
                status: d.status, 
                time: new Date(d.date).toLocaleString([], {dateStyle: 'short', timeStyle:'short'}),
                icon: ListChecks,
                iconColor: d.status === 'Pending' ? 'text-yellow-500' : d.status === 'Approved' ? 'text-green-500' : 'text-red-500'
            }));

        const withdrawalsActivity = storedWithdrawals
            .sort((a,b) => new Date(b.date) - new Date(a.date))
            .slice(0, 2)
            .map(w => ({
                id: w.id,
                type: 'withdrawal', 
                user: w.userId, 
                amount: w.amount, 
                status: w.status, 
                time: new Date(w.date).toLocaleString([], {dateStyle: 'short', timeStyle:'short'}),
                icon: ListX,
                iconColor: w.status === 'Pending' ? 'text-yellow-500' : w.status === 'Approved' ? 'text-green-500' : 'text-red-500'
            }));
        
        const userActivity = storedUsers
            .sort((a,b) => new Date(b.registrationDate) - new Date(a.registrationDate))
            .slice(0,1) // Take 1 newest user
            .map(u => ({
                id: u.id,
                type: 'user',
                user: u.username,
                status: 'New',
                time: new Date(u.registrationDate).toLocaleString([], {dateStyle: 'short', timeStyle:'short'}),
                icon: UserCheck,
                iconColor: 'text-blue-500'
            }));
        
        const combinedActivity = [...userActivity, ...depositsActivity, ...withdrawalsActivity]
            .sort((a,b) => {
                const dateA = a.type === 'user' ? storedUsers.find(u=>u.id === a.id)?.registrationDate : (a.type === 'deposit' ? storedDeposits.find(d=>d.id === a.id)?.date : storedWithdrawals.find(w=>w.id === a.id)?.date);
                const dateB = b.type === 'user' ? storedUsers.find(u=>u.id === b.id)?.registrationDate : (b.type === 'deposit' ? storedDeposits.find(d=>d.id === b.id)?.date : storedWithdrawals.find(w=>w.id === b.id)?.date);
                return new Date(dateB) - new Date(dateA);
            });
        
        setRecentActivity(combinedActivity.slice(0,5)); // Show more diverse recent activities
        setIsLoading(false);
      }, 800); // Reduced loading time
    };

    fetchAdminData();
    const intervalId = setInterval(fetchAdminData, 30000); // Refresh data every 30 seconds
    return () => clearInterval(intervalId);
  }, []);


  return (
    <>
      <Helmet>
        <title>Admin Dashboard - CVS PartnerPlus</title>
        <meta name="description" content="Administrator dashboard for CVS PartnerPlus system overview and management." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div className="pb-2 border-b border-gray-200">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Administrator Dashboard</h1>
          <p className="text-sm text-gray-500">System overview and key metrics.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          <StatCard title="Total Users" value={stats.totalUsers} icon={Users} color="border-sky-500" hoverColor="hover:border-sky-400" isLoading={isLoading} onClick={() => navigate('/admin/users')} subtext={`${stats.activeUsers} active`}/>
          <StatCard title="Pending Deposits" value={stats.pendingDeposits} icon={ListChecks} color="border-green-500" hoverColor="hover:border-green-400" isLoading={isLoading} onClick={() => navigate('/admin/deposits/pending')} subtext="Awaiting approval"/>
          <StatCard title="Pending Withdrawals" value={stats.pendingWithdrawals} icon={ListX} color="border-yellow-500" hoverColor="hover:border-yellow-400" isLoading={isLoading} onClick={() => navigate('/admin/withdrawals/pending')} subtext="Awaiting approval"/>
          <StatCard title="Total Approved Investments" value={`₱${stats.totalInvested.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} icon={BarChartBig} color="border-red-500" hoverColor="hover:border-red-400" isLoading={isLoading}/>
          <StatCard title="Total Approved Withdrawals" value={`₱${stats.totalWithdrawn.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} icon={TrendingDown} color="border-purple-500" hoverColor="hover:border-purple-400" isLoading={isLoading}/>
          <StatCard title="Platform Health" value={"Nominal"} icon={Activity} color="border-teal-500" hoverColor="hover:border-teal-400" isLoading={isLoading} subtext="All systems operational"/>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-xl shadow-lg"
            >
                <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">Recent Activity Feed</h2>
                {isLoading ? (
                    <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center space-x-3 p-2">
                                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                                <div className="flex-grow space-y-1.5">
                                    <div className="h-3.5 bg-gray-200 rounded animate-pulse w-3/4"></div>
                                    <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
                                </div>
                                <div className="h-5 bg-gray-200 rounded animate-pulse w-14"></div>
                            </div>
                        ))}
                    </div>
                ) : recentActivity.length > 0 ? (
                    <div className="space-y-0.5">
                        {recentActivity.map((activity, index) => (
                            <RecentActivityItem key={`${activity.id}-${index}`} {...activity} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 text-sm">No recent activities to display.</p>
                    </div>
                )}
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-lg"
            >
                <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">Quick Actions</h2>
                <div className="space-y-2.5">
                    <button 
                        onClick={() => navigate('/admin/deposits/pending')}
                        className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg transition duration-150 bg-green-500 hover:bg-green-600 text-white font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        <ListChecks size={18}/> <span>Review Deposits</span>
                    </button>
                     <button 
                        onClick={() => navigate('/admin/withdrawals/pending')}
                        className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg transition duration-150 bg-yellow-500 hover:bg-yellow-600 text-white font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        <ListX size={18}/> <span>Review Withdrawals</span>
                    </button>
                    <button 
                        onClick={() => navigate('/admin/users')}
                        className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg transition duration-150 bg-sky-500 hover:bg-sky-600 text-white font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        <Users size={18}/> <span>Manage Users</span>
                    </button>
                     <button 
                        onClick={() => toast({ title: "🚧 Trigger Maintenance", description: "This feature is not yet implemented.", variant: "default"})}
                        className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg transition duration-150 bg-gray-500 hover:bg-gray-600 text-white font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        <AlertTriangle size={18}/> <span>Maintenance Mode</span>
                    </button>
                </div>
            </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default AdminDashboard;