import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import SplashScreen from '@/pages/SplashScreen';
import LoginPage from '@/pages/LoginPage';
import Dashboard from '@/pages/Dashboard';
import InvestmentPlansPage from '@/pages/InvestmentPlansPage';
import ReferralProgramPage from '@/pages/ReferralProgramPage';
import SharedLayout from '@/components/SharedLayout';
import PlaceholderPage from '@/pages/PlaceholderPage';
import AdminLoginPage from '@/pages/admin/AdminLoginPage';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminSharedLayout from '@/components/admin/AdminSharedLayout';
import ManageUsers from '@/pages/admin/ManageUsers';
import ManageDeposits from '@/pages/admin/ManageDeposits';
import ManageWithdrawals from '@/pages/admin/ManageWithdrawals';
import ProfilePage from '@/pages/ProfilePage';
import AdminPlaceholderPage from '@/pages/admin/AdminPlaceholderPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<LoginPage />} />
          
          <Route element={<SharedLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/investments" element={<InvestmentPlansPage />} />
            <Route path="/referrals" element={<ReferralProgramPage />} />
            <Route path="/deposit" element={<PlaceholderPage title="Deposit" />} />
            <Route path="/withdraw" element={<PlaceholderPage title="Withdraw" />} />
            <Route path="/transfer-fund" element={<PlaceholderPage title="Transfer Fund" />} />
            <Route path="/request-fund" element={<PlaceholderPage title="Request Fund" />} />
            <Route path="/income-history" element={<PlaceholderPage title="Income History" />} />
            <Route path="/deposit-history" element={<PlaceholderPage title="Deposit History" />} />
            <Route path="/withdraw-records" element={<PlaceholderPage title="Withdraw Records" />} />
            <Route path="/franchise-application" element={<PlaceholderPage title="Franchise Application" />} />
            <Route path="/cvs-credit-application" element={<PlaceholderPage title="CVS Credit Application" />} />
            <Route path="/cvs-profile" element={<ProfilePage />} />
          </Route>

          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route element={<AdminSharedLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/deposits/pending" element={<ManageDeposits filter="Pending" />} />
            <Route path="/admin/deposits/approved" element={<ManageDeposits filter="Approved" />} />
            <Route path="/admin/withdrawals/pending" element={<ManageWithdrawals filter="Pending" />} />
            <Route path="/admin/withdrawals/approved" element={<ManageWithdrawals filter="Approved" />} />
            <Route path="/admin/deposits" element={<ManageDeposits />} />
            <Route path="/admin/withdrawals" element={<ManageWithdrawals />} />
            <Route path="/admin/request-fund/pending" element={<AdminPlaceholderPage title="Pending Request-Fund" />} />
            <Route path="/admin/request-fund/approved" element={<AdminPlaceholderPage title="Approved Request-Fund" />} />
            <Route path="/admin/transfer-history" element={<AdminPlaceholderPage title="Transfer History" />} />
            <Route path="/admin/activation-funds" element={<AdminPlaceholderPage title="Activation Funds" />} />
            <Route path="/admin/settings" element={<AdminPlaceholderPage title="System Settings" />} />
            <Route path="/admin/security-logs" element={<AdminPlaceholderPage title="Security Logs" />} />
          </Route>

        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;