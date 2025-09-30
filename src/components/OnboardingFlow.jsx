import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, ArrowLeft, Baby, Clock, Globe, Volume2 } from 'lucide-react';
import AnimatedCharacter from './AnimatedCharacter';
import { useSpeech } from '@/hooks/useSpeech';

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
    caregiverEmails: [],
    governmentSchemes: false,
    annualIncome: '',
    caste: '',
    rationCardType: '',
    district: '',
    schoolEnrolled: false,
    pregnancyStatus: false,
    nutritionConcerns: false,
    healthConcerns: false,
    offlineAccess: false,
    phoneNumber: '',
    offlineMethod: '',
    smsPreferences: {
      dailyActivity: true,
      weeklyProgress: true,
      governmentSchemes: false,
      healthAlerts: true
    }
  });

  // Speech functionality
  const { isSupported, speak } = useSpeech();

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
      title: "Government Schemes 🏛️",
      description: "Get personalized recommendations for government benefits",
      component: GovernmentSchemesStep
    },
    {
      title: "Offline Access 📶",
      description: "Stay connected even with poor internet via SMS/Voice",
      component: OfflineAccessStep
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
        return true; // Government schemes step is optional
      case 5:
        return true; // Offline access step is optional
      case 6:
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

  // Speech function for current step
  const readCurrentStep = () => {
    const currentStepData = steps[currentStep];
    const textToRead = `${currentStepData.title}. ${currentStepData.description}`;
    speak(textToRead);
  };

  // Auto-read when step changes (optional - can be enabled/disabled)
  useEffect(() => {
    if (isSupported && currentStep === 0) {
      // Only auto-read the welcome step
      setTimeout(() => {
        readCurrentStep();
      }, 1000);
    }
  }, [currentStep, isSupported]);

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="mobile-onboarding min-h-screen bg-gradient-to-br from-sage-50 to-beige-50 flex items-center justify-center p-4">
      <div className="status-bar-overlay" />
      
      {/* Prototype Banner */}
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 px-4 z-50 shadow-lg">
        <div className="text-xs font-semibold flex items-center justify-center gap-2">
          <span className="animate-pulse">🚀</span>
          PROTOTYPE MODE - Experience starts fresh each time
          <span className="animate-pulse">🚀</span>
        </div>
      </div>
      
      <div className="w-full max-w-sm mt-12">
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
            
            {/* Read Aloud Button */}
            {isSupported && (
              <div className="flex justify-center mt-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={readCurrentStep}
                  className="text-sage-600 hover:bg-sage-100/50 rounded-full px-3 py-1"
                >
                  <Volume2 className="h-3 w-3 mr-1" />
                  <span className="text-xs">Read to me</span>
                </Button>
              </div>
            )}
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

const GovernmentSchemesStep = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-3xl">🏛️</div>
        <div>
          <h3 className="font-bold text-blue-900">Government Benefits & Schemes</h3>
          <p className="text-blue-700 text-sm">Get personalized recommendations for nutrition, education & health programs</p>
        </div>
      </div>
    </div>

    <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-sage-50 to-warm-50 rounded-2xl border border-sage-100">
      <Checkbox
        id="governmentSchemes"
        checked={formData.governmentSchemes}
        onCheckedChange={(checked) => updateFormData({ governmentSchemes: checked })}
        className="border-sage-300 h-5 w-5 mt-1"
      />
      <div className="flex-1">
        <Label htmlFor="governmentSchemes" className="text-sage-700 cursor-pointer font-medium block mb-2">
          🎯 Yes, help me discover government schemes and benefits
        </Label>
        <p className="text-sm text-sage-600">
          We'll analyze your family's profile to recommend relevant government programs for nutrition, education, healthcare, and child development support.
        </p>
      </div>
    </div>

    {formData.governmentSchemes && (
      <div className="space-y-4 bg-white p-6 rounded-2xl border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4">Help us find the best schemes for you:</h4>
        
        <div className="grid gap-4">
          <div>
            <Label className="text-gray-700 font-medium mb-2 block">Annual Household Income (₹)</Label>
            <Select onValueChange={(value) => updateFormData({ annualIncome: parseInt(value) })}>
              <SelectTrigger className="border-gray-300 focus:ring-blue-500 h-12 rounded-2xl">
                <SelectValue placeholder="Select income range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="200000">Below ₹2 Lakhs</SelectItem>
                <SelectItem value="500000">₹2-5 Lakhs</SelectItem>
                <SelectItem value="800000">₹5-8 Lakhs</SelectItem>
                <SelectItem value="1200000">₹8-12 Lakhs</SelectItem>
                <SelectItem value="1500000">Above ₹12 Lakhs</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-700 font-medium mb-2 block">Category</Label>
              <Select onValueChange={(value) => updateFormData({ caste: value })}>
                <SelectTrigger className="border-gray-300 focus:ring-blue-500 h-12 rounded-2xl">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="SC">SC</SelectItem>
                  <SelectItem value="ST">ST</SelectItem>
                  <SelectItem value="OBC">OBC</SelectItem>
                  <SelectItem value="EWS">EWS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-gray-700 font-medium mb-2 block">Ration Card Type</Label>
              <Select onValueChange={(value) => updateFormData({ rationCardType: value })}>
                <SelectTrigger className="border-gray-300 focus:ring-blue-500 h-12 rounded-2xl">
                  <SelectValue placeholder="Card type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BPL">BPL (Below Poverty Line)</SelectItem>
                  <SelectItem value="APL">APL (Above Poverty Line)</SelectItem>
                  <SelectItem value="AAY">AAY (Antyodaya Anna Yojana)</SelectItem>
                  <SelectItem value="None">No Ration Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-gray-700 font-medium mb-2 block">District/City</Label>
            <Input
              placeholder="Enter your district or city"
              value={formData.district}
              onChange={(e) => updateFormData({ district: e.target.value })}
              className="border-gray-300 focus:ring-blue-500 h-12 rounded-2xl"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Checkbox
                id="schoolEnrolled"
                checked={formData.schoolEnrolled}
                onCheckedChange={(checked) => updateFormData({ schoolEnrolled: checked })}
                className="border-gray-300 h-5 w-5"
              />
              <Label htmlFor="schoolEnrolled" className="text-gray-700 cursor-pointer">
                Child is enrolled in school/anganwadi
              </Label>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="pregnancyStatus"
                checked={formData.pregnancyStatus}
                onCheckedChange={(checked) => updateFormData({ pregnancyStatus: checked })}
                className="border-gray-300 h-5 w-5"
              />
              <Label htmlFor="pregnancyStatus" className="text-gray-700 cursor-pointer">
                Family member is pregnant or lactating
              </Label>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="nutritionConcerns"
                checked={formData.nutritionConcerns}
                onCheckedChange={(checked) => updateFormData({ nutritionConcerns: checked })}
                className="border-gray-300 h-5 w-5"
              />
              <Label htmlFor="nutritionConcerns" className="text-gray-700 cursor-pointer">
                Child has nutritional concerns or underweight
              </Label>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="healthConcerns"
                checked={formData.healthConcerns}
                onCheckedChange={(checked) => updateFormData({ healthConcerns: checked })}
                className="border-gray-300 h-5 w-5"
              />
              <Label htmlFor="healthConcerns" className="text-gray-700 cursor-pointer">
                Child has health concerns or special needs
              </Label>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 mt-4">
          <p className="text-sm text-blue-800">
            🔒 <strong>Privacy Notice:</strong> This information is used only to recommend relevant government schemes. No personal data is shared with external parties.
          </p>
        </div>
      </div>
    )}

    <div className="bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-2xl border border-green-100">
      <p className="text-sm text-green-800">
        💡 <strong>Benefits:</strong> Access to nutrition programs, education schemes, healthcare benefits, scholarships, and early childhood development support programs.
      </p>
    </div>
  </div>
);

