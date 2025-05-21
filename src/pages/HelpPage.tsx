import React from 'react';
import { FileText, Video, MessageSquare, BookOpen } from 'lucide-react';

const HelpPage: React.FC = () => {
  const helpResources = [
    { 
      title: 'User Guides', 
      icon: <FileText size={24} />,
      description: 'Step-by-step guides for all platform features',
      cta: 'Browse Guides',
      color: 'bg-navy'
    },
    { 
      title: 'Video Tutorials', 
      icon: <Video size={24} />,
      description: 'Watch tutorial videos for quick learning',
      cta: 'Watch Videos',
      color: 'bg-gold'
    },
    { 
      title: 'Support Chat', 
      icon: <MessageSquare size={24} />,
      description: 'Get help from our support team in real-time',
      cta: 'Start Chat',
      color: 'bg-sage'
    },
    { 
      title: 'Knowledge Base', 
      icon: <BookOpen size={24} />,
      description: 'Search our extensive documentation library',
      cta: 'Search Articles',
      color: 'bg-lightblue'
    },
  ];
  
  const faqs = [
    {
      question: 'How do I add a new user to my organization?',
      answer: 'Navigate to Settings > User Management and click "Add User". Fill in the required fields and set appropriate permissions.'
    },
    {
      question: 'What does the Client Health Score measure?',
      answer: 'The Client Health Score is a composite metric that considers adoption rate, usage frequency, feature engagement, and support ticket volume to assess overall client success.'
    },
    {
      question: 'How can I schedule a recurring report?',
      answer: 'From the Reports module, open any report and click "Schedule". Set your preferred frequency, format, and recipients.'
    },
    {
      question: 'Can I customize the dashboard views?',
      answer: 'Yes, you can rearrange dashboard cards, customize chart types, and save preferred views from the "Data Display" section in Settings.'
    },
    {
      question: 'How is "Time Saved" calculated?',
      answer: 'Time Saved is calculated based on baseline measurements of manual task completion times compared to automated process times, multiplied by usage frequency.'
    }
  ];
  
  return (
    <div className="space-y-8">
      <div className="card text-center py-8">
        <h2 className="text-2xl font-heading mb-2">Help & Support Center</h2>
        <p className="text-charcoal-light max-w-2xl mx-auto mb-6">
          Find answers to your questions with our comprehensive help resources or contact our support team for assistance.
        </p>
        <div className="relative max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Search for help topics..."
            className="w-full border border-silver rounded-full px-5 py-3 pr-12"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-navy">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {helpResources.map((resource, index) => (
          <div key={index} className="card text-center hover:shadow-card-hover transition-shadow">
            <div className={`${resource.color} text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4`}>
              {resource.icon}
            </div>
            <h3 className="mb-2">{resource.title}</h3>
            <p className="text-charcoal-light text-sm mb-4">
              {resource.description}
            </p>
            <button className="btn-tertiary text-sm w-full">
              {resource.cta}
            </button>
          </div>
        ))}
      </div>
      
      <div className="card">
        <h3 className="mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-silver rounded-md overflow-hidden">
              <details className="group">
                <summary className="flex justify-between items-center p-4 cursor-pointer bg-white hover:bg-silver-light">
                  <h4 className="font-medium text-navy">{faq.question}</h4>
                  <svg className="w-5 h-5 text-navy group-open:rotate-180 transition-transform" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <div className="p-4 border-t border-silver bg-silver-light">
                  <p className="text-charcoal">{faq.answer}</p>
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-navy text-white rounded-md p-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="text-xl font-heading mb-2">Need Additional Help?</h3>
            <p className="text-white/80 mb-4 md:mb-0">
              Our support team is available Monday-Friday, 9am-6pm ET
            </p>
          </div>
          <div className="space-x-4">
            <button className="bg-white text-navy font-medium px-4 py-2 rounded hover:bg-silver transition-colors">
              Email Support
            </button>
            <button className="bg-gold text-white font-medium px-4 py-2 rounded hover:bg-gold-dark transition-colors">
              Schedule Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;