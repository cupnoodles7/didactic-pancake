import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, ArrowLeft, Volume2, Lightbulb } from 'lucide-react';
import AnimatedCharacter from './AnimatedCharacter';

const ActivityView = ({ activity, onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [characterAnimation, setCharacterAnimation] = useState('guiding');
  const [isCompleted, setIsCompleted] = useState(false);

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

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sage-50 to-beige-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-white/90 backdrop-blur-sm border-sage-200 shadow-xl">
          <CardContent className="text-center p-8">
            <AnimatedCharacter 
              animation="celebrating"
              size="xl"
              className="mx-auto mb-6"
            />
            <h2 className="text-2xl font-bold text-sage-800 mb-2">Great Job!</h2>
            <p className="text-sage-600 mb-4">
              You've completed today's activity and earned 50 XP points!
            </p>
            <div className="bg-sage-50 p-4 rounded-lg mb-6">
              <div className="text-sm text-sage-700">
                Time spent: {formatTime(timeElapsed)}
              </div>
            </div>
            <Button 
              onClick={() => onBack()}
              className="w-full bg-sage-600 hover:bg-sage-700 text-white"
            >
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-beige-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-sage-700 hover:text-sage-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sage-600">
              <Clock className="h-4 w-4" />
              <span>{formatTime(timeElapsed)}</span>
            </div>
            <Badge variant="secondary" className="bg-sage-100 text-sage-700">
              {activity.developmentalStage}
            </Badge>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-sage-700">Progress</span>
            <span className="text-sage-600">
              Step {currentStep + 1} of {activity.steps.length}
            </span>
          </div>
          <Progress 
            value={((currentStep + 1) / activity.steps.length) * 100} 
            className="h-3"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activity Content */}
          <div className="lg:col-span-2">
            <Card className="bg-white/90 backdrop-blur-sm border-sage-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-sage-800">
                  {activity.title}
                </CardTitle>
                <CardDescription className="text-sage-600">
                  {activity.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current Step */}
                <div className="bg-sage-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-sage-800 mb-3">
                    Step {currentStep + 1}: {activity.steps[currentStep].title}
                  </h3>
                  <p className="text-sage-700 mb-4">
                    {activity.steps[currentStep].instruction}
                  </p>
                  
                  {activity.steps[currentStep].tip && (
                    <div className="bg-white p-4 rounded-lg border border-sage-200">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="h-5 w-5 text-sage-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-sage-800 mb-1">Tip</h4>
                          <p className="text-sm text-sage-700">
                            {activity.steps[currentStep].tip}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button 
                    onClick={handleNextStep}
                    className="flex-1 bg-sage-600 hover:bg-sage-700 text-white"
                    size="lg"
                  >
                    {currentStep < activity.steps.length - 1 ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Next Step
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Complete Activity
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-sage-300 text-sage-700 hover:bg-sage-50"
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Character Guide */}
            <Card className="bg-white/90 backdrop-blur-sm border-sage-200">
              <CardContent className="text-center p-6">
                <AnimatedCharacter 
                  animation={characterAnimation}
                  size="lg"
                  className="mx-auto mb-4"
                />
                <p className="text-sm text-sage-700">
                  {characterAnimation === 'guiding' && "I'm here to guide you through this activity!"}
                  {characterAnimation === 'encouraging' && "You're doing great! Keep going!"}
                  {characterAnimation === 'celebrating' && "Fantastic work! You completed the step!"}
                </p>
              </CardContent>
            </Card>

            {/* Activity Info */}
            <Card className="bg-white/90 backdrop-blur-sm border-sage-200">
              <CardHeader>
                <CardTitle className="text-lg text-sage-800">Activity Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-medium text-sage-800 mb-1">Develops</h4>
                  <p className="text-sm text-sage-700">{activity.skills}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sage-800 mb-1">Age Range</h4>
                  <p className="text-sm text-sage-700">{activity.ageRange}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sage-800 mb-1">Duration</h4>
                  <p className="text-sm text-sage-700">{activity.duration}</p>
                </div>
              </CardContent>
            </Card>

            {/* Steps Overview */}
            <Card className="bg-white/90 backdrop-blur-sm border-sage-200">
              <CardHeader>
                <CardTitle className="text-lg text-sage-800">Steps Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {activity.steps.map((step, index) => (
                    <div 
                      key={index}
                      className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                        index === currentStep 
                          ? 'bg-sage-100 text-sage-800' 
                          : index < currentStep 
                            ? 'bg-sage-50 text-sage-600' 
                            : 'text-sage-500'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                        index < currentStep 
                          ? 'bg-sage-600 text-white' 
                          : index === currentStep 
                            ? 'bg-sage-200 text-sage-800' 
                            : 'bg-sage-100 text-sage-500'
                      }`}>
                        {index < currentStep ? '✓' : index + 1}
                      </div>
                      <span className="text-sm">{step.title}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityView;

