import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
  isUser: boolean;
}

const LiveChat: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    'university-rep': [
      {
        id: '1',
        sender: 'University Rep',
        text: 'Hello! I\'m Sarah from the admissions office. How can I help you today?',
        timestamp: new Date(Date.now() - 3600000),
        isUser: false,
      },
    ],
    'student-mentor': [
      {
        id: '1',
        sender: 'Student Mentor',
        text: 'Hi there! I\'m Alex, a current student. Feel free to ask me about student life or any questions you have!',
        timestamp: new Date(Date.now() - 7200000),
        isUser: false,
      },
    ],
  });
  
  const contacts = [
    {
      id: 'university-rep',
      name: 'University Representative',
      avatar: '/images/person2.jpg',
      status: 'online',
      lastMessage: 'Hello! I\'m Sarah from the admissions office. How can I help you today?',
    },
    {
      id: 'student-mentor',
      name: 'Student Mentor',
      avatar: '/images/person1.jpg',
      status: 'online',
      lastMessage: 'Hi there! I\'m Alex, a current student. Feel free to ask me about student life or any questions you have!',
    },
  ];
  
  useEffect(() => {
    // Set the first contact as active by default
    if (contacts.length > 0 && !activeChat) {
      setActiveChat(contacts[0].id);
    }
  }, [contacts, activeChat]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !activeChat) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: user?.name || 'You',
      text: message,
      timestamp: new Date(),
      isUser: true,
    };
    
    setMessages(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMessage],
    }));
    
    setMessage('');
    
    // Simulate a reply after 1 second
    setTimeout(() => {
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: activeChat === 'university-rep' ? 'University Rep' : 'Student Mentor',
        text: generateReply(activeChat, message),
        timestamp: new Date(),
        isUser: false,
      };
      
      setMessages(prev => ({
        ...prev,
        [activeChat]: [...(prev[activeChat] || []), replyMessage],
      }));
    }, 1000);
  };
  
  const generateReply = (chatId: string, userMessage: string): string => {
    // This would be replaced with actual AI or ChatBot functionality
    const lowerMessage = userMessage.toLowerCase();
    
    if (chatId === 'university-rep') {
      if (lowerMessage.includes('application') || lowerMessage.includes('apply')) {
        return 'Our application deadline for the fall semester is June 1st. You can apply through our website or the common application.';
      } else if (lowerMessage.includes('scholarship') || lowerMessage.includes('financial aid')) {
        return 'We offer various scholarships based on academic achievement, extracurricular activities, and financial need. I recommend checking out our financial aid page for more details.';
      } else {
        return 'Thank you for your question. Is there anything specific about our university programs or admissions process you\'d like to know?';
      }
    } else {
      if (lowerMessage.includes('dorm') || lowerMessage.includes('housing')) {
        return 'The dorms are pretty great! Most freshmen stay in West Campus, which has recently renovated buildings. The rooms are decent-sized and each floor has a common area for hanging out.';
      } else if (lowerMessage.includes('class') || lowerMessage.includes('professor')) {
        return 'The professors are generally very helpful and approachable. Class sizes vary, but most introductory courses are larger (100-200 students) while upper-level courses are much smaller and more discussion-based.';
      } else {
        return 'Campus life is amazing! There are tons of clubs and activities to get involved with. What specific aspects of student life are you interested in?';
      }
    }
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Live Chat</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="border-r border-gray-200">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Contacts</h2>
            </div>
            
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(80vh - 5rem)' }}>
              {contacts.map(contact => (
                <div
                  key={contact.id}
                  className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 ${
                    activeChat === contact.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setActiveChat(contact.id)}
                >
                  <div className="relative">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                        contact.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                      }`}
                    ></span>
                  </div>
                  
                  <div className="ml-4 flex-grow">
                    <h3 className="font-semibold">{contact.name}</h3>
                    <p className="text-gray-500 text-sm truncate">{contact.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-3">
            {activeChat ? (
              <>
                <div className="p-4 border-b flex items-center">
                  <img
                    src={contacts.find(c => c.id === activeChat)?.avatar}
                    alt={contacts.find(c => c.id === activeChat)?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <h2 className="font-semibold ml-3">
                    {contacts.find(c => c.id === activeChat)?.name}
                  </h2>
                </div>
                
                <div
                  className="p-4 overflow-y-auto"
                  style={{ height: 'calc(80vh - 11rem)' }}
                >
                  {messages[activeChat]?.map(msg => (
                    <div
                      key={msg.id}
                      className={`mb-4 ${
                        msg.isUser ? 'text-right' : 'text-left'
                      }`}
                    >
                      <div
                        className={`inline-block px-4 py-2 rounded-lg ${
                          msg.isUser
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p>{msg.text}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {msg.timestamp.toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t">
                  <form onSubmit={handleSendMessage} className="flex">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-grow p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500">Select a contact to start chatting</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;