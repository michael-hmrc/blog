import React from 'react';
import Accordion from '../components/Accordion';
import Copyright from '../components/Copyright';
import H1 from '../components/general/H1';
import Navbar from '../components/navigation_bar/NavBar';

const TermsOfService: React.FC = () => {


  const accordions = [
    {
      title: '1. Personal Use Only',
      content: 'Welcome to my personal blog! This blog is created for personal use only, where I share my thoughts, experiences, and other content I find interesting. By accessing or using this blog, you agree to comply with and be bound by the following terms and conditions.',
    },
    {
      title: '2. Content Ownership',
      content: 'All content on this blog, including text, images, and other media, is the property of the blog owner unless otherwise stated. You may not reproduce, distribute, or use the content for commercial purposes without explicit permission from the owner.',
    },
    {
      title: '3. User Conduct',
      content: 'While commenting on or interacting with the blog, users are expected to conduct themselves respectfully and lawfully. Any inappropriate, offensive, or illegal behavior may result in the removal of comments and/or blocking of users.',
    },

    {
      title: '4. Privacy',
      content: 'Your privacy is important to me. Any personal information you provide, such as through comments or subscriptions, will be handled with care and will not be shared with third parties without your consent unless required by law.',
    },
    {
      title: '5. External Links',
      content: 'This blog may contain links to external websites that are not controlled or operated by me. I am not responsible for the content or practices of these external sites. Visiting these links is at your own risk.',
    },
    {
      title: '6. Disclaimer',
      content: 'The content provided on this blog is for informational purposes only and reflects my personal opinions and experiences. I make no representations or warranties regarding the accuracy or completeness of the content. The blog is provided on an "as-is" basis, and I disclaim any liability for any errors or omissions.',
    },
    {
      title: '7. Changes to the Terms',
      content: 'I reserve the right to modify these terms of service at any time. Any changes will be posted on this page, and your continued use of the blog constitutes acceptance of the updated terms.'
    }
  ];


  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-100">
      
      <div className='text-center'>
        <H1 id={"terms-of-service"} message={"Terms Of Service"} className={""} />
      </div>

      <div className="flex-grow container mx-auto p-4">
        <div className="flex justify-center">
          <div className="w-full md:w-3/4 lg:w-2/3 xl:w-2/3">
            <div className="bg-gray-100 rounded-lg p-6">
              {accordions.map((accordion, index) => (
                <Accordion key={index} title={accordion.title} content={accordion.content} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default TermsOfService;
