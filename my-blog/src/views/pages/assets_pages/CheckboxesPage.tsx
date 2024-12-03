import React from 'react';
import Copyright from '../../components/Copyright';
import AssetsNavigationBar from '../../components/navigation_bar/AssetsNavigationBar';
import Spacer from '../../components/Spacer';

const CheckboxesPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-nunito bg-stone-200">
      <Spacer size='pb-20' />
      <div className="flex-grow container mx-auto p-4">
        <Spacer size='pb-20' />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent pt-6">Checkboxes</h1>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default CheckboxesPage;
