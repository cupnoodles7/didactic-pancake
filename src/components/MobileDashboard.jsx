import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Star, Trophy, Target, Clock, Users, BookOpen, MessageCircle, 
  Bell, Settings, Calendar, TrendingUp, Award, Heart 
} from 'lucide-react';
import AnimatedCharacter from './AnimatedCharacter';
import ChatBot from './ChatBot';
import { getRandomActivity } from './ActivityLibrary';

const MobileDashboard = ({ childData, onStartActivity, onOpenChat }) => {
  const [characterAnimation, setCharacterAnimation] = useState('welcoming');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleActivityStart = () => {
    setCharacterAnimation('encouraging');
    setTimeout(() => setCharacterAnimation('guiding'), 2000);
    onStartActivity();
  };

  const handleCelebration = () => {
    setCharacterAnimation('celebrating');
    setTimeout(() => setCharacterAnimation('welcoming'), 3000);
  };

  // Get today's activity based on developmental stage
  const todayActivity = childData.todayActivity || getRandomActivity(childData.developmentalStage);

  return (
    <div className="mobile-dashboard min-h-screen bg-gradient-to-br from-sage-50 to-beige-50">
      {/* Status Bar Overlay for PWA */}
      <div className="status-bar-overlay" />
      
      {/* Mobile Header */}
      <div className="mobile-header bg-white/90 backdrop-blur-md border-b border-sage-200/50 sticky top-0 z-40 shadow-sm">
        <div className="px-4 py-4 safe-area-padding">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-xl font-bold text-sage-800 leading-tight">
                Hi, {childData.parentName}! 👋
              </h1>
              <p className="text-sm text-sage-600 mt-1">
                {childData.childName}'s learning journey
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-sage-600 hover:text-sage-800 hover:bg-sage-100/50 rounded-full p-2 min-h-[44px] min-w-[44px]"
              >
                <Bell className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onOpenChat}
                className="text-sage-600 hover:text-sage-800 hover:bg-sage-100/50 rounded-full p-2 min-h-[44px] min-w-[44px]"
              >
                <MessageCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Content with safe scrolling */}
      <div className="mobile-content px-4 py-4 space-y-4 pb-20 mobile-scroll hide-scrollbar">
        {/* Character & Quick Stats Card */}
        <Card className="mobile-card animate-slide-in-up bg-white/95 backdrop-blur-md border-sage-200/30 shadow-lg overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-gradient-to-br from-sage-50 to-sage-100 rounded-2xl p-4">
                    <div className="text-2xl font-bold text-sage-800">{childData.streak}</div>
                    <div className="text-xs text-sage-600 font-medium">Day Streak</div>
                  </div>
                  <div className="bg-gradient-to-br from-warm-50 to-warm-100 rounded-2xl p-4">
                    <div className="text-2xl font-bold text-sage-800">{childData.xp}</div>
                    <div className="text-xs text-sage-600 font-medium">XP Points</div>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 ml-4">
                <AnimatedCharacter 
                  animation={characterAnimation}
                  size="xl"
                  className="animate-float"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Activity Card */}
        <Card className="mobile-card animate-slide-in-up bg-white/95 backdrop-blur-md border-sage-200/30 shadow-lg overflow-hidden">
          <CardHeader className="pb-4 bg-gradient-to-r from-sage-50 to-warm-50">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <CardTitle className="text-xl text-sage-800 font-bold">Today's Activity</CardTitle>
                <CardDescription className="text-sage-600 mt-1 text-sm">
                  {childData.developmentalStage} • {todayActivity.duration}
                </CardDescription>
              </div>
              <Badge variant="secondary" className="bg-sage-100 text-sage-700 px-3 py-1 rounded-full">
                {todayActivity.skills?.split(',')[0] || 'Learning'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="bg-gradient-to-br from-sage-50 to-warm-50 p-5 rounded-2xl border border-sage-100">
              <h3 className="font-bold text-sage-800 mb-2 text-lg">
                {todayActivity.title}
              </h3>
              <p className="text-sm text-sage-700 mb-4 leading-relaxed">
                {todayActivity.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-sage-600 bg-white/70 rounded-lg p-2">
                <BookOpen className="h-4 w-4" />
                <span className="font-medium">Develops: {todayActivity.skills?.split(',')[0] || 'Multiple skills'}</span>
              </div>
            </div>
            <Button 
              onClick={handleActivityStart}
              className="w-full bg-gradient-to-r from-sage-600 to-sage-700 hover:from-sage-700 hover:to-sage-800 text-white font-semibold py-4 rounded-2xl shadow-lg transition-all duration-200 transform hover:scale-105 min-h-[56px]"
              size="lg"
            >
              <span className="text-lg">🚀 Start Activity</span>
            </Button>
          </CardContent>
        </Card>

        {/* Progress Overview Grid */}
        <div className="grid grid-cols-2 gap-3 animate-slide-in-left">
          <Card className="mobile-card bg-white/95 backdrop-blur-md border-sage-200/30">
            <CardContent className="p-5">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="p-3 bg-gradient-to-br from-sage-100 to-sage-200 rounded-2xl">
                  <Target className="h-6 w-6 text-sage-600" />
                </div>
                <div className="text-2xl font-bold text-sage-800">{childData.activitiesCompleted}</div>
                <div className="text-xs text-sage-600 font-medium">Completed</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mobile-card bg-white/95 backdrop-blur-md border-sage-200/30">
            <CardContent className="p-5">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="p-3 bg-gradient-to-br from-warm-100 to-warm-200 rounded-2xl">
                  <Clock className="h-6 w-6 text-warm-600" />
                </div>
                <div className="text-2xl font-bold text-sage-800">{childData.timeSpent}</div>
                <div className="text-xs text-sage-600 font-medium">Minutes</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Progress Card */}
        <Card className="mobile-card bg-white/95 backdrop-blur-md border-sage-200/30 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-sage-800 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Weekly Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-sage-700 font-medium">Activities</span>
                <span className="text-sage-600">{childData.weeklyProgress.activities}/7</span>
              </div>
              <Progress 
                value={(childData.weeklyProgress.activities / 7) * 100} 
                className="h-3 bg-sage-100"
              />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-sage-700 font-medium">Engagement</span>
                <span className="text-sage-600">{childData.weeklyProgress.engagement}%</span>
              </div>
              <Progress 
                value={childData.weeklyProgress.engagement} 
                className="h-3 bg-sage-100"
              />
            </div>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card className="mobile-card bg-white/95 backdrop-blur-md border-sage-200/30 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-sage-800 flex items-center gap-2">
              <Award className="h-5 w-5" />
              Recent Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {childData.recentBadges.map((badge, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center p-4 bg-gradient-to-br from-sage-50 to-warm-50 rounded-2xl border border-sage-100 cursor-pointer hover:scale-105 transition-transform duration-200"
                  onClick={handleCelebration}
                >
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <span className="text-xs text-sage-700 text-center font-medium">{badge.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Development Insights */}
        <Card className="mobile-card bg-white/95 backdrop-blur-md border-sage-200/30 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-sage-800 flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Development Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gradient-to-br from-sage-50 to-warm-50 p-4 rounded-2xl border border-sage-100">
              <h4 className="font-semibold text-sage-800 mb-2">Current Focus</h4>
              <p className="text-sm text-sage-700 leading-relaxed">
                {childData.developmentalStage?.includes('Sensorimotor') && 
                  "Building sensory awareness and motor coordination through exploration and play."}
                {childData.developmentalStage?.includes('Preoperational') && 
                  "Developing language skills and imagination through pretend play and storytelling."}
                {childData.developmentalStage?.includes('Concrete') && 
                  "Strengthening logical thinking and problem-solving through structured activities."}
                {!childData.developmentalStage?.match(/(Sensorimotor|Preoperational|Concrete)/) && 
                  "Comprehensive development through age-appropriate activities and play-based learning."}
              </p>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/70 rounded-xl border border-sage-100">
              <span className="text-sm text-sage-700 font-medium">Community Rank</span>
              <Badge variant="outline" className="border-sage-300 text-sage-700 bg-white/80">
                {childData.communityRank}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 pb-8">
          <Button 
            variant="outline" 
            className="border-sage-300 text-sage-700 hover:bg-sage-50 hover:border-sage-400 rounded-2xl py-6 font-semibold min-h-[56px]"
            onClick={() => {/* Navigate to activity library */}}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Browse Activities
          </Button>
          <Button 
            variant="outline" 
            className="border-sage-300 text-sage-700 hover:bg-sage-50 hover:border-sage-400 rounded-2xl py-6 font-semibold min-h-[56px]"
            onClick={() => {/* Navigate to community */}}
          >
            <Users className="h-4 w-4 mr-2" />
            Community
          </Button>
        </div>

        {/* Bottom Safe Area */}
        <div className="bottom-safe-area" />
      </div>

      {/* Notification Panel */}
      {showNotifications && (
        <div className="fixed top-16 right-4 left-4 max-w-sm mx-auto bg-white/95 backdrop-blur-md border border-sage-200 rounded-2xl shadow-lg p-4 z-50 animate-slide-in-up">
          <h3 className="font-semibold text-sage-800 mb-2">Notifications</h3>
          <div className="space-y-2">
            <div className="text-sm text-sage-700 p-2 bg-sage-50 rounded-lg">
              🎉 Great job completing yesterday's activity!
            </div>
            <div className="text-sm text-sage-700 p-2 bg-sage-50 rounded-lg">
              📅 Don't forget today's learning session
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowNotifications(false)}
            className="w-full mt-3 text-sage-600"
          >
            Close
          </Button>
        </div>
      )}
    </div>
  );
};

export default MobileDashboard;

