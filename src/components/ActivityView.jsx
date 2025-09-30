import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, ArrowLeft, Volume2, VolumeX, Pause, Play, Lightbulb, Info } from 'lucide-react';
import AnimatedCharacter from './AnimatedCharacter';
import { useSpeech } from '@/hooks/useSpeech';

const ActivityView = ({ activity, onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [characterAnimation, setCharacterAnimation] = useState('guiding');
  const [isCompleted, setIsCompleted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  
  // Speech functionality
  const { isSupported, isSpeaking, isPaused, speak, stop, toggle } = useSpeech();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleNextStep = () => {
    if (currentStep < activity.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setCharacterAnimation('encouraging');
      setTimeout(() => setCharacterAnimation('guiding'), 1500);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setIsCompleted(true);
    setCharacterAnimation('celebrating');
    setTimeout(() => {
      onComplete({
        timeSpent: timeElapsed,
        stepsCompleted: activity.steps.length,
        xpEarned: 50
      });
    }, 3000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Speech functions
  const readCurrentStep = () => {
    if (!activity.steps[currentStep]) return;
    
    const step = activity.steps[currentStep];
    const textToRead = `Step ${currentStep + 1}. ${step.title}. ${step.description}. ${step.instruction}`;
    
    if (isSpeaking) {
      stop();
    } else {
      speak(textToRead);
    }
  };

  const readActivityTitle = () => {
    const textToRead = `${activity.title}. ${activity.description}. This activity is for ${activity.ageRange} and takes about ${activity.duration}.`;
    speak(textToRead);
  };

  if (isCompleted) {
    return (
      <div className="mobile-activity-complete min-h-screen bg-gradient-to-br from-sage-50 to-beige-50 flex items-center justify-center p-4">
        <div className="status-bar-overlay" />
        <Card className="mobile-card w-full max-w-sm bg-white/95 backdrop-blur-md border-sage-200/30 shadow-xl animate-slide-in-up">
          <CardContent className="text-center p-8">
            <AnimatedCharacter 
              animation="celebrating"
              size="xl"
              className="mx-auto mb-6 animate-float"
            />
            <h2 className="text-2xl font-bold text-sage-800 mb-2">Amazing Work! 🎉</h2>
            <p className="text-sage-600 mb-4 leading-relaxed">
              You've completed today's activity and earned 50 XP points!
            </p>
            <div className="bg-gradient-to-br from-sage-50 to-warm-50 p-4 rounded-2xl mb-6 border border-sage-100">
              <div className="text-sm text-sage-700 font-medium">
                ⏰ Time spent: {formatTime(timeElapsed)}
              </div>
              <div className="text-sm text-sage-700 font-medium mt-1">
                ⭐ XP Earned: 50 points
              </div>
            </div>
            <Button 
              onClick={() => onBack()}
              className="w-full bg-gradient-to-r from-sage-600 to-sage-700 hover:from-sage-700 hover:to-sage-800 text-white font-semibold py-4 rounded-2xl shadow-lg min-h-[56px]"
            >
              🏠 Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mobile-activity-view min-h-screen bg-gradient-to-br from-sage-50 to-beige-50">
      <div className="status-bar-overlay" />
      
      {/* Mobile Header */}
      <div className="mobile-header bg-white/90 backdrop-blur-md border-b border-sage-200/50 sticky top-0 z-40 shadow-sm">
        <div className="px-4 py-3 safe-area-padding">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="text-sage-700 hover:text-sage-800 hover:bg-sage-100/50 rounded-full p-2 min-h-[44px] min-w-[44px]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex-1 text-center">
              <h1 className="text-lg font-bold text-sage-800 truncate">
                {activity.title}
              </h1>
            </div>
            
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1 text-sage-600 bg-sage-100/50 rounded-full px-3 py-1">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">{formatTime(timeElapsed)}</span>
              </div>
              <Button
                variant="ghost"
                onClick={() => setShowInfo(!showInfo)}
                className="text-sage-700 hover:text-sage-800 hover:bg-sage-100/50 rounded-full p-2 min-h-[44px] min-w-[44px]"
              >
                <Info className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-4 bg-white/50 backdrop-blur-sm border-b border-sage-200/30">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-sage-700 font-medium">Progress</span>
          <span className="text-sage-600">
            Step {currentStep + 1} of {activity.steps.length}
          </span>
        </div>
        <Progress 
          value={((currentStep + 1) / activity.steps.length) * 100} 
          className="h-3 bg-sage-100"
        />
      </div>

      {/* Mobile Content */}
      <div className="px-4 py-4 space-y-4 pb-24 mobile-scroll hide-scrollbar">
        {/* Character Guide Card */}
        <Card className="mobile-card bg-white/95 backdrop-blur-md border-sage-200/30 shadow-lg animate-slide-in-up">
          <CardContent className="p-6 text-center">
            <AnimatedCharacter 
              animation={characterAnimation}
              size="lg"
              className="mx-auto mb-3 animate-float"
            />
            <p className="text-sm text-sage-700 font-medium">
              {characterAnimation === 'guiding' && "Let's do this step together! 🌟"}
              {characterAnimation === 'encouraging' && "You're doing fantastic! Keep it up! 💪"}
              {characterAnimation === 'celebrating' && "Wonderful job! You're getting better! 🎉"}
            </p>
          </CardContent>
        </Card>

        {/* Current Step Card */}
        <Card className="mobile-card bg-white/95 backdrop-blur-md border-sage-200/30 shadow-lg animate-slide-in-left">
          <CardHeader className="pb-4 bg-gradient-to-r from-sage-50 to-warm-50">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-sage-100 text-sage-700 px-3 py-1 rounded-full">
                Step {currentStep + 1}
              </Badge>
              <Badge variant="outline" className="border-sage-300 text-sage-600 bg-white/70">
                {activity.developmentalStage}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div>
              <h3 className="text-xl font-bold text-sage-800 mb-3 leading-tight">
                {activity.steps[currentStep].title}
              </h3>
              <p className="text-sage-700 mb-4 leading-relaxed">
                {activity.steps[currentStep].instruction}
              </p>
            </div>
            
            {activity.steps[currentStep].tip && (
              <div className="bg-gradient-to-br from-warm-50 to-sage-50 p-4 rounded-2xl border border-sage-100">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-sage-200 rounded-full">
                    <Lightbulb className="h-4 w-4 text-sage-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sage-800 mb-1">💡 Pro Tip</h4>
                    <p className="text-sm text-sage-700 leading-relaxed">
                      {activity.steps[currentStep].tip}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Steps Overview Card - Mobile optimized */}
        <Card className="mobile-card bg-white/95 backdrop-blur-md border-sage-200/30 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-sage-800">All Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2">
              {activity.steps.map((step, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-2xl transition-all duration-200 ${
                    index === currentStep 
                      ? 'bg-gradient-to-r from-sage-100 to-warm-100 text-sage-800 shadow-sm' 
                      : index < currentStep 
                        ? 'bg-sage-50 text-sage-600' 
                        : 'text-sage-500 bg-gray-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${
                    index < currentStep 
                      ? 'bg-gradient-to-r from-sage-600 to-sage-700 text-white' 
                      : index === currentStep 
                        ? 'bg-gradient-to-r from-sage-200 to-warm-200 text-sage-800' 
                        : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index < currentStep ? '✓' : index + 1}
                  </div>
                  <span className="text-sm font-medium flex-1">{step.title}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-sage-200/50 shadow-lg z-40">
        <div className="max-w-sm mx-auto p-4 space-y-3">
          <Button 
            onClick={handleNextStep}
            className="w-full bg-gradient-to-r from-sage-600 to-sage-700 hover:from-sage-700 hover:to-sage-800 text-white font-semibold py-4 rounded-2xl shadow-lg transition-all duration-200 transform hover:scale-105 min-h-[56px]"
            size="lg"
          >
            {currentStep < activity.steps.length - 1 ? (
              <>
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="text-lg">Next Step</span>
              </>
            ) : (
              <>
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="text-lg">🎯 Complete Activity</span>
              </>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={readCurrentStep}
            disabled={!isSupported}
            className={`w-full border-sage-300 text-sage-700 hover:bg-sage-50 hover:border-sage-400 rounded-2xl py-3 font-semibold min-h-[48px] ${
              isSpeaking ? 'bg-sage-100 border-sage-400' : ''
            } ${!isSupported ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {!isSupported ? (
              <>
                <VolumeX className="h-4 w-4 mr-2" />
                Not Supported
              </>
            ) : isSpeaking && !isPaused ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Pause Reading
              </>
            ) : isPaused ? (
              <>
                <Play className="h-4 w-4 mr-2" />
                Resume Reading
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4 mr-2" />
                Read Aloud
              </>
            )}
          </Button>
        </div>
        <div className="bottom-safe-area" />
      </div>

      {/* Activity Info Modal */}
      {showInfo && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
          <Card className="w-full max-w-sm mx-auto mb-0 rounded-t-3xl bg-white/95 backdrop-blur-md animate-slide-in-up">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-sage-800">Activity Info</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowInfo(false)}
                  className="text-sage-600 hover:bg-sage-100/50 rounded-full"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pb-8">
              <div className="space-y-3">
                <div className="bg-gradient-to-br from-sage-50 to-warm-50 p-3 rounded-2xl">
                  <h4 className="font-semibold text-sage-800 mb-1">🎯 Develops</h4>
                  <p className="text-sm text-sage-700">{activity.skills}</p>
                </div>
                <div className="bg-gradient-to-br from-warm-50 to-sage-50 p-3 rounded-2xl">
                  <h4 className="font-semibold text-sage-800 mb-1">👶 Age Range</h4>
                  <p className="text-sm text-sage-700">{activity.ageRange}</p>
                </div>
                <div className="bg-gradient-to-br from-sage-50 to-warm-50 p-3 rounded-2xl">
                  <h4 className="font-semibold text-sage-800 mb-1">⏱️ Duration</h4>
                  <p className="text-sm text-sage-700">{activity.duration}</p>
                </div>
              </div>
              
              {/* Read Activity Info Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={readActivityTitle}
                disabled={!isSupported}
                className="w-full border-sage-300 text-sage-700 hover:bg-sage-50 hover:border-sage-400 rounded-2xl py-2 font-medium"
              >
                <Volume2 className="h-4 w-4 mr-2" />
                Read Activity Info
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ActivityView;