const OfflineAccessStep = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-100">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-3xl">📶</div>
        <div>
          <h3 className="font-bold text-orange-900">Stay Connected Anywhere</h3>
          <p className="text-orange-700 text-sm">Access Little Steps even with poor internet through SMS or voice calls</p>
        </div>
      </div>
    </div>

    <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-sage-50 to-warm-50 rounded-2xl border border-sage-100">
      <Checkbox
        id="offlineAccess"
        checked={formData.offlineAccess}
        onCheckedChange={(checked) => updateFormData({ offlineAccess: checked })}
        className="border-sage-300 h-5 w-5 mt-1"
      />
      <div className="flex-1">
        <Label htmlFor="offlineAccess" className="text-sage-700 cursor-pointer font-medium block mb-2">
          📱 Yes, set up offline access (recommended for rural areas)
        </Label>
        <p className="text-sm text-sage-600">
          Get daily activities, progress updates, and government scheme alerts through SMS or voice calls even when internet is slow or unavailable.
        </p>
      </div>
    </div>

    {formData.offlineAccess && (
      <div className="space-y-4 bg-white p-6 rounded-2xl border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4">🔧 Set up your offline access:</h4>
        
        <div className="grid gap-4">
          <div>
            <Label className="text-gray-700 font-medium mb-2 block">Phone Number</Label>
            <Input
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phoneNumber}
              onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
              className="border-gray-300 focus:ring-orange-500 h-12 rounded-2xl"
            />
            <p className="text-xs text-gray-500 mt-1">SMS and voice calls will be sent to this number</p>
          </div>

          <div>
            <Label className="text-gray-700 font-medium mb-2 block">Preferred Method</Label>
            <Select onValueChange={(value) => updateFormData({ offlineMethod: value })}>
              <SelectTrigger className="border-gray-300 focus:ring-orange-500 h-12 rounded-2xl">
                <SelectValue placeholder="Choose your preferred method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SMS">📱 SMS Messages (₹0.10 per message)</SelectItem>
                <SelectItem value="IVR">📞 Voice Calls (₹2-3 per minute)</SelectItem>
                <SelectItem value="Both">🔄 Both SMS & Voice (recommended)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-gray-700 font-medium block">What would you like to receive?</Label>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="sms-daily"
                  checked={formData.smsPreferences?.dailyActivity}
                  onCheckedChange={(checked) => updateFormData({ 
                    smsPreferences: { 
                      ...formData.smsPreferences, 
                      dailyActivity: checked 
                    }
                  })}
                  className="border-gray-300 h-5 w-5"
                />
                <Label htmlFor="sms-daily" className="text-gray-700 cursor-pointer">
                  📚 Daily activity recommendations (9 AM)
                </Label>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  id="sms-progress"
                  checked={formData.smsPreferences?.weeklyProgress}
                  onCheckedChange={(checked) => updateFormData({ 
                    smsPreferences: { 
                      ...formData.smsPreferences, 
                      weeklyProgress: checked 
                    }
                  })}
                  className="border-gray-300 h-5 w-5"
                />
                <Label htmlFor="sms-progress" className="text-gray-700 cursor-pointer">
                  📊 Weekly progress summary (Sundays)
                </Label>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  id="sms-schemes"
                  checked={formData.smsPreferences?.governmentSchemes}
                  onCheckedChange={(checked) => updateFormData({ 
                    smsPreferences: { 
                      ...formData.smsPreferences, 
                      governmentSchemes: checked 
                    }
                  })}
                  className="border-gray-300 h-5 w-5"
                />
                <Label htmlFor="sms-schemes" className="text-gray-700 cursor-pointer">
                  🏛️ Government scheme updates (as needed)
                </Label>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  id="sms-health"
                  checked={formData.smsPreferences?.healthAlerts}
                  onCheckedChange={(checked) => updateFormData({ 
                    smsPreferences: { 
                      ...formData.smsPreferences, 
                      healthAlerts: checked 
                    }
                  })}
                  className="border-gray-300 h-5 w-5"
                />
                <Label htmlFor="sms-health" className="text-gray-700 cursor-pointer">
                  🏥 Health & development alerts (important only)
                </Label>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 mt-4">
          <div className="text-sm text-orange-800 space-y-2">
            <div className="flex items-center gap-2">
              <span>💰</span>
              <span><strong>Estimated Cost:</strong> ₹5-15 per month (depending on selections)</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🌍</span>
              <span><strong>Languages:</strong> Hindi & English supported</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📞</span>
              <span><strong>Support:</strong> 24/7 helpline available</span>
            </div>
          </div>
        </div>
      </div>
    )}

    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-100">
      <p className="text-sm text-blue-800">
        🌟 <strong>Perfect for:</strong> Rural areas, limited data plans, unreliable internet, or parents who prefer text/voice updates over app notifications.
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

