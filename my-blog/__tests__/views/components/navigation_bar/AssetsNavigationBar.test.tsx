import { fireEvent, render, screen } from '@testing-library/react';

import { BrowserRouter as Router } from 'react-router-dom';
import AssetsNavigationBar from '../../../../src/views/components/navigation_bar/AssetsNavigationBar';

describe('AssetsNavigationBar component', () => {
    test('renders the AssetsNavigationBar component with correct links', () => {
        render(
            <Router>
                <AssetsNavigationBar />
            </Router>
        );

        // const homeLink = screen.getByText('Home');
        const buttonsLink = screen.getByText('Buttons');
        const imagesLink = screen.getByText('Images');
        const loadingLink = screen.getByText('Loading');
        const videosLink = screen.getByText('Videos');
        const formsLink = screen.getByText('Forms');
        const checkboxesLink = screen.getByText('Checkboxes');
        const radiosLink = screen.getByText('Radios');

        // expect(homeLink).toBeInTheDocument();
        expect(buttonsLink).toBeInTheDocument();
        expect(imagesLink).toBeInTheDocument();
        expect(loadingLink).toBeInTheDocument();
        expect(videosLink).toBeInTheDocument();
        expect(formsLink).toBeInTheDocument();
        expect(checkboxesLink).toBeInTheDocument();
        expect(radiosLink).toBeInTheDocument();
    });

    // TODO: Test does not work think the mobile menu only appears when resolution is small so hard to test here
    // test('toggles mobile menu visibility on click', () => {
    //     render(
    //         <Router>
    //             <AssetsNavigationBar />
    //         </Router>
    //     );

    //     const mobileMenuButton = screen.getByRole('button'); // Assuming MobileNavBar has a button role
    //     const buttonsLink = screen.getByText('Buttons');


    //     // Simulate click to initiallty be visable
    //     expect(buttonsLink).toBeVisible();

    //     // Menu should be hidden after click
    //     fireEvent.click(mobileMenuButton);
    //     expect(buttonsLink).not.toBeVisible();

    //     // Simulate click to close the menu
    //     fireEvent.click(mobileMenuButton);
    //     expect(buttonsLink).not.toBeVisible();
    // });
});
