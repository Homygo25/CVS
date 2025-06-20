import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowLeft } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/e9c8adec-92c0-4d77-954c-48bfea47a5a7/0086dcdafa998094ec220382749622c8.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both username and password.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const userData = {
        username: username,
        balance: 193.27,
        loginTime: new Date().toISOString()
      };
      
      localStorage.setItem('cvsPartnerPlusUser', JSON.stringify(userData));
      
      toast({
        title: "Login Successful!",
        description: "Welcome to CVS PartnerPlus",
      });
      
      navigate('/dashboard');
      setIsLoading(false);
    }, 1500);
  };

  const handleBackToSplash = () => {
    navigate('/');
  };

  const handleForgotPassword = () => {
    toast({
      title: "🚧 Feature Coming Soon",
      description: "Password recovery isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <>
      <Helmet>
        <title>Login - CVS PartnerPlus</title>
        <meta name="description" content="Login to your CVS PartnerPlus investment account to access your portfolio and start earning passive income." />
      </Helmet>
      
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleBackToSplash}
          className="absolute top-6 left-6 z-10 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </motion.button>

        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-sm space-y-8"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex justify-center mb-4"
            >
              <img src={logoUrl} alt="CVS Pharmacy Logo" className="h-12 object-contain" />
            </motion.div>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-gray-600" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl font-bold text-center text-gray-900"
            >
              Login
            </motion.h1>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onSubmit={handleLogin}
              className="space-y-6"
            >
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Username..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-200 rounded-lg border-0 focus:ring-2 focus:ring-red-500 focus:bg-white transition-all duration-200 text-gray-900 placeholder-gray-500"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-200 rounded-lg border-0 focus:ring-2 focus:ring-red-500 focus:bg-white transition-all duration-200 text-gray-900 placeholder-gray-500"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white font-bold py-4 px-6 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </motion.button>

              <motion.button
                type="button"
                onClick={handleForgotPassword}
                className="w-full text-gray-500 text-sm hover:text-gray-700 transition-colors"
              >
                Forgot your password?
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;