import React, { useState, useEffect } from 'react';
import { User, Mail, Calendar, Shield, Edit2, Save, X, Loader2, Camera } from 'lucide-react';
import axios from 'axios';
import useAuthStore from '../store/authStore';
import { useUIStore } from '../store/uiStore';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  
  const { user, accessToken, apiBaseUrl, updateUser } = useAuthStore();
  const { showToast } = useUIStore();
  
  const [userData, setUserData] = useState(null);
  const [editForm, setEditForm] = useState({
    username: '',
    email: ''
  });

  // Configure axios defaults
  const api = axios.create({
    baseURL: `${apiBaseUrl}`,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  // Fetch user profile from backend
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/users/current-user');
      
      const data = response.data.data; // Assuming your API returns { data: { user data } }
      setUserData(data);
      updateUser(data);
      
    } catch (error) {
      console.error('Error fetching profile:', error);
      showToast(error.response?.data?.message || 'Failed to load profile data', 'error');
      
      // Fallback to stored user data if fetch fails
      if (user) {
        setUserData(user);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm({
      username: userData.username,
      email: userData.email
    });
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      const response = await api.patch('/users/update-details', editForm);
      
      const updatedData = response.data.data;
      setUserData(updatedData);
      updateUser(updatedData);
      setIsEditing(false);
      showToast('Profile updated successfully', 'success');
      
    } catch (error) {
      console.error('Error updating profile:', error);
      showToast(error.response?.data?.message || 'Failed to update profile', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({
      username: userData.username,
      email: userData.email
    });
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showToast('Please select an image file', 'error');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToast('Image size should be less than 5MB', 'error');
      return;
    }

    try {
      setIsUploadingAvatar(true);
      
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await axios.put(
        `${apiBaseUrl}/users/update-avatar`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const updatedData = response.data.data;
      setUserData(updatedData);
      updateUser(updatedData);
      showToast('Avatar updated successfully', 'success');
      
    } catch (error) {
      console.error('Error uploading avatar:', error);
      showToast(error.response?.data?.message || 'Failed to upload avatar', 'error');
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-blue-200 text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  // No data state
  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-blue-200 text-lg">Failed to load profile data</p>
          <button 
            onClick={fetchUserProfile}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Profile</h1>
          <p className="text-blue-200">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
          {/* Banner */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-800"></div>
          
          {/* Profile Content */}
          <div className="px-8 pb-8">
            {/* Avatar Section */}
            <div className="flex items-end justify-between -mt-16 mb-6">
              <div className="flex items-end gap-4">
                <div className="relative group">
                  <img 
                    src={userData.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(userData.username)} 
                    alt="Profile Avatar"
                    className="w-32 h-32 rounded-full border-4 border-slate-800 object-cover shadow-xl"
                    onError={(e) => {
                      e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(userData.username);
                    }}
                  />
                  
                  {/* Avatar Upload Button */}
                  <label 
                    htmlFor="avatar-upload" 
                    className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                  >
                    {isUploadingAvatar ? (
                      <Loader2 className="w-8 h-8 text-white animate-spin" />
                    ) : (
                      <Camera className="w-8 h-8 text-white" />
                    )}
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                    disabled={isUploadingAvatar}
                  />
                  
                  <div className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-slate-800 ${
                    userData.role === 'user' ? 'bg-green-500' : 'bg-blue-500'
                  }`}></div>
                </div>
                {!isEditing && (
                  <div className="mb-2">
                    <h2 className="text-3xl font-bold text-white capitalize">{userData.username}</h2>
                    <p className="text-blue-300 flex items-center gap-1 mt-1">
                      <Shield className="w-4 h-4" />
                      {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
                    </p>
                  </div>
                )}
              </div>
              
              {!isEditing ? (
                <button 
                  onClick={handleEdit}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors mb-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2 mb-2">
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save
                      </>
                    )}
                  </button>
                  <button 
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="bg-slate-600 hover:bg-slate-700 disabled:bg-slate-800 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* Username Card */}
              <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Username</h3>
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.username}
                    onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                    className="w-full bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                    disabled={isSaving}
                  />
                ) : (
                  <p className="text-blue-200 text-lg capitalize">{userData.username}</p>
                )}
              </div>

              {/* Email Card */}
              <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Email</h3>
                </div>
                {isEditing ? (
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    className="w-full bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                    disabled={isSaving}
                  />
                ) : (
                  <p className="text-blue-200 text-lg break-all">{userData.email}</p>
                )}
              </div>

              {/* Account Created Card */}
              <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Account Created</h3>
                </div>
                <p className="text-blue-200">{formatDate(userData.createdAt)}</p>
              </div>

              {/* Last Updated Card */}
              <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Last Updated</h3>
                </div>
                <p className="text-blue-200">{formatDate(userData.updatedAt)}</p>
              </div>
            </div>

            {/* Role Badge */}
            <div className="mt-6 p-4 bg-blue-900/30 rounded-xl border border-blue-700">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                <span className="text-blue-200">Account Role:</span>
                <span className="text-blue-400 font-semibold uppercase">{userData.role}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}