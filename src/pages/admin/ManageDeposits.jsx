
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowDownToLine, CheckCircle, XCircle, Clock, Search, Filter } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ManageDeposits = ({ filter: initialFilterStatus = 'All' }) => {
  const [deposits, setDeposits] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState(initialFilterStatus);
  const [isLoading, setIsLoading] = useState(true);

  const pageTitle = filterStatus === 'Pending' ? 'Pending Deposits' : filterStatus === 'Approved' ? 'Approved Deposits' : 'Manage Deposits';


  const initialDeposits = [
    { id: 'dep001', userId: 'JohnDoe', amount: 1000, date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), status: 'Pending', method: 'Bank Transfer', transactionId: 'TXN123456' },
    { id: 'dep002', userId: 'JaneSmith', amount: 500, date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), status: 'Approved', method: 'GCash', transactionId: 'TXN789012' },
    { id: 'dep003', userId: 'AliceBlue', amount: 2000, date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), status: 'Pending', method: 'PayMaya', transactionId: 'TXN345678' },
    { id: 'dep004', userId: 'BobGreen', amount: 1500, date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), status: 'Denied', method: 'Bank Transfer', transactionId: 'TXN901234' },
    { id: 'dep005', userId: 'JohnDoe', amount: 750, date: new Date(Date.now() - 1000 * 60 * 30).toISOString(), status: 'Pending', method: 'GCash', transactionId: 'TXN567890' },
    { id: 'dep006', userId: 'ChrisP', amount: 250, date: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), status: 'Approved', method: 'Bank Transfer', transactionId: 'TXN654321' },
  ];
  
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const storedDeposits = localStorage.getItem('cvsPartnerPlusAdminDeposits');
      if (storedDeposits) {
        setDeposits(JSON.parse(storedDeposits));
      } else {
        setDeposits(initialDeposits);
        localStorage.setItem('cvsPartnerPlusAdminDeposits', JSON.stringify(initialDeposits));
      }
      setIsLoading(false);
    }, 1000);
  }, []);
  
  useEffect(() => {
    setFilterStatus(initialFilterStatus);
  }, [initialFilterStatus]);


  const updateDepositsStorage = (updatedDeposits) => {
    setDeposits(updatedDeposits);
    localStorage.setItem('cvsPartnerPlusAdminDeposits', JSON.stringify(updatedDeposits));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  const filteredDeposits = deposits.filter(deposit => {
    const matchesSearch = deposit.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          deposit.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          deposit.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || deposit.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleApproveDeposit = (depositId) => {
    const updatedDeposits = deposits.map(dep => 
      dep.id === depositId ? { ...dep, status: 'Approved' } : dep
    );
    updateDepositsStorage(updatedDeposits);
    toast({
      title: "Deposit Approved",
      description: `Deposit ${depositId} has been approved.`,
      variant: "success",
    });
  };

  const handleDenyDeposit = (depositId) => {
     const updatedDeposits = deposits.map(dep => 
      dep.id === depositId ? { ...dep, status: 'Denied' } : dep
    );
    updateDepositsStorage(updatedDeposits);
    toast({
      title: "Deposit Denied",
      description: `Deposit ${depositId} has been denied.`,
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
            <ArrowDownToLine className="w-8 h-8 mr-3 text-green-600" />
            {pageTitle}
          </h1>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search by User ID, TxN ID..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            {initialFilterStatus === 'All' && ( // Only show filter dropdown if not on a pre-filtered page
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
        ) : filteredDeposits.length > 0 ? (
          <div className="bg-white shadow-xl rounded-lg overflow-x-auto">
            <table className="w-full min-w-max text-left">
              <thead className="border-b bg-slate-50">
                <tr>
                  <th className="p-4 text-sm font-semibold text-gray-600 uppercase">Deposit ID</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 uppercase">User ID</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 uppercase">Amount</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 uppercase">Date</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 uppercase">Method</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 uppercase">TxN ID</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 uppercase">Status</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 uppercase text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDeposits.map((deposit, index) => (
                  <motion.tr 
                    key={deposit.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b border-gray-200 hover:bg-red-50/30 transition-colors"
                  >
                    <td className="p-4 text-sm text-gray-700 font-medium">{deposit.id}</td>
                    <td className="p-4 text-sm text-gray-700">{deposit.userId}</td>
                    <td className="p-4 text-sm text-gray-700 font-semibold">₱{deposit.amount.toFixed(2)}</td>
                    <td className="p-4 text-sm text-gray-500">{new Date(deposit.date).toLocaleString()}</td>
                    <td className="p-4 text-sm text-gray-500">{deposit.method}</td>
                    <td className="p-4 text-sm text-gray-500">{deposit.transactionId}</td>
                    <td className="p-4 text-sm">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusColor(deposit.status)}`}>
                        {deposit.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-center">
                      {deposit.status === 'Pending' && (
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleApproveDeposit(deposit.id)}
                            className="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-600 transition-colors"
                            title="Approve Deposit"
                          >
                            <CheckCircle size={18} />
                          </button>
                          <button
                            onClick={() => handleDenyDeposit(deposit.id)}
                            className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
                            title="Deny Deposit"
                          >
                            <XCircle size={18} />
                          </button>
                        </div>
                      )}
                      {deposit.status !== 'Pending' && (
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
            <ArrowDownToLine className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl font-semibold text-gray-700">No Deposits Found</p>
            <p className="text-gray-500">
              {searchTerm || filterStatus !== 'All' ? "No deposits match your criteria." : "There are no deposit records yet."}
            </p>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default ManageDeposits;
