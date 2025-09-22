import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, ArrowLeft, Baby, Clock, Globe } from 'lucide-react';
import AnimatedCharacter from './AnimatedCharacter';

const OnboardingFlow = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    childAge: '',
    childAgeMonths: '',
    language: 'english',
    availability: [],
    notifications: true,
    multipleCaregiver: false,
    caregiverEmails: []
  });

  const steps = [
    {
      title: "Welcome to Little Steps! 🌟",
      description: "Let's personalize your child's learning journey",
      component: WelcomeStep
    },
    {
      title: "Tell us about your child 👶",
      description: "This helps us recommend age-appropriate activities",
      component: ChildInfoStep
    },
    {
      title: "Language & Availability 🌍",
      description: "When would you like to receive activity reminders?",
      component: PreferencesStep
    },
    {
      title: "Multiple Caregivers 👨‍👩‍👧‍👦",
      description: "Share the journey with family members",
      component: CaregiversStep
    },
    {
      title: "You're all set! 🎉",
      description: "Let's start your child's development journey",
      component: CompletionStep
    }
  ];

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return true; // Welcome step
      case 1:
        return formData.parentName && formData.childName && formData.childAge;
      case 2:
        return formData.language && formData.availability.length > 0;
      case 3:
        return true; // Caregivers step is optional
      case 4:
        return true; // Completion step
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      const developmentalStage = getDevelopmentalStage(formData.childAge, formData.childAgeMonths);
      onComplete({
        ...formData,
        developmentalStage
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getDevelopmentalStage = (years, months) => {
    const totalMonths = parseInt(years) * 12 + parseInt(months || 0);
    
    if (totalMonths < 24) return 'Sensorimotor (0-2 years)';
    if (totalMonths < 84) return 'Preoperational (2-7 years)';
    return 'Concrete Operational (7+ years)';
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="mobile-onboarding min-h-screen bg-gradient-to-br from-sage-50 to-beige-50 flex items-center justify-center p-4">
      <div className="status-bar-overlay" />
      
      <div className="w-full max-w-sm">
        {/* Progress indicator - Mobile optimized */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-sage-600">Step {currentStep + 1} of {steps.length}</span>
            <span className="text-sm font-bold text-sage-600 bg-sage-100 px-2 py-1 rounded-full">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-sage-200 rounded-full h-3 shadow-inner">
            <div 
              className="bg-gradient-to-r from-sage-600 to-sage-700 h-3 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <Card className="mobile-card bg-white/95 backdrop-blur-md border-sage-200/30 shadow-xl animate-slide-in-up">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <AnimatedCharacter 
                animation="welcoming"
                size="lg"
                className="animate-float"
              />
            </div>
            <CardTitle className="text-xl font-bold text-sage-800 leading-tight">
              {steps[currentStep].title}
            </CardTitle>
            <CardDescription className="text-sage-600 mt-2 leading-relaxed">
              {steps[currentStep].description}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <CurrentStepComponent 
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNext}
              onBack={handleBack}
              isLast={currentStep === steps.length - 1}
              canProceed={canProceed()}
            />
          </CardContent>
        </Card>

        {/* Mobile Navigation */}
        <div className="flex gap-3 mt-6">
          {currentStep > 0 && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex-1 border-sage-300 text-sage-700 hover:bg-sage-50 hover:border-sage-400 rounded-2xl py-3 font-semibold min-h-[48px]"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
          
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1 bg-gradient-to-r from-sage-600 to-sage-700 hover:from-sage-700 hover:to-sage-800 text-white font-semibold rounded-2xl py-3 shadow-lg transition-all duration-200 transform hover:scale-105 min-h-[48px] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {currentStep === steps.length - 1 ? (
              <>
                🚀 Start Journey
              </>
            ) : (
              <>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

// Step Components - Mobile optimized
const WelcomeStep = () => (
  <div className="text-center space-y-4">
    <p className="text-sage-700 leading-relaxed">
      Welcome to Little Steps! We're here to help you support your child's development through 
      fun, science-backed activities based on Piaget's cognitive development theory.
    </p>
    <div className="bg-gradient-to-br from-sage-50 to-warm-50 p-4 rounded-2xl border border-sage-100">
      <h4 className="font-bold text-sage-800 mb-3">✨ What you'll get:</h4>
      <ul className="text-sm text-sage-700 space-y-2 text-left">
        <li className="flex items-center gap-2">
          <span className="text-sage-600">⏰</span>
          Daily 3-5 minute activities
        </li>
        <li className="flex items-center gap-2">
          <span className="text-sage-600">🎯</span>
          Age-appropriate recommendations
        </li>
        <li className="flex items-center gap-2">
          <span className="text-sage-600">📈</span>
          Progress tracking & badges
        </li>
        <li className="flex items-center gap-2">
          <span className="text-sage-600">🤖</span>
          AI-powered personalization
        </li>
      </ul>
    </div>
  </div>
);

const ChildInfoStep = ({ formData, updateFormData }) => (
  <div className="space-y-5">
    <div>
      <Label htmlFor="parentName" className="text-sage-700 font-medium">Your Name</Label>
      <Input
        id="parentName"
        value={formData.parentName}
        onChange={(e) => updateFormData({ parentName: e.target.value })}
        placeholder="Enter your name"
        className="border-sage-300 focus:ring-sage-500 mt-2 h-12 rounded-2xl"
      />
    </div>
    
    <div>
      <Label htmlFor="childName" className="text-sage-700 font-medium">Child's Name</Label>
      <Input
        id="childName"
        value={formData.childName}
        onChange={(e) => updateFormData({ childName: e.target.value })}
        placeholder="Enter your child's name"
        className="border-sage-300 focus:ring-sage-500 mt-2 h-12 rounded-2xl"
      />
    </div>

    <div className="grid grid-cols-2 gap-3">
      <div>
        <Label htmlFor="childAge" className="text-sage-700 font-medium">Age (Years)</Label>
        <Select value={formData.childAge} onValueChange={(value) => updateFormData({ childAge: value })}>
          <SelectTrigger className="border-sage-300 mt-2 h-12 rounded-2xl">
            <SelectValue placeholder="Years" />
          </SelectTrigger>
          <SelectContent>
            {[0,1,2,3,4,5,6,7,8].map(year => (
              <SelectItem key={year} value={year.toString()}>{year} years</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="childAgeMonths" className="text-sage-700 font-medium">+ Months</Label>
        <Select value={formData.childAgeMonths} onValueChange={(value) => updateFormData({ childAgeMonths: value })}>
          <SelectTrigger className="border-sage-300 mt-2 h-12 rounded-2xl">
            <SelectValue placeholder="Months" />
          </SelectTrigger>
          <SelectContent>
            {[0,1,2,3,4,5,6,7,8,9,10,11].map(month => (
              <SelectItem key={month} value={month.toString()}>{month} months</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
);

const PreferencesStep = ({ formData, updateFormData }) => {
  const availabilityOptions = [
    { id: 'morning', label: 'Morning (8-12 PM)', icon: '🌅' },
    { id: 'afternoon', label: 'Afternoon (12-5 PM)', icon: '☀️' },
    { id: 'evening', label: 'Evening (5-8 PM)', icon: '🌆' },
    { id: 'weekend', label: 'Weekends', icon: '🎈' }
  ];

  const toggleAvailability = (optionId) => {
    const current = formData.availability || [];
    const updated = current.includes(optionId)
      ? current.filter(id => id !== optionId)
      : [...current, optionId];
    updateFormData({ availability: updated });
  };

  return (
    <div className="space-y-5">
      <div>
        <Label className="text-sage-700 flex items-center gap-2 font-medium">
          <Globe className="h-4 w-4" />
          Preferred Language
        </Label>
        <Select value={formData.language} onValueChange={(value) => updateFormData({ language: value })}>
          <SelectTrigger className="border-sage-300 mt-2 h-12 rounded-2xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">🇺🇸 English</SelectItem>
            <SelectItem value="spanish">🇪🇸 Spanish</SelectItem>
            <SelectItem value="french">🇫🇷 French</SelectItem>
            <SelectItem value="german">🇩🇪 German</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sage-700 flex items-center gap-2 mb-3 font-medium">
          <Clock className="h-4 w-4" />
          When are you usually available?
        </Label>
        <div className="space-y-3">
          {availabilityOptions.map(option => (
            <div key={option.id} className="flex items-center space-x-3">
              <Checkbox
                id={option.id}
                checked={formData.availability?.includes(option.id)}
                onCheckedChange={() => toggleAvailability(option.id)}
                className="border-sage-300 h-5 w-5"
              />
              <Label htmlFor={option.id} className="text-sage-700 flex items-center gap-2 flex-1 cursor-pointer">
                <span className="text-lg">{option.icon}</span>
                <span className="font-medium">{option.label}</span>
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CaregiversStep = ({ formData, updateFormData }) => (
  <div className="space-y-5">
    <div className="flex items-center space-x-3">
      <Checkbox
        id="multipleCaregiver"
        checked={formData.multipleCaregiver}
        onCheckedChange={(checked) => updateFormData({ multipleCaregiver: checked })}
        className="border-sage-300 h-5 w-5"
      />
      <Label htmlFor="multipleCaregiver" className="text-sage-700 cursor-pointer flex-1 font-medium">
        👨‍👩‍👧‍👦 Share progress with other caregivers
      </Label>
    </div>

    {formData.multipleCaregiver && (
      <div className="bg-gradient-to-br from-sage-50 to-warm-50 p-4 rounded-2xl border border-sage-100 space-y-3">
        <Label className="text-sage-700 font-medium">Additional Caregiver Emails</Label>
        <Input
          placeholder="partner@example.com"
          className="border-sage-300 focus:ring-sage-500 h-12 rounded-2xl"
        />
        <Input
          placeholder="grandparent@example.com"
          className="border-sage-300 focus:ring-sage-500 h-12 rounded-2xl"
        />
        <p className="text-xs text-sage-600">
          📧 They'll receive weekly progress updates and activity suggestions
        </p>
      </div>
    )}

    <div className="bg-gradient-to-br from-warm-50 to-sage-50 p-4 rounded-2xl border border-sage-100">
      <p className="text-sm text-sage-700">
        💡 <strong>Tip:</strong> Multiple caregivers can help ensure consistency in your child's development activities.
      </p>
    </div>
  </div>
);

const CompletionStep = ({ formData }) => (
  <div className="text-center space-y-4">
    <div className="bg-gradient-to-br from-sage-50 to-warm-50 p-6 rounded-2xl border border-sage-100">
      <h3 className="font-bold text-sage-800 mb-3">🎉 Welcome, {formData.parentName}!</h3>
      <p className="text-sage-700 mb-4">
        We've personalized {formData.childName}'s learning journey based on their developmental stage and your preferences.
      </p>
      
      <div className="space-y-2 text-sm">
        <div className="bg-white/70 p-3 rounded-xl">
          <strong>Child:</strong> {formData.childName} ({formData.childAge} years {formData.childAgeMonths} months)
        </div>
        <div className="bg-white/70 p-3 rounded-xl">
          <strong>Preferred times:</strong> {formData.availability?.length} time slots selected
        </div>
        <div className="bg-white/70 p-3 rounded-xl">
          <strong>Language:</strong> {formData.language.charAt(0).toUpperCase() + formData.language.slice(1)}
        </div>
      </div>
    </div>
    
    <p className="text-sage-600 text-sm">
      🚀 Ready to start this amazing journey together?
    </p>
  </div>
);

export default OnboardingFlow;

