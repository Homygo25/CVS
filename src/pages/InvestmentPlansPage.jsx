
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';
import { TrendingUp, CalendarDays, Coins, ShieldCheck, Tag, List, LayoutGrid } from 'lucide-react';

const planImageURL = "https://storage.googleapis.com/hostinger-horizons-assets-prod/e9c8adec-92c0-4d77-954c-48bfea47a5a7/de3e24e1e549fb3d05a9943d40ab2e90.png";
const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/e9c8adec-92c0-4d77-954c-48bfea47a5a7/0086dcdafa998094ec220382749622c8.png";


const investmentPlans = [
  {
    id: 'essential',
    name: 'Essential Care Plan',
    dailyInterest: '0.5%',
    duration: '6 months (180 days)',
    minInvestment: 'PHP 10,000', // Placeholder, original image shows $200
    maxInvestment: 'PHP 200,000',
    maturityRelease: 'Full capital + interest auto-released on day 180',
    benefits: [
      'Monthly prescription delivery',
      '5% discount on OTC',
      'Monthly SMS/email reminders',
    ],
    icon: ShieldCheck,
    color: 'bg-red-600', // Fallback color if image fails
    textColor: 'text-red-600',
    priceStarts: 'PHP 10,000'
  },
  {
    id: 'family',
    name: 'Family Wellness Plan',
    dailyInterest: '0.7%',
    duration: '8 months (240 days)',
    minInvestment: 'PHP 20,000',
    maxInvestment: 'PHP 500,000',
    maturityRelease: 'After 240 days',
    benefits: [
      '10% off non-prescription items',
      'Pediatric/senior consultations',
      'Annual health screening vouchers',
    ],
    icon: Tag,
    color: 'bg-rose-600',
    textColor: 'text-rose-600',
    priceStarts: 'PHP 20,000'
  },
  {
    id: 'premium',
    name: 'Premium Plus Plan',
    dailyInterest: '1.0%',
    duration: '6 months (180 days)',
    minInvestment: 'PHP 100,000',
    maxInvestment: 'PHP 1,000,000',
    maturityRelease: 'Lump-sum payout after 180 days',
    benefits: [
      'Concierge pharmacy service',
      '15% discount across CVS services',
      'Priority access to health webinars',
    ],
    icon: TrendingUp,
    color: 'bg-pink-600',
    textColor: 'text-pink-600',
    priceStarts: 'PHP 100,000'
  },
];

