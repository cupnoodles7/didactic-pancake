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
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-beige-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-sage-200 sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-sage-800">
                Hi, {childData.parentName}! 👋
              </h1>
              <p className="text-sm text-sage-600">
                {childData.childName}'s learning journey
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-sage-600"
              >
                <Bell className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onOpenChat}
                className="text-sage-600"
              >
                <MessageCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Character & Quick Stats */}
        <Card className="bg-white/90 backdrop-blur-sm border-sage-200 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div>
                    <div className="text-xl font-bold text-sage-800">{childData.streak}</div>
                    <div className="text-xs text-sage-600">Day Streak</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-sage-800">{childData.xp}</div>
                    <div className="text-xs text-sage-600">XP Points</div>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <AnimatedCharacter 
                  animation={characterAnimation}
                  size="lg"
                  className="animate-float"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Activity */}
        <Card className="bg-white/90 backdrop-blur-sm border-sage-200 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg text-sage-800">Today's Activity</CardTitle>
                <CardDescription className="text-sage-600">
                  {childData.developmentalStage} • {todayActivity.duration}
                </CardDescription>
              </div>
              <Badge variant="secondary" className="bg-sage-100 text-sage-700">
                {todayActivity.skills?.split(',')[0] || 'Learning'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-sage-50 p-4 rounded-lg">
              <h3 className="font-semibold text-sage-800 mb-2">
                {todayActivity.title}
              </h3>
              <p className="text-sm text-sage-700 mb-3">
                {todayActivity.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-sage-600">
                <BookOpen className="h-3 w-3" />
                <span>Develops: {todayActivity.skills?.split(',')[0] || 'Multiple skills'}</span>
              </div>
            </div>
            <Button 
              onClick={handleActivityStart}
              className="w-full bg-sage-600 hover:bg-sage-700 text-white"
              size="lg"
            >
              Start Activity
            </Button>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-white/90 backdrop-blur-sm border-sage-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-sage-100 rounded-lg">
                  <Target className="h-4 w-4 text-sage-600" />
                </div>
                <div>
                  <div className="text-lg font-bold text-sage-800">{childData.activitiesCompleted}</div>
                  <div className="text-xs text-sage-600">This Week</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-sage-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-sage-100 rounded-lg">
                  <Clock className="h-4 w-4 text-sage-600" />
                </div>
                <div>
                  <div className="text-lg font-bold text-sage-800">{childData.timeSpent}m</div>
                  <div className="text-xs text-sage-600">Today</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Progress */}
        <Card className="bg-white/90 backdrop-blur-sm border-sage-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-sage-800 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Weekly Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-sage-700">Activities</span>
                <span className="text-sage-600">{childData.weeklyProgress.activities}/7</span>
              </div>
              <Progress 
                value={(childData.weeklyProgress.activities / 7) * 100} 
                className="h-2"
              />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-sage-700">Engagement</span>
                <span className="text-sage-600">{childData.weeklyProgress.engagement}%</span>
              </div>
              <Progress 
                value={childData.weeklyProgress.engagement} 
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card className="bg-white/90 backdrop-blur-sm border-sage-200">
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
                  className="flex flex-col items-center p-3 bg-sage-50 rounded-lg cursor-pointer hover:bg-sage-100 transition-colors"
                  onClick={handleCelebration}
                >
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <span className="text-xs text-sage-700 text-center">{badge.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Development Insights */}
        <Card className="bg-white/90 backdrop-blur-sm border-sage-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-sage-800 flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Development Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-sage-50 p-3 rounded-lg">
              <h4 className="font-medium text-sage-800 mb-1">Current Focus</h4>
              <p className="text-sm text-sage-700">
                {childData.developmentalStage?.includes('Sensorimotor') && 
                  "Building sensory awareness and motor coordination through exploration and play."}
                {childData.developmentalStage?.includes('Preoperational') && 
                  "Developing language skills and imagination through pretend play and storytelling."}
                {childData.developmentalStage?.includes('Concrete') && 
                  "Strengthening logical thinking and problem-solving through structured activities."}
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-sage-700">Community Rank</span>
              <Badge variant="outline" className="border-sage-300 text-sage-700">
                {childData.communityRank}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 pb-6">
          <Button 
            variant="outline" 
            className="border-sage-300 text-sage-700 hover:bg-sage-50"
            onClick={() => {/* Navigate to activity library */}}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Browse Activities
          </Button>
          <Button 
            variant="outline" 
            className="border-sage-300 text-sage-700 hover:bg-sage-50"
            onClick={() => {/* Navigate to community */}}
          >
            <Users className="h-4 w-4 mr-2" />
            Community
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileDashboard;

