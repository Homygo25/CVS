import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { UserCircle, Edit3, UploadCloud, CheckCircle, AlertTriangle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const defaultAvatar = null; // Or a path to a default avatar image if you have one in public folder

const ProfilePage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [profilePic, setProfilePic] = useState(defaultAvatar);
  const [newImageFile, setNewImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const userDataString = localStorage.getItem('cvsPartnerPlusUser');
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        setCurrentUser(userData);
        const storedProfilePic = localStorage.getItem(`cvsPartnerPlusProfilePic_${userData.username}`);
        if (storedProfilePic) {
          setProfilePic(storedProfilePic);
        }
      } catch (error) {
        console.error("Failed to parse user data from localStorage", error);
        toast({
          title: "Error",
          description: "Could not load user data.",
          variant: "destructive",
        });
      }
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // Max 2MB
        toast({
          title: "File Too Large",
          description: "Please select an image smaller than 2MB.",
          variant: "destructive",
        });
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please select a valid image file (JPG, PNG, GIF, WebP).",
          variant: "destructive",
        });
        return;
      }
      setNewImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result); // Preview new image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadImage = async () => {
    if (!newImageFile || !currentUser) return;

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        localStorage.setItem(`cvsPartnerPlusProfilePic_${currentUser.username}`, base64String);
        setProfilePic(base64String); // Update displayed pic to the saved one
        setNewImageFile(null); // Clear the selection
        toast({
          title: "Profile Picture Updated!",
          description: "Your new profile picture has been saved.",
          variant: "success",
        });
        // Force a re-render in other components if necessary, e.g., by updating a global state or a version key.
        // For now, localStorage change should be picked up by components re-fetching on mount/update.
      };
      reader.readAsDataURL(newImageFile);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload Failed",
        description: "Could not save your profile picture. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Helmet>
        <title>{currentUser?.username || 'User'}'s Profile - CVS PartnerPlus</title>
        <meta name="description" content="Manage your CVS PartnerPlus profile and update your picture." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto max-w-2xl py-8 px-4"
      >
        <div className="bg-white shadow-xl rounded-xl p-6 md:p-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">My Profile</h1>
          <p className="text-gray-500 mb-8 text-center">View and update your profile details.</p>

          <div className="flex flex-col items-center space-y-6">
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full ring-4 ring-red-300 flex items-center justify-center bg-gray-200 overflow-hidden shadow-lg">
                {profilePic ? (
                  <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <UserCircle className="w-20 h-20 md:w-24 md:h-24 text-gray-400" />
                )}
              </div>
              <button
                onClick={triggerFileInput}
                className="absolute bottom-0 right-0 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-md transition-transform transform group-hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                aria-label="Change profile picture"
              >
                <Edit3 size={18} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/gif, image/webp"
                className="hidden"
              />
            </div>

            {currentUser && (
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-700">{currentUser.username}</h2>
                {currentUser.email && <p className="text-gray-500">{currentUser.email}</p>}
              </div>
            )}

            {newImageFile && (
              <motion.button
                onClick={handleUploadImage}
                disabled={isUploading}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center space-x-2 w-full max-w-xs bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
              >
                {isUploading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                ) : (
                  <UploadCloud size={20} />
                )}
                <span>{isUploading ? 'Saving...' : 'Save New Picture'}</span>
              </motion.button>
            )}

            {!currentUser && (
                 <div className="text-center py-4 px-6 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 rounded-md">
                    <div className="flex items-center">
                        <AlertTriangle className="h-6 w-6 mr-3"/>
                        <div>
                            <p className="font-bold">User Not Loaded</p>
                            <p className="text-sm">Could not load user information. Please try logging in again.</p>
                        </div>
                    </div>
                </div>
            )}
          </div>
          
          <div className="mt-10 border-t pt-6 text-center">
            <p className="text-sm text-gray-400">
                For more account settings, please contact support.
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProfilePage;