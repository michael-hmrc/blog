import React from 'react';
import Copyright from '../../components/Copyright';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';

// Example image imports
import darkness_devil from '../../../assets/darkness_devil.jpeg';
import golden_sperm from '../../../assets/golden-transformed.jpeg';
import pochita from '../../../assets/pochita.jpg';
import Spacer from '../../components/Spacer';

const Images: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-nunito bg-stone-200">
      <Spacer size='pb-20' />
      <div className="flex-grow container mx-auto p-4">
        <Spacer size='pb-20' />
        <div className="flex flex-wrap justify-center items-start bg-slate-100/85 p-4">

          <div className="w-full md:w-1/2 lg:w-1/3 p-2">
            <LazyLoadImage
              src={pochita}
              alt="Image 1"
              effect="opacity"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          <div className="w-full md:w-1/2 lg:w-1/3 p-2">
            <LazyLoadImage
              src={darkness_devil}
              alt="Image 2"
              effect="opacity"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          <div className="w-full md:w-1/2 lg:w-1/3 p-2">
            <LazyLoadImage
              src={golden_sperm}
              alt="Image 3"
              effect="opacity"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default Images;
