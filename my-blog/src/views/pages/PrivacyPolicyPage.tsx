import React from 'react';
import Accordion from '../components/Accordion';
import Copyright from '../components/Copyright';
import H1 from '../components/general/H1';
import Navbar from '../components/navigation_bar/NavBar';

const PrivacyPolicy: React.FC = () => {

  const accordions = [
    {
      title: '1. Information We Collect',
      content: (
        <div className='mb-10'>
          <h2 className="text-base font-semibold mt-4 mb-2">1.1 Personal Information</h2>
          <p>We may collect personal information such as your name, email address, and any other information you voluntarily provide when you subscribe to our newsletter, comment on posts, or contact us.</p>

          <h2 className="text-base font-semibold mt-4 mb-2">1.2 Non-Personal Information</h2>
          <p>We collect non-personal information, including your IP address, browser type, operating system, and the pages you visit. This information helps us understand how users interact with our Blog and improve our content.</p>
        </div >
      ),
    },
    {
      title: '2. How We Use Your Information',
      content: (
        <div className='mb-10'>
          <h2 className="text-base font-semibold mt-4 mb-2">2.1 Personal Information</h2>
          <ul className="list-disc list-inside ml-4">
            <li>To send you newsletters and updates if you have subscribed.</li>
            <li>To respond to your comments or inquiries.</li>
            <li>To personalize your experience on our Blog.</li>
          </ul>

          <h2 className="text-base font-semibold mt-4 mb-2">2.2 Non-Personal Information</h2>
          <ul className="list-disc list-inside ml-4">
            <li>To analyze trends and usage patterns to improve our Blog.</li>
            <li>To protect the security and integrity of our Blog.</li>
          </ul>
        </div>
      ),

    },
    {
      title: '3. Cookies and Tracking Technologies',
      content: (
        <div className='mb-10'>
          <h2 className="text-base font-semibold mt-4 mb-2">3.1 Cookies</h2>
          <p>We use cookies and similar tracking technologies to enhance your experience on our Blog. Cookies are small data files stored on your device that help us understand your preferences and optimize our content.</p>

          <h2 className="text-base font-semibold mt-4 mb-2">3.2 Third-Party Analytics</h2>
          <p>We may use third-party analytics tools (such as Google Analytics) to collect and analyze non-personal information. These tools may set cookies on your device to track user activity and behavior.</p>
        </div>
      ),
    },
    {
      title: '4. Sharing Your Information',
      content: (
        <div className='mb-10'>
          <h2 className="text-base font-semibold mt-4 mb-2">4.1 Third-Party Service Providers</h2>
          <p>We may share your information with trusted third-party service providers who assist us in operating our Blog, conducting our business, or serving our users. These providers are required to keep your information confidential.</p>

          <h2 className="text-base font-semibold mt-4 mb-2">4.2 Legal Requirements</h2>
          <p>We may disclose your information if required to do so by law or in response to valid requests by public authorities.</p>
        </div>
      ),
    },
    {
      title: '5. Your Rights and Choices',
      content: (
        <div className='mb-10'>
          <h2 className="text-base font-semibold mt-4 mb-2">5.1 Access and Correction</h2>
          <p>You have the right to access, correct, or delete your personal information that we hold. To exercise these rights, please contact us at [Your Contact Information].</p>

          <h2 className="text-base font-semibold mt-4 mb-2">5.2 Opting Out</h2>
          <p>If you no longer wish to receive newsletters or promotional emails, you can opt out by following the unsubscribe link in the emails or contacting us directly.</p>
        </div>
      ),
    },
    {
      title: '6. Data Security',
      content: (
        <div className='mb-6'>
          <p>We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, please be aware that no security measures are perfect, and we cannot guarantee absolute security.</p>
        </div>
      ),
    },
    {
      title: '7. Changes to This Privacy Policy',
      content: (
        <div className='mb-6'>
          <p >We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any significant changes by posting the new policy on our Blog with an updated effective date.</p>
        </div>
      ),
    },
    {
      title: '8. Contact Us',
      content: (
        <div className='mb-6'>
          <p>If you have any questions or concerns about this Privacy Policy, please contact us at [Your Contact Information].</p>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-100">
      <div className="flex-grow container mx-auto p-4">
        <div className='text-center'>
          <H1 id={"privacy-policy"} message={"Privacy Policy"} className={""} />
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
      </div>
      <Copyright />
    </div>
  );
};

export default PrivacyPolicy;
