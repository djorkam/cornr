import React from 'react';
import { useState } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { DiscoveryFeed } from './components/DiscoveryFeed';
import { SignInScreen } from './components/SignInScreen';
import { RegisterScreen } from './components/RegisterScreen';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [userType, setUserType] = useState<'unicorn' | 'couple' | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authScreen, setAuthScreen] = useState<'signin' | 'register'>('signin');

  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  const handleRegister = (type: 'unicorn' | 'couple') => {
    setUserType(type);
    setIsAuthenticated(true);
  };

  const renderContent = () => {
    if (!isAuthenticated) {
      if (authScreen === 'signin') {
        return (
          <SignInScreen 
            onSignIn={handleSignIn}
            onSwitchToRegister={() => setAuthScreen('register')}
          />
        );
      } else {
        return (
          <RegisterScreen 
            onRegister={handleRegister}
            onSwitchToSignIn={() => setAuthScreen('signin')}
          />
        );
      }
    }

    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'discover':
        return <DiscoveryFeed />;
      case 'matches':
        return (
          <div className="max-w-4xl mx-auto p-4 pb-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Matches</h2>
            <div className="text-center py-12">
              <p className="text-gray-500">No matches yet. Keep exploring!</p>
            </div>
          </div>
        );
      case 'messages':
        return (
          <div className="max-w-4xl mx-auto p-4 pb-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Messages</h2>
            <div className="text-center py-12">
              <p className="text-gray-500">No messages yet. Start a conversation!</p>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="max-w-4xl mx-auto p-4 pb-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Profile</h2>
            <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
              <p className="text-gray-600">Profile settings coming soon...</p>
              <p className="text-sm text-purple-600 mt-2">
                Account type: {userType === 'unicorn' ? '🦄 Unicorn' : '👫 Couple'}
              </p>
            </div>
          </div>
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-purple-25">
      {isAuthenticated && <Header />}
      <main className={isAuthenticated ? 'pt-4' : ''}>
        {renderContent()}
      </main>
      {isAuthenticated && (
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      )}
    </div>
  );
}

export default App;
