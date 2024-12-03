import React, { useEffect, useState } from 'react';
import messages from '../../messages/contact';
import Copyright from '../components/Copyright';
import Navbar from '../components/navigation_bar/NavBar';

import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import email_icon from '../../assets/email_icon.png';
import house_icon from '../../assets/house_icon.png';
import telephone_icon from '../../assets/telephone_icon.png';
import NavbarPages from '../../models/ADTs/NavbarPages';
import Spacer from '../components/Spacer';

const ContactPage: React.FC = () => {
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImages(true); // Show images after a delay (e.g., 2 seconds)
    }, 20); // Adjust this delay as needed (2000ms = 2 seconds)

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  const copyToClipboard = (text: string, valueCopied: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied ${valueCopied} to clipboard!`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const copyFullAddress = () => {
    const fullAddress = `${messages.address.houseNumber} ${messages.address.street}, ${messages.address.county}, ${messages.address.city}, ${messages.address.country}, ${messages.address.postcode}`;
    copyToClipboard(fullAddress, '"Address"');
  };

  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gradient-to-r from-green-100 from-10% to-blue-300">
      {/* <Navbar page={NavbarPages.Contact} /> */}

      <Spacer size='p-10' />

      <div className="flex-grow container mx-auto p-4">
        <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex flex-col w-full pt-10 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 rounded-lg p-4 sm:p-8 mt-4 sm:mt-12 mb-12">

              {/* Lazy load images only after the delay */}
              <div className="flex flex-col items-center text-center text-xl bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                <div className="w-1/2 md:w-1/3 lg:w-1/2 mt-4 sm:mt-10 p-4 sm:p-6">
                  {showImages && (
                    <LazyLoadImage
                      src={telephone_icon}
                      alt="telephone_icon"
                      effect="opacity"
                      className="w-full h-auto rounded-lg"
                    />
                  )}
                </div>
                <div className="flex items-center justify-center mt-6">
                  <p className="text-lg sm:text-2xl text-black mb-2 pt-2">{messages.phoneNumber.mobile}</p>
                  <div data-testid="copy-mobile-number-icon" id="copy-mobile-number-icon" className="flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faCopy}
                      className="ml-3 text-gray-800 cursor-pointer"
                      onClick={() => copyToClipboard(messages.phoneNumber.mobile, '"Mobile number"')}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center text-center text-xl bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                <div className="w-full md:w-1/2 lg:w-1/2 p-4 sm:p-6">
                  {showImages && (
                    <LazyLoadImage
                      src={house_icon}
                      alt="house_icon"
                      effect="opacity"
                      className="w-full h-auto rounded-lg pt-8 pb-10"
                    />
                  )}
                </div>

                <div className="flex items-center justify-center">
                  <p className="text-lg sm:text-2xl text-black">
                    {messages.address.houseNumber} {messages.address.street}
                  </p>
                  <div data-testid="copy-address-icon" id="copy-address-icon" className="flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faCopy}
                      className="ml-3 text-gray-800 cursor-pointer"
                      onClick={copyFullAddress}
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center mb-4">
                  <p className="text-lg sm:text-2xl text-black">{messages.address.county}</p>
                  <p className="text-lg sm:text-2xl text-black">{messages.address.city}</p>
                  <p className="text-lg sm:text-2xl text-black">{messages.address.country}</p>
                  <p className="text-lg sm:text-2xl text-black">{messages.address.postcode}</p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center text-xl bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                <div className="w-1/2 md:w-1/3 lg:w-1/2 mt-4 sm:mt-10 p-4 sm:p-8">
                  {showImages && (
                    <LazyLoadImage
                      src={email_icon}
                      alt="email_icon"
                      effect="opacity"
                      className="w-full h-auto rounded-lg"
                    />
                  )}
                </div>
                <div className="flex items-center justify-center mt-8">
                  <p className="text-lg sm:text-2xl text-black">{messages.email}</p>
                  <div data-testid="copy-email-icon" id="copy-email-icon" className="flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faCopy}
                      className="ml-3 text-gray-800 cursor-pointer"
                      onClick={() => copyToClipboard(messages.email, '"Email"')}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Copyright />
    </div>
  );
};

export default ContactPage;
