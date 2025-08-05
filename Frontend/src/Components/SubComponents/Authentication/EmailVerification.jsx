import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8004/user/verify',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (response.data.success) {
          setVerificationStatus('success');
          toast.success(
            <div className="flex items-center">
              <FaCheckCircle className="text-green-500 mr-2" />
              {response.data.message || 'Email verified successfully!'}
            </div>,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              className: "bg-gray-900 text-white"
            }
          );

          // Redirect to login after 3 seconds
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          throw new Error(response.data.message || 'Verification failed');
        }
      } catch (error) {
        setVerificationStatus('error');
        setErrorMessage(
          error.response?.data?.message || 
          error.message || 
          'Email verification failed. Please try again.'
        );

        toast.error(
          <div className="flex items-center">
            <FaTimesCircle className="text-red-500 mr-2" />
            {error.response?.data?.message || 'Verification failed'}
          </div>,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            className: "bg-gray-900 text-white"
          }
        );
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setVerificationStatus('error');
      setErrorMessage('Invalid verification link');
    }
  }, [token, navigate]);

  const renderContent = () => {
    switch (verificationStatus) {
      case 'verifying':
        return (
          <div className="flex flex-col items-center">
            <div className="animate-spin mb-4">
              <FaSpinner className="text-yellow-500 text-4xl" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Verifying Your Email</h2>
            <p className="text-gray-400">Please wait while we verify your email address...</p>
          </div>
        );
      case 'success':
        return (
          <div className="flex flex-col items-center">
            <FaCheckCircle className="text-green-500 text-6xl mb-4" />
            <h2 className="text-2xl font-bold mb-2">Email Verified!</h2>
            <p className="text-gray-400 mb-6">Your email has been successfully verified.</p>
            <p className="text-gray-400">You will be redirected to the login page shortly...</p>
          </div>
        );
      case 'error':
        return (
          <div className="flex flex-col items-center">
            <FaTimesCircle className="text-red-500 text-6xl mb-4" />
            <h2 className="text-2xl font-bold mb-2">Verification Failed</h2>
            <p className="text-gray-400 mb-6 text-center">{errorMessage}</p>
            <button
              onClick={() => navigate('/register')}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-6 rounded-lg"
            >
              Register Again
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <ToastContainer />
      
      <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-800 text-center">
        {renderContent()}
      </div>
    </div>
  );
};

export default EmailVerification;