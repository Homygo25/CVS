import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';
import { Gift, Users, Link, Copy, MessageCircle, Share2, Mail, Clock, Coins } from 'lucide-react';

const referralEarningsData = [
  { id: 1, friend: 'John D.', dateJoined: '2025-06-15', depositAmount: 'PHP 10,000', bonus: 'PHP 500', status: 'Credited' },
  { id: 2, friend: 'Jane S.', dateJoined: '2025-06-10', depositAmount: 'PHP 20,000', bonus: 'PHP 1,000', status: 'Pending' },
  { id: 3, friend: 'Mike L.', dateJoined: '2025-05-28', depositAmount: 'PHP 5,000', bonus: 'PHP 0', status: 'Canceled' },
];

const ReferralProgramPage = () => {
  const [referralLink, setReferralLink] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('cvsPartnerPlusUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserData(user);
      setReferralLink(`https://cvspartner.plus/join?ref=${user.username}`);
    } else {
      setReferralLink('https://cvspartner.plus/join?ref=defaultUser');
    }
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: 'Link Copied!',
      description: 'Your referral link has been copied to the clipboard.',
    });
  };

  const handleShare = (platform) => {
    let shareUrl = '';
    const text = `Join CVS PartnerPlus and earn! Use my referral link: ${referralLink}`;
    switch (platform) {
      case 'messenger':
        shareUrl = `fb-messenger://share?link=${encodeURIComponent(referralLink)}&app_id=YOUR_FACEBOOK_APP_ID`;
        window.open(shareUrl, '_blank');
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
        window.open(shareUrl, '_blank');
        break;
      case 'sms':
        shareUrl = `sms:?body=${encodeURIComponent(text)}`;
        window.open(shareUrl, '_blank');
        break;
      case 'email':
        shareUrl = `mailto:?subject=Join CVS PartnerPlus&body=${encodeURIComponent(text)}`;
        window.open(shareUrl, '_blank');
        break;
      default:
        toast({ title: "🚧 Share feature under development" });
    }
  };

  return (
    <>
      <Helmet>
        <title>Referral Program - CVS PartnerPlus</title>
        <meta name="description" content="Refer friends to CVS PartnerPlus and earn rewards. Share your unique link and track your referral earnings." />
      </Helmet>
      <div className="min-h-screen bg-gray-100 pb-24">
        <header className="bg-white shadow-md sticky top-0 z-20">
          <div className="container mx-auto px-6 py-5">
            <div className="flex items-center space-x-2">
              <Gift className="w-8 h-8 text-red-500" />
              <h1 className="text-3xl font-bold text-gray-800">Referral Program</h1>
            </div>
            <p className="text-gray-600 mt-1">Earn 5% from every friend's first deposit</p>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8 space-y-10">
          {/* How It Works Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Users className="w-6 h-6 mr-2 text-red-500" /> How It Works
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2">1.</span>
                Share your unique referral link with friends and family.
              </li>
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2">2.</span>
                When they sign up and make their first investment, you earn a 5% bonus of their deposit amount.
              </li>
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2">3.</span>
                Bonuses are automatically credited to your wallet after a 7-day holding period.
              </li>
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2">4.</span>
                Track your referrals and earnings in real-time in your Referral History.
              </li>
            </ul>
          </motion.section>

          {/* Your Link Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Link className="w-6 h-6 mr-2 text-red-500" /> Your Referral Link
            </h2>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-6">
              <input
                type="text"
                readOnly
                value={referralLink}
                className="flex-grow p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-shadow"
              />
              <button
                onClick={copyToClipboard}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
              >
                <Copy className="w-5 h-5 mr-2" /> Copy Link
              </button>
            </div>
            <p className="text-gray-600 mb-3 text-sm">Share via:</p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => handleShare('messenger')} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm transition-colors"><MessageCircle className="w-4 h-4" /> Messenger</button>
              <button onClick={() => handleShare('whatsapp')} className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-sm transition-colors"><Share2 className="w-4 h-4" /> WhatsApp</button>
              <button onClick={() => handleShare('sms')} className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg text-sm transition-colors"><MessageCircle className="w-4 h-4" /> SMS</button>
              <button onClick={() => handleShare('email')} className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-lg text-sm transition-colors"><Mail className="w-4 h-4" /> Email</button>
            </div>
          </motion.section>

          {/* Referral Earnings Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Coins className="w-6 h-6 mr-2 text-red-500" /> Referral Earnings
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-max text-sm text-left text-gray-700">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Referred Friend</th>
                    <th className="py-3 px-4 font-semibold">Date Joined</th>
                    <th className="py-3 px-4 font-semibold">Deposit Amount</th>
                    <th className="py-3 px-4 font-semibold">Your Bonus (5%)</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {referralEarningsData.map((referral) => (
                    <tr key={referral.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">{referral.friend}</td>
                      <td className="py-3 px-4">{referral.dateJoined}</td>
                      <td className="py-3 px-4">{referral.depositAmount}</td>
                      <td className="py-3 px-4 text-green-600 font-semibold">{referral.bonus}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full
                          ${referral.status === 'Credited' ? 'bg-green-100 text-green-700' : ''}
                          ${referral.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                          ${referral.status === 'Canceled' ? 'bg-red-100 text-red-700' : ''}
                        `}>
                          {referral.status === 'Pending' && <Clock className="inline w-3 h-3 mr-1" />}
                          {referral.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {referralEarningsData.length === 0 && <p className="text-center text-gray-500 py-4">No referral earnings yet. Start sharing your link!</p>}
          </motion.section>
        </main>
      </div>
    </>
  );
};

export default ReferralProgramPage;