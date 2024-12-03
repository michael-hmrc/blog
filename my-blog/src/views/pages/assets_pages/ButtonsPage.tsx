import React from 'react';
import Button from '../../components/buttons/Button';
import Copyright from '../../components/Copyright';
import Spacer from '../../components/Spacer';

const ButtonsPage: React.FC = () => {

  return (
    <div className="flex flex-col min-h-screen font-nunito bg-stone-200">
      <Spacer size='pb-20' />
      <div className="flex-grow container mx-auto p-4">
        <div className="flex flex-col space-y-4">
          <Spacer size='pb-20' />
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="danger">Danger Button</Button>
          <Button variant="gradient-light-up">Gradient with Light up Button</Button>
          <Button variant="gradient" disabled>Disabled Gradient Button</Button>
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default ButtonsPage;
