import { useState, useEffect } from 'react';
import OnboardingFlow from './components/OnboardingFlow';
import MobileDashboard from './components/MobileDashboard';
import ActivityView from './components/ActivityView';
import ChatBot from './components/ChatBot';
import FloatingCharacter from './components/FloatingCharacter';
import { getRandomActivity } from './components/ActivityLibrary';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('onboarding');
  const [childData, setChildData] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Always start fresh for prototype - clear any existing data
  useEffect(() => {
    // Clear any existing localStorage data
    localStorage.removeItem('littleStepsChildData');
    
    // Always start from onboarding
    setCurrentView('onboarding');
    setChildData(null);
    
    console.log('🔄 Prototype mode: Starting fresh from onboarding');
  }, []);

  const handleOnboardingComplete = (userData) => {
    // Generate initial activity based on developmental stage
    const initialActivity = getRandomActivity(userData.developmentalStage);
    
    const completeChildData = {
      ...userData,
      streak: 0,
      xp: 0,
      activitiesCompleted: 0,
      timeSpent: 0,
      weeklyProgress: {
        activities: 0,
        engagement: 0
      },
      recentBadges: [
        { icon: "🌟", name: "Welcome!" },
        { icon: "🎯", name: "Ready to Learn" }
      ],
      communityRank: "#--",
      todayActivity: initialActivity
    };

    setChildData(completeChildData);
    localStorage.setItem('littleStepsChildData', JSON.stringify(completeChildData));
    setCurrentView('dashboard');
  };

  const handleStartActivity = () => {
    setCurrentView('activity');
  };

  const handleCompleteActivity = (activityResults) => {
    // Update child data with activity results
    const updatedData = {
      ...childData,
      xp: childData.xp + activityResults.xpEarned,
      timeSpent: childData.timeSpent + Math.floor(activityResults.timeSpent / 60),
      activitiesCompleted: childData.activitiesCompleted + 1,
      streak: childData.streak + 1,
      weeklyProgress: {
        activities: Math.min(childData.weeklyProgress.activities + 1, 7),
        engagement: Math.min(childData.weeklyProgress.engagement + 15, 100)
      }
    };

    // Add new badges based on achievements
    if (updatedData.streak === 1) {
      updatedData.recentBadges = [...updatedData.recentBadges.slice(-3), { icon: "🔥", name: "First Step" }];
    }
    if (updatedData.streak === 7) {
      updatedData.recentBadges = [...updatedData.recentBadges.slice(-3), { icon: "🏆", name: "Week Warrior" }];
    }
    if (updatedData.activitiesCompleted === 5) {
      updatedData.recentBadges = [...updatedData.recentBadges.slice(-3), { icon: "⭐", name: "Star Player" }];
    }

    // Generate new activity for tomorrow
    updatedData.todayActivity = getRandomActivity(childData.developmentalStage);

    setChildData(updatedData);
    localStorage.setItem('littleStepsChildData', JSON.stringify(updatedData));
    setCurrentView('dashboard');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <div className="App mobile-app-shell">
      {/* Mobile App Container */}
      <div className="mobile-app-container">
        <div className="mobile-app-content">
          {currentView === 'onboarding' && (
            <OnboardingFlow onComplete={handleOnboardingComplete} />
          )}
          
          {currentView === 'dashboard' && childData && (
            <MobileDashboard 
              childData={childData}
              onStartActivity={handleStartActivity}
              onOpenChat={handleOpenChat}
            />
          )}
          
          {currentView === 'activity' && childData && (
            <ActivityView 
              activity={childData.todayActivity}
              onComplete={handleCompleteActivity}
              onBack={handleBackToDashboard}
            />
          )}
        </div>

        {/* Floating character only shows on dashboard and activity views */}
        {(currentView === 'dashboard' || currentView === 'activity') && (
          <FloatingCharacter 
            position="bottom-right"
            size="sm"
            autoAnimate={true}
          />
        )}

        {/* ChatBot Overlay */}
        {isChatOpen && childData && (
          <div className="mobile-chat-overlay">
            <ChatBot 
              isOpen={isChatOpen}
              onClose={handleCloseChat}
              childData={childData}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

