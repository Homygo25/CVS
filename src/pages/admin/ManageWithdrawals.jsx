
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowUpFromLine, CheckCircle, XCircle, Clock, Search, Filter } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ManageWithdrawals = ({ filter: initialFilterStatus = 'All' }) => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState(initialFilterStatus);
  const [isLoading, setIsLoading] = useState(true);

  const pageTitle = filterStatus === 'Pending' ? 'Pending Withdrawals' : filterStatus === 'Approved' ? 'Approved Withdrawals' : 'Manage Withdrawals';

  const initialWithdrawals = [
    { id: 'wd001', userId: 'JohnDoe', amount: 200, date: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), status: 'Pending', method: 'GCash Account: 09xxxxxxx1', requestedIp: '123.45.67.89' },
    { id: 'wd002', userId: 'JaneSmith', amount: 150, date: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(), status: 'Approved', method: 'Bank Account: BPI savings XXXXX4321', requestedIp: '101.102.103.104' },
    { id: 'wd003', userId: 'AliceBlue', amount: 500, date: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), status: 'Pending', method: 'PayMaya Account: 09xxxxxxx2', requestedIp: '202.203.204.205' },
    { id: 'wd004', userId: 'BobGreen', amount: 50, date: new Date(Date.now() - 1000 * 60 * 60 * 52).toISOString(), status: 'Denied', reason: 'Insufficient balance for min withdrawal', method: 'GCash Account: 09xxxxxxx3', requestedIp: '55.66.77.88' },
    { id: 'wd005', userId: 'JohnDoe', amount: 100, date: new Date(Date.now() - 1000 * 60 * 45).toISOString(), status: 'Pending', method: 'Bank Account: BDO current XXXXX9876', requestedIp: '123.45.67.89' },
    { id: 'wd006', userId: 'ChrisP', amount: 300, date: new Date(Date.now() - 1000 * 60 * 60 * 80).toISOString(), status: 'Approved', method: 'GCash Account: 09xxxxxxx4', requestedIp: '99.88.77.66' },
  ];

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const storedWithdrawals = localStorage.getItem('cvsPartnerPlusAdminWithdrawals');
      if (storedWithdrawals) {
        setWithdrawals(JSON.parse(storedWithdrawals));
      } else {
        setWithdrawals(initialWithdrawals);
        localStorage.setItem('cvsPartnerPlusAdminWithdrawals', JSON.stringify(initialWithdrawals));
      }
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    setFilterStatus(initialFilterStatus);
  }, [initialFilterStatus]);

  const updateWithdrawalsStorage = (updatedWithdrawals) => {
    setWithdrawals(updatedWithdrawals);
    localStorage.setItem('cvsPartnerPlusAdminWithdrawals', JSON.stringify(updatedWithdrawals));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  const filteredWithdrawals = withdrawals.filter(withdrawal => {
    const matchesSearch = withdrawal.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          withdrawal.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (withdrawal.method && withdrawal.method.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStatus === 'All' || withdrawal.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleApproveWithdrawal = (withdrawalId) => {
    const updatedWithdrawals = withdrawals.map(wd => 
      wd.id === withdrawalId ? { ...wd, status: 'Approved', reason: null } : wd
    );
    updateWithdrawalsStorage(updatedWithdrawals);
    toast({
      title: "Withdrawal Approved",
      description: `Withdrawal ${withdrawalId} has been approved.`,
      variant: "success",
    });
  };

  const handleDenyWithdrawal = (withdrawalId) => {
    const reason = prompt("Enter reason for denial (optional):");
    const updatedWithdrawals = withdrawals.map(wd => 
      wd.id === withdrawalId ? { ...wd, status: 'Denied', reason: reason || 'Denied by admin' } : wd
    );
    updateWithdrawalsStorage(updatedWithdrawals);
    toast({
      title: "Withdrawal Denied",
      description: `Withdrawal ${withdrawalId} has been denied. ${reason ? `Reason: ${reason}` : ''}`,
      variant: "destructive",
    });
  };
  
  const getStatusColor = (status) => {
    if (status === 'Approved') return 'text-green-600 bg-green-100';
    if (status === 'Pending') return 'text-yellow-600 bg-yellow-100';
    if (status === 'Denied') return 'text-red-600 bg-red-100';
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle} - CVS Admin</title>
        <meta name="description" content={`Review and manage ${pageTitle.toLowerCase()} on CVS PartnerPlus.`} />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <ArrowUpFromLine className="w-8 h-8 mr-3 text-orange-500" />
            {pageTitle}
          </h1>
           <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search by User ID, Method..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            {initialFilterStatus === 'All' && (
                <div className="relative w-full sm:w-auto">
                    <select 
                        value={filterStatus} 
                        onChange={(e) => handleFilterChange(e.target.value)}
                        className="w-full sm:w-40 pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition appearance-none bg-white"
                    >
                        <option value="All">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Denied">Denied</option>
                    </select>
                    <Filter className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow animate-pulse">
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-32"></div>
                    <div className="h-4 bg-gray-200 rounded w-48"></div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredWithdrawals.length > 0 ? (
          <div className="bg-white shadow-xl rounded-lg overflow-x-auto">
            <table className="w-full min-w-max text-left">
              <thead className="border-b bg-slate-50">
                <tr>
                  <th className="p-4 text-sm font-semibold text-gray-600 uppercase">Request ID</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 uppercase">User ID</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 uppercase">Amount</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 uppercase">Date</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 uppercase">Method</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 uppercase">IP Address</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 uppercase">Status</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 uppercase text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredWithdrawals.map((withdrawal, index) => (
                  <motion.tr 
                    key={withdrawal.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b border-gray-200 hover:bg-red-50/30 transition-colors"
                  >
                    <td className="p-4 text-sm text-gray-700 font-medium">{withdrawal.id}</td>
                    <td className="p-4 text-sm text-gray-700">{withdrawal.userId}</td>
                    <td className="p-4 text-sm text-gray-700 font-semibold">₱{withdrawal.amount.toFixed(2)}</td>
                    <td className="p-4 text-sm text-gray-500">{new Date(withdrawal.date).toLocaleString()}</td>
                    <td className="p-4 text-sm text-gray-500">{withdrawal.method}</td>
                    <td className="p-4 text-sm text-gray-500">{withdrawal.requestedIp}</td>
                    <td className="p-4 text-sm">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusColor(withdrawal.status)}`}>
                        {withdrawal.status}
                      </span>
                       {withdrawal.status === 'Denied' && withdrawal.reason && (
                        <p className="text-xs text-gray-500 mt-1 truncate" title={withdrawal.reason}>Reason: {withdrawal.reason}</p>
                      )}
                    </td>
                    <td className="p-4 text-sm text-center">
                      {withdrawal.status === 'Pending' && (
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleApproveWithdrawal(withdrawal.id)}
                            className="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-600 transition-colors"
                            title="Approve Withdrawal"
                          >
                            <CheckCircle size={18} />
                          </button>
                          <button
                            onClick={() => handleDenyWithdrawal(withdrawal.id)}
                            className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
                            title="Deny Withdrawal"
                          >
                            <XCircle size={18} />
                          </button>
                        </div>
                      )}
                       {withdrawal.status !== 'Pending' && (
                         <span className="text-xs text-gray-400 italic">Processed</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-lg shadow">
            <ArrowUpFromLine className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl font-semibold text-gray-700">No Withdrawals Found</p>
            <p className="text-gray-500">
               {searchTerm || filterStatus !== 'All' ? "No withdrawals match your criteria." : "There are no withdrawal records yet."}
            </p>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default ManageWithdrawals;
