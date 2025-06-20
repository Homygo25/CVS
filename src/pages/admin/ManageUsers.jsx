import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Users, Search, Trash2, Edit3, Eye, ShieldCheck, ShieldOff, UserPlus, Briefcase, DollarSign, Mail, CalendarDays, Filter } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  const initialMockUsers = [
    { id: 'user001', username: 'JohnDoe', email: 'john.doe@example.com', balance: 1500.75, registrationDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), status: 'Active', profilePic: null, totalDeposits: 2500, totalWithdrawals: 1000 },
    { id: 'user002', username: 'JaneSmith', email: 'jane.smith@example.com', balance: 2750.00, registrationDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(), status: 'Active', profilePic: null, totalDeposits: 5000, totalWithdrawals: 2250 },
    { id: 'user003', username: 'AliceBlue', email: 'alice.blue@example.com', balance: 800.50, registrationDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(), status: 'Suspended', profilePic: null, totalDeposits: 1000, totalWithdrawals: 200 },
    { id: 'user004', username: 'BobGreen', email: 'bob.green@example.com', balance: 50.25, registrationDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), status: 'Active', profilePic: null, totalDeposits: 100, totalWithdrawals: 50 },
    { id: 'user005', username: 'CharlieBrown', email: 'charlie.brown@example.com', balance: 10000.00, registrationDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(), status: 'Active', profilePic: null, totalDeposits: 15000, totalWithdrawals: 5000 },
    { id: 'user006', username: 'DianaPrince', email: 'diana.prince@example.com', balance: 0, registrationDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), status: 'Pending Activation', profilePic: null, totalDeposits: 0, totalWithdrawals: 0 },
  ];

  useEffect(() => {
    setIsLoading(true);
    const fetchUsers = () => {
      let loadedUsers = [];
      const storedUsers = localStorage.getItem('cvsPartnerPlusAdminUsers');
      
      if (storedUsers) {
        try {
          loadedUsers = JSON.parse(storedUsers);
          // Simple validation: ensure it's an array
          if (!Array.isArray(loadedUsers)) throw new Error("Stored users is not an array");
        } catch (e) {
          console.error("Failed to parse users from localStorage, resetting to default mock users:", e);
          loadedUsers = initialMockUsers;
          localStorage.setItem('cvsPartnerPlusAdminUsers', JSON.stringify(initialMockUsers));
        }
      } else {
        loadedUsers = initialMockUsers;
        localStorage.setItem('cvsPartnerPlusAdminUsers', JSON.stringify(initialMockUsers));
      }
      
      setUsers(loadedUsers.map(u => ({ 
        ...u, 
        registrationDate: u.registrationDate || new Date().toISOString(), 
        status: u.status || 'Active',
        balance: typeof u.balance === 'number' ? u.balance : 0,
        profilePic: u.profilePic || localStorage.getItem(`cvsPartnerPlusProfilePic_${u.username}`) || null,
        totalDeposits: u.totalDeposits || 0,
        totalWithdrawals: u.totalWithdrawals || 0,
      })));
      setIsLoading(false);
    };
    
    setTimeout(fetchUsers, 600); 
  }, []);

  const updateUsersStorage = (updatedUsers) => {
    setUsers(updatedUsers);
    localStorage.setItem('cvsPartnerPlusAdminUsers', JSON.stringify(updatedUsers));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = (user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (user.id && user.id.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStatus === 'All' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleDeleteUser = (userId) => {
    if (window.confirm(`Are you sure you want to PERMANENTLY delete user ${userId}? This action cannot be undone.`)) {
      const updatedUsers = users.filter(user => user.id !== userId);
      updateUsersStorage(updatedUsers);
      toast({
        title: "User Deleted",
        description: `User ${userId} has been permanently deleted.`,
        variant: "destructive",
      });
    }
  };
  
  const handleToggleStatus = (userId, currentStatus) => {
    let newStatus = '';
    if (currentStatus === 'Active') newStatus = 'Suspended';
    else if (currentStatus === 'Suspended') newStatus = 'Active';
    else if (currentStatus === 'Pending Activation') newStatus = 'Active'; // Example flow

    if (newStatus) {
        const updatedUsers = users.map(user => 
          user.id === userId ? {...user, status: newStatus} : user
        );
        updateUsersStorage(updatedUsers);
        toast({
          title: "User Status Updated",
          description: `User ${userId}'s status changed to ${newStatus}.`,
        });
    }
  };

  const handleViewUserDetails = (userId) => {
     toast({
      title: "🚧 View User Details",
      description: `Viewing details for ${userId} - feature coming soon!`,
    });
  };

  const getStatusPill = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Suspended': return 'bg-yellow-100 text-yellow-700';
      case 'Pending Activation': return 'bg-blue-100 text-blue-700';
      case 'Banned': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <>
      <Helmet>
        <title>Manage Users - CVS Admin</title>
        <meta name="description" content="Administer and manage all registered users on CVS PartnerPlus." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-4 border-b border-gray-200">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
            <Users className="w-8 h-8 mr-3 text-red-600" />
            User Management
          </h1>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
             <div className="relative w-full sm:w-auto">
                <select 
                    value={filterStatus} 
                    onChange={(e) => handleFilterChange(e.target.value)}
                    className="w-full sm:w-40 pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition appearance-none bg-white"
                >
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                    <option value="Pending Activation">Pending Activation</option>
                    <option value="Banned">Banned</option>
                </select>
                <Filter className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
            <button 
              onClick={() => toast({ title: "🚧 Add New User", description: "This functionality is planned for a future update."})}
              className="flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg transition duration-200 bg-red-500 hover:bg-red-600 text-white font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <UserPlus size={18}/> <span>Add User</span>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow-md animate-pulse">
                <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
                <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6 mb-3"></div>
                <div className="flex justify-end space-x-2">
                    <div className="h-7 w-7 bg-gray-200 rounded-full"></div>
                    <div className="h-7 w-7 bg-gray-200 rounded-full"></div>
                    <div className="h-7 w-7 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredUsers.map((user) => (
              <motion.div 
                key={user.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-200"
              >
                <div className="p-5">
                    <div className="flex items-center space-x-4 mb-3">
                    <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-red-100">
                        {user.profilePic ? (
                        <img src={user.profilePic} alt={user.username} className="w-full h-full object-cover" />
                        ) : (
                        <Users size={28} className="text-red-400" />
                        )}
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-gray-800 leading-tight">{user.username}</p>
                        <p className="text-xs text-gray-500 flex items-center"><Mail size={12} className="mr-1"/>{user.email}</p>
                    </div>
                    </div>
                    
                    <div className="text-xs space-y-1.5 text-gray-600 mb-3">
                        <p className="flex items-center"><Briefcase size={12} className="mr-1.5 text-sky-500"/>ID: <span className="font-mono ml-1">{user.id}</span></p>
                        <p className="flex items-center"><DollarSign size={12} className="mr-1.5 text-green-500"/>Balance: <span className="font-semibold ml-1">₱{user.balance?.toFixed(2) || '0.00'}</span></p>
                        <p className="flex items-center"><CalendarDays size={12} className="mr-1.5 text-purple-500"/>Joined: <span className="ml-1">{new Date(user.registrationDate).toLocaleDateString()}</span></p>
                    </div>
                    <p className="text-xs mb-3">
                        <span className={`px-2.5 py-1 font-semibold rounded-full text-xs ${getStatusPill(user.status)}`}>
                            {user.status}
                        </span>
                    </p>
                </div>
                <div className="bg-gray-50 p-3 mt-auto border-t border-gray-200">
                  <div className="flex justify-end items-center space-x-1.5">
                    <button onClick={() => handleViewUserDetails(user.id)} className="p-2 rounded-full hover:bg-blue-100 text-blue-500 hover:text-blue-700 transition-colors" title="View Details">
                      <Eye size={18} />
                    </button>
                    <button 
                        onClick={() => handleToggleStatus(user.id, user.status)} 
                        className={`p-2 rounded-full transition-colors ${
                            user.status === 'Active' ? 'hover:bg-yellow-100 text-yellow-500 hover:text-yellow-700' : 
                            user.status === 'Pending Activation' ? 'hover:bg-green-100 text-green-500 hover:text-green-700' :
                            'hover:bg-green-100 text-green-500 hover:text-green-700'}`} 
                        title={user.status === 'Active' ? 'Suspend User' : 'Activate User'}
                    >
                      {user.status === 'Active' ? <ShieldOff size={18} /> : <ShieldCheck size={18} />}
                    </button>
                    <button onClick={() => toast({ title: "🚧 Edit User", description: "Editing user profiles is a planned feature."})} className="p-2 rounded-full hover:bg-sky-100 text-sky-500 hover:text-sky-700 transition-colors" title="Edit User">
                      <Edit3 size={18} />
                    </button>
                    <button onClick={() => handleDeleteUser(user.id)} className="p-2 rounded-full hover:bg-red-100 text-red-500 hover:text-red-700 transition-colors" title="Delete User">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <Users className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <p className="text-xl font-semibold text-gray-700">No Users Found</p>
            <p className="text-gray-500 mt-1">
              {searchTerm || filterStatus !== 'All' ? "No users match your current filters." : "There are no registered users in the system yet."}
            </p>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default ManageUsers;