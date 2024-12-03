import React from 'react';
import { messages } from '../../messages/about';
import NavbarPages from '../../models/ADTs/NavbarPages';
import Copyright from '../components/Copyright';
import Navbar from '../components/navigation_bar/NavBar';
import Spacer from '../components/Spacer';

const AboutPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gradient-to-r from-purple-300 from-10% to-blue-300">
      <Spacer size="p-10"/>
      <div className="flex flex-grow container mx-auto pt-28 flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex flex-col flex-none w-full md:max-w-4xl lg:max-w-5xl pt-0 pb-5 md:pt-0 pr-8 pl-8 mx-auto">
          <div className="rounded-lg p-8">
            <div>
              <p className="text-lg text-gray-900 mb-4">{messages.lorem.p1}</p>
              <p className="text-lg text-gray-900 mb-4">{messages.lorem.p2}</p>
              <p className="text-lg text-gray-900 mb-4">{messages.lorem.p3}</p>
              <p className="text-lg text-gray-900 mb-4">{messages.lorem.p4}</p>
              <p className="text-lg text-gray-900 mb-4">{messages.lorem.p5}</p>
            </div>
          </div>
        </div>
      </div>

      <Copyright />
    </div>
  );
};

export default AboutPage;
