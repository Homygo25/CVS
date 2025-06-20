
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';

const AdminPlaceholderPage = ({ title }) => {
  return (
    <>
      <Helmet>
        <title>{title} - CVS Admin</title>
        <meta name="description" content={`Placeholder page for ${title} in CVS PartnerPlus Admin Panel.`} />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-6 bg-slate-50"
      >
        <Construction className="w-24 h-24 text-red-400 mb-8" />
        <h1 className="text-4xl font-bold text-gray-700 mb-4">{title}</h1>
        <p className="text-lg text-gray-500 mb-2">This section is currently under construction.</p>
        <p className="text-md text-gray-400">
          Functionality for managing {title.toLowerCase()} will be implemented soon.
        </p>
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            className="mt-8 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-colors duration-150"
        >
            Go Back
        </motion.button>
      </motion.div>
    </>
  );
};

export default AdminPlaceholderPage;
