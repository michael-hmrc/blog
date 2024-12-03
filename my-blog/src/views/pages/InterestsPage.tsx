// src/pages/About.tsx
import React from 'react';
import { messages } from '../../messages/interests';
import Copyright from '../components/Copyright';
import InterestsCard from '../components/InterestsCard';
import H1 from '../components/general/H1';
import Navbar from '../components/navigation_bar/NavBar';
import Spacer from '../components/Spacer';
import NavbarPages from '../../models/ADTs/NavbarPages';


const InterestsGrid: React.FC = () => {
  return (
    <div className="flex-grow container mx-auto pb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <InterestsCard id={1} interest={"OSRS"} description={messages.lorem.p1} />
        <InterestsCard id={2} interest={"League Of Legends"} description={messages.lorem.p1} />
        <InterestsCard id={3} interest={"Cooking"} description={messages.lorem.p1} />
        <InterestsCard id={4} interest={"Gardening"} description={messages.lorem.p1} />
        <InterestsCard id={5} interest={"Reading"} description={messages.lorem.p1} />
      </div>
    </div>
  )
}

const Interests: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-100">
      {/* <Navbar page={NavbarPages.Interests} /> */}
      <Spacer size='p-20'/>
      <InterestsGrid />
      <Copyright />
    </div>
  );
};

export default Interests;
