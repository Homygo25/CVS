
import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';
import { motion } from 'framer-motion';

const PlaceholderPage = ({ title }) => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>{title} - CVS PartnerPlus</title>
        <meta name="description" content={`This is the ${title} page for CVS PartnerPlus. Feature coming soon.`} />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 120, damping: 15, duration: 0.7 }}
          className="bg-white p-8 sm:p-12 rounded-xl shadow-2xl max-w-md w-full"
        >
          <Construction className="w-20 h-20 text-red-500 mx-auto mb-6 animate-pulse" />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">{title}</h1>
          <p className="text-gray-600 text-lg mb-8">
            This page is currently under construction.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            The "{title}" feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(220, 38, 38, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-300 ease-in-out flex items-center justify-center mx-auto group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Go Back
          </motion.button>
        </motion.div>
        <p className="mt-8 text-sm text-gray-500">
            &copy; {new Date().getFullYear()} CVS PartnerPlus. Your trust, our priority.
        </p>
      </div>
    </>
  );
};

export default PlaceholderPage;