const PlanCard = ({ plan, index }) => {
  const handleInvestNow = () => {
    toast({
      title: `🚧 Invest in ${plan.name} Coming Soon`,
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300"
    >
      <div 
        className="p-6 text-white relative bg-cover bg-center"
        style={{ backgroundImage: `url(${planImageURL})` }}
      >
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        <div className="relative z-10">
          <img src={logoUrl} alt="CVS Pharmacy Logo" className="h-8 mb-4 opacity-90" />
          <h2 className="text-3xl font-bold mb-2">{plan.name}</h2>
          
          <div className="grid grid-cols-2 gap-x-6 items-end mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg text-center">
              <p className="text-xs uppercase tracking-wider">Price Starts At</p>
              <p className="text-2xl font-bold">{plan.priceStarts.replace('PHP ', '₱')}</p>
              <p className="text-xs">{plan.dailyInterest} Daily Interest</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{plan.duration.split(' ')[0]} MONTHS</p>
              <p className="text-xs uppercase tracking-wider">Maturity Capital Release</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6 flex-grow">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-4 text-gray-700">
            <p><Coins className="inline w-4 h-4 mr-1 text-gray-500" /> Daily Interest: <span className="font-semibold">{plan.dailyInterest}</span></p>
            <p><CalendarDays className="inline w-4 h-4 mr-1 text-gray-500" /> Duration: <span className="font-semibold">{plan.duration}</span></p>
            <p>Min: <span className="font-semibold">{plan.minInvestment}</span></p>
            <p>Max: <span className="font-semibold">{plan.maxInvestment}</span></p>
        </div>
        <h3 className={`text-lg font-semibold mb-3 ${plan.textColor}`}>Benefits:</h3>
        <ul className="space-y-2 text-gray-700 text-sm list-disc list-inside">
          {plan.benefits.map((benefit, i) => (
            <li key={i}>{benefit}</li>
          ))}
        </ul>
        <p className="text-xs text-gray-500 mt-4">Maturity: {plan.maturityRelease}</p>
      </div>
      <div className="p-6 bg-gray-50">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleInvestNow}
          className={`w-full text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ${plan.color}`}
        >
          Invest Now
        </motion.button>
      </div>
    </motion.div>
  );
};

const PlanRow = ({ plan }) => {
  const handleInvestNow = () => {
    toast({
      title: `🚧 Invest in ${plan.name} Coming Soon`,
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="py-3 px-4 font-semibold text-gray-800">{plan.name}</td>
      <td className={`py-3 px-4 font-semibold ${plan.textColor}`}>{plan.dailyInterest}</td>
      <td className="py-3 px-4 text-gray-700">{plan.minInvestment}</td>
      <td className="py-3 px-4 text-gray-700">{plan.maxInvestment}</td>
      <td className="py-3 px-4 text-gray-700">{plan.duration}</td>
      <td className="py-3 px-4 text-gray-700 text-xs">{plan.maturityRelease}</td>
      <td className="py-3 px-4">
        <button
          onClick={handleInvestNow}
          className={`text-white text-sm font-semibold py-2 px-3 rounded-md shadow-sm hover:shadow-md transition-all duration-200 ${plan.color}`}
        >
          Invest
        </button>
      </td>
    </tr>
  );
};

const InvestmentPlansPage = () => {
  const [viewMode, setViewMode] = useState('card'); 

  return (
    <>
      <Helmet>
        <title>Investment Plans - CVS PartnerPlus</title>
        <meta name="description" content="Explore various investment plans offered by CVS PartnerPlus. Choose a plan that aligns with your financial goals and health needs." />
      </Helmet>
      <div className="min-h-screen bg-gray-100 pb-24">
        <header className="bg-white shadow-md sticky top-0 z-20">
          <div className="container mx-auto px-6 py-5">
            <h1 className="text-3xl font-bold text-gray-800">Investment Plans</h1>
            <p className="text-gray-600 mt-1">Choose the plan that fits your health + financial goals</p>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8">
          <div className="flex justify-end mb-6">
            <div className="bg-gray-200 p-1 rounded-lg flex items-center space-x-1">
              <button
                onClick={() => setViewMode('card')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'card' ? 'bg-red-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-300'}`}
              >
                <LayoutGrid className="inline w-4 h-4 mr-1" /> Card View
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'table' ? 'bg-red-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-300'}`}
              >
                <List className="inline w-4 h-4 mr-1" /> Table View
              </button>
            </div>
          </div>

          {viewMode === 'card' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {investmentPlans.map((plan, index) => (
                <PlanCard key={plan.id} plan={plan} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-xl overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-max text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 text-left font-semibold text-gray-600">Plan</th>
                      <th className="py-3 px-4 text-left font-semibold text-gray-600">Rate</th>
                      <th className="py-3 px-4 text-left font-semibold text-gray-600">Min Investment</th>
                      <th className="py-3 px-4 text-left font-semibold text-gray-600">Max Investment</th>
                      <th className="py-3 px-4 text-left font-semibold text-gray-600">Duration</th>
                      <th className="py-3 px-4 text-left font-semibold text-gray-600">Payout</th>
                      <th className="py-3 px-4 text-left font-semibold text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {investmentPlans.map((plan) => (
                      <PlanRow key={plan.id} plan={plan} />
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </>
  );
};

export default InvestmentPlansPage;
