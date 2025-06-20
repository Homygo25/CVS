import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/e9c8adec-92c0-4d77-954c-48bfea47a5a7/0086dcdafa998094ec220382749622c8.png";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('cvsPartnerPlusUser');
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
      <Helmet>
        <title>CVS PartnerPlus - Investment Platform</title>
        <meta name="description" content="CVS PartnerPlus - Professional investment platform by CVS ph, the first drive-thru pharmacy in the Philippines. Start your passive income journey today." />
      </Helmet>
      
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img  
            className="w-full h-full object-cover opacity-20" 
            alt="CVS drive-thru pharmacy building"
           src="https://images.unsplash.com/photo-1618525298196-18bab51ca8be" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/90"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center space-y-8 max-w-sm mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center"
            >
              <img src={logoUrl} alt="CVS Pharmacy Logo" className="h-16 sm:h-20 object-contain" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl text-gray-700 handwritten font-medium leading-relaxed"
              style={{ fontFamily: 'Dancing Script, cursive' }}
            >
              1st Drive Thru Pharmacy in the Philippines
            </motion.p>

            <div className="h-16"></div>

            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLoginClick}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Login
            </motion.button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SplashScreen;