import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, Trophy, Target, Clock, Users, BookOpen } from 'lucide-react';
import AnimatedCharacter from './AnimatedCharacter';

const Dashboard = ({ childData, onStartActivity }) => {
  const [characterAnimation, setCharacterAnimation] = useState('welcoming');

  const handleActivityStart = () => {
    setCharacterAnimation('encouraging');
    setTimeout(() => setCharacterAnimation('guiding'), 2000);
    onStartActivity();
  };

  const handleCelebration = () => {
    setCharacterAnimation('celebrating');
    setTimeout(() => setCharacterAnimation('welcoming'), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-beige-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Character */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-sage-800 mb-2">
              Welcome back, {childData.parentName}!
            </h1>
            <p className="text-sage-600">
              Let's continue {childData.childName}'s learning journey
            </p>
          </div>
          <AnimatedCharacter 
            animation={characterAnimation}
            size="xl"
            className="animate-pulse"
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-sage-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-sage-700">Current Streak</CardTitle>
              <Star className="h-4 w-4 text-sage-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sage-800">{childData.streak} days</div>
              <p className="text-xs text-sage-600">Keep it up!</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-sage-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-sage-700">XP Points</CardTitle>
              <Trophy className="h-4 w-4 text-sage-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sage-800">{childData.xp}</div>
              <p className="text-xs text-sage-600">+50 today</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-sage-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-sage-700">Activities Done</CardTitle>
              <Target className="h-4 w-4 text-sage-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sage-800">{childData.activitiesCompleted}</div>
              <p className="text-xs text-sage-600">This week</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-sage-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-sage-700">Time Spent</CardTitle>
              <Clock className="h-4 w-4 text-sage-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sage-800">{childData.timeSpent}m</div>
              <p className="text-xs text-sage-600">Today</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Activity */}
          <div className="lg:col-span-2">
            <Card className="bg-white/90 backdrop-blur-sm border-sage-200 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-sage-800">Today's Activity</CardTitle>
                    <CardDescription className="text-sage-600">
                      {childData.developmentalStage} • 3-5 minutes
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-sage-100 text-sage-700">
                    {childData.activityType}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-sage-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-sage-800 mb-2">
                    {childData.todayActivity.title}
                  </h3>
                  <p className="text-sage-700 mb-3">
                    {childData.todayActivity.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-sage-600 mb-4">
                    <BookOpen className="h-4 w-4" />
                    <span>Develops: {childData.todayActivity.skills}</span>
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
          </div>

          {/* Progress & Achievements */}
          <div className="space-y-6">
            {/* Weekly Progress */}
            <Card className="bg-white/90 backdrop-blur-sm border-sage-200">
              <CardHeader>
                <CardTitle className="text-lg text-sage-800">Weekly Progress</CardTitle>
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

            {/* Recent Badges */}
            <Card className="bg-white/90 backdrop-blur-sm border-sage-200">
              <CardHeader>
                <CardTitle className="text-lg text-sage-800">Recent Badges</CardTitle>
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

            {/* Community */}
            <Card className="bg-white/90 backdrop-blur-sm border-sage-200">
              <CardHeader>
                <CardTitle className="text-lg text-sage-800 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-sage-800 mb-1">
                    {childData.communityRank}
                  </div>
                  <p className="text-sm text-sage-600">Your rank this week</p>
                  <Button variant="outline" size="sm" className="mt-3 border-sage-300 text-sage-700">
                    View Leaderboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

