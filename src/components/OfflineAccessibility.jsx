import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  X, ArrowLeft, Smartphone, Phone, Wifi, WifiOff, 
  MessageSquare, Volume2, Clock, MapPin, Signal,
  Settings, Bell, Globe, AlertTriangle, CheckCircle,
  Radio, Headphones, Languages, Users, Zap
} from 'lucide-react';
import OfflineAccessibilityEngine from '../utils/OfflineAccessibilityEngine';

const OfflineAccessibility = ({ userProfile, onClose }) => {
  const [offlineEngine] = useState(new OfflineAccessibilityEngine());
  const [connectivity, setConnectivity] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(userProfile.phoneNumber || '');
  const [language, setLanguage] = useState(userProfile.language || 'english');
  const [smsPreferences, setSmsPreferences] = useState({
    dailyActivity: true,
    weeklyProgress: true,
    governmentSchemes: false,
    healthAlerts: true,
    nutritionGuidance: false
  });
  const [ivrPreferences, setIvrPreferences] = useState({
    enabled: false,
    preferredTime: '10:00',
    voiceSpeed: 'normal',
    repeatOptions: true
  });
  const [offlinePackage, setOfflinePackage] = useState(null);
  const [testMessage, setTestMessage] = useState(null);
  const [isSetup, setIsSetup] = useState(false);

  useEffect(() => {
    const detectConnectivity = () => {
      const conn = offlineEngine.connectivityDetector.getCurrentConnectivity();
      setConnectivity(conn);
      
      // Auto-recommend offline methods based on connectivity
      if (conn.level === 'none' || conn.level === 'poor') {
        setSelectedMethod('SMS');
      }
    };
    
    detectConnectivity();
    const interval = setInterval(detectConnectivity, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [offlineEngine]);

  const getConnectivityIcon = (level) => {
    switch (level) {
      case 'none': return <WifiOff className="h-5 w-5 text-red-500" />;
      case 'poor': return <Signal className="h-5 w-5 text-red-400" />;
      case 'slow': return <Signal className="h-5 w-5 text-yellow-500" />;
      case 'good': return <Wifi className="h-5 w-5 text-green-500" />;
      case 'excellent': return <Wifi className="h-5 w-5 text-green-600" />;
      default: return <Wifi className="h-5 w-5 text-gray-400" />;
    }
  };

  const getConnectivityColor = (level) => {
    switch (level) {
      case 'none': return 'bg-red-50 border-red-200';
      case 'poor': return 'bg-red-50 border-red-200';
      case 'slow': return 'bg-yellow-50 border-yellow-200';
      case 'good': return 'bg-green-50 border-green-200';
      case 'excellent': return 'bg-green-50 border-green-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const handleTestSMS = async () => {
    const testData = {
      childName: userProfile.childName || 'Your child',
      age: userProfile.childAge || '3',
      activityTitle: 'Color Recognition Game',
      duration: '10',
      skill: 'Visual Learning',
      instructions: 'Show your child different colored objects and ask them to name the colors.',
      tip: 'Start with primary colors - red, blue, yellow'
    };

    const sms = offlineEngine.generateSMS('dailyActivity', language, testData);
    setTestMessage(sms);
  };

  const handleSetupComplete = () => {
    const offlineData = offlineEngine.prepareOfflineSync({
      ...userProfile,
      phoneNumber,
      language,
      offlinePreferences: {
        method: selectedMethod,
        sms: smsPreferences,
        ivr: ivrPreferences
      }
    });
    
    setOfflinePackage(offlineData);
    setIsSetup(true);
    
    // Save to localStorage
    localStorage.setItem('offlineAccessibilitySetup', JSON.stringify({
      method: selectedMethod,
      phoneNumber,
      language,
      smsPreferences,
      ivrPreferences,
      setupDate: new Date().toISOString()
    }));
  };

  const recommendations = connectivity ? offlineEngine.getRecommendedOfflineMethod(userProfile) : [];

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/95 backdrop-blur-md sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 rounded-full p-2"
            >
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Radio className="h-6 w-6 text-orange-600" />
                Offline Access Setup
              </h1>
              <p className="text-sm text-gray-600">SMS & Voice support for low-connectivity areas</p>
            </div>
          </div>
          {isSetup && (
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Setup Complete
            </Badge>
          )}
        </div>
      </div>

      <div className="overflow-y-auto h-full">
        <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">
          
          {/* Connectivity Status */}
          {connectivity && (
            <Card className={`${getConnectivityColor(connectivity.level)}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getConnectivityIcon(connectivity.level)}
                    <div>
                      <h3 className="font-bold text-gray-900 capitalize">
                        {connectivity.level} Connection
                      </h3>
                      <p className="text-sm text-gray-600">
                        {connectivity.bandwidth > 0 
                          ? `${connectivity.bandwidth} kbps • ${connectivity.latency}ms latency`
                          : 'No internet connection detected'
                        }
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Status</div>
                    <div className={`font-semibold capitalize ${
                      connectivity.stability === 'stable' ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {connectivity.stability}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Introduction */}
          <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">📶</div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">
                    Stay Connected Anywhere
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Access Little Steps even without reliable internet! Get daily activities, progress updates, 
                    and government scheme alerts through SMS or voice calls.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="bg-white/70 p-3 rounded-lg">
                      <div className="font-semibold text-orange-800">📱 SMS Support</div>
                      <div className="text-orange-700">Text-based updates</div>
                    </div>
                    <div className="bg-white/70 p-3 rounded-lg">
                      <div className="font-semibold text-orange-800">📞 Voice Calls</div>
                      <div className="text-orange-700">IVR guidance</div>
                    </div>
                    <div className="bg-white/70 p-3 rounded-lg">
                      <div className="font-semibold text-orange-800">🌍 Multi-language</div>
                      <div className="text-orange-700">Hindi & English</div>
                    </div>
                    <div className="bg-white/70 p-3 rounded-lg">
                      <div className="font-semibold text-orange-800">💰 Low Cost</div>
                      <div className="text-orange-700">₹0.10 per SMS</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  Recommended for Your Connection
                </CardTitle>
                <CardDescription>
                  Based on your current connectivity and location
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recommendations.map((rec, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedMethod === rec.method 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedMethod(rec.method)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          rec.method === 'SMS' ? 'bg-green-100 text-green-600' : 
                          rec.method === 'IVR' ? 'bg-purple-100 text-purple-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {rec.method === 'SMS' ? <MessageSquare className="h-5 w-5" /> :
                           rec.method === 'IVR' ? <Phone className="h-5 w-5" /> :
                           <Smartphone className="h-5 w-5" />}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{rec.method}</h4>
                          <p className="text-sm text-gray-600">{rec.reason}</p>
                        </div>
                      </div>
                      <Badge className={`text-xs ${rec.priority === 1 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                        Priority {rec.priority}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                      <div>
                        <span className="font-medium">Cost:</span> {rec.cost}
                      </div>
                      <div>
                        <span className="font-medium">Available:</span> {rec.availability}
                      </div>
                      <div>
                        <span className="font-medium">Languages:</span> {rec.languages.length}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Setup Form */}
          {selectedMethod && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-gray-600" />
                  Setup {selectedMethod} Access
                </CardTitle>
                <CardDescription>
                  Configure your offline access preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Basic Setup */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-700 font-medium mb-2 block">Phone Number</Label>
                    <Input
                      placeholder="+91 98765 43210"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="border-gray-300 focus:ring-blue-500 h-12 rounded-2xl"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {selectedMethod === 'SMS' ? 'SMS-enabled number' : 'Voice call capable number'}
                    </p>
                  </div>

                  <div>
                    <Label className="text-gray-700 font-medium mb-2 block">Language Preference</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="border-gray-300 focus:ring-blue-500 h-12 rounded-2xl">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* SMS Preferences */}
                {selectedMethod === 'SMS' && (
                  <div className="bg-green-50 p-4 rounded-2xl border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      SMS Notifications
                    </h4>
                    <div className="space-y-3">
                      {Object.entries(smsPreferences).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-3">
                          <Checkbox
                            checked={value}
                            onCheckedChange={(checked) => 
                              setSmsPreferences(prev => ({ ...prev, [key]: checked }))
                            }
                            className="border-green-300 h-5 w-5"
                          />
                          <Label className="text-green-800 cursor-pointer flex-1">
                            {key === 'dailyActivity' && '📚 Daily Activity (9 AM)'}
                            {key === 'weeklyProgress' && '📊 Weekly Progress (Sunday)'}
                            {key === 'governmentSchemes' && '🏛️ Government Scheme Updates'}
                            {key === 'healthAlerts' && '🏥 Health & Development Alerts'}
                            {key === 'nutritionGuidance' && '🍎 Nutrition Guidance'}
                          </Label>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 p-3 bg-white/70 rounded-lg">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-700">Estimated monthly cost:</span>
                        <span className="font-semibold text-green-800">
                          ₹{Object.values(smsPreferences).filter(Boolean).length * 3} - ₹{Object.values(smsPreferences).filter(Boolean).length * 8}
                        </span>
                      </div>
                      <div className="text-xs text-green-600 mt-1">
                        Based on selected notifications • Government rates apply
                      </div>
                    </div>
                  </div>
                )}

                {/* IVR Preferences */}
                {selectedMethod === 'IVR' && (
                  <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Voice Call Settings
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-purple-800 font-medium mb-2 block">Preferred Call Time</Label>
                        <Select 
                          value={ivrPreferences.preferredTime} 
                          onValueChange={(time) => setIvrPreferences(prev => ({ ...prev, preferredTime: time }))}
                        >
                          <SelectTrigger className="border-purple-300 focus:ring-purple-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="09:00">9:00 AM</SelectItem>
                            <SelectItem value="12:00">12:00 PM</SelectItem>
                            <SelectItem value="18:00">6:00 PM</SelectItem>
                            <SelectItem value="20:00">8:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-purple-800 font-medium mb-2 block">Voice Speed</Label>
                        <Select 
                          value={ivrPreferences.voiceSpeed} 
                          onValueChange={(speed) => setIvrPreferences(prev => ({ ...prev, voiceSpeed: speed }))}
                        >
                          <SelectTrigger className="border-purple-300 focus:ring-purple-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="slow">Slow</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="fast">Fast</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <Checkbox
                        checked={ivrPreferences.repeatOptions}
                        onCheckedChange={(checked) => 
                          setIvrPreferences(prev => ({ ...prev, repeatOptions: checked }))
                        }
                        className="border-purple-300 h-5 w-5"
                      />
                      <Label className="text-purple-800 cursor-pointer">
                        🔄 Repeat menu options automatically
                      </Label>
                    </div>

                    <div className="mt-4 p-3 bg-white/70 rounded-lg">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-purple-700">Estimated call cost:</span>
                        <span className="font-semibold text-purple-800">₹2-3 per minute</span>
                      </div>
                      <div className="text-xs text-purple-600 mt-1">
                        Weekly calls • Standard telecom rates • Subsidized for BPL families
                      </div>
                    </div>
                  </div>
                )}

                {/* Test & Setup Buttons */}
                <div className="flex items-center gap-3">
                  {selectedMethod === 'SMS' && (
                    <Button variant="outline" onClick={handleTestSMS}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Test SMS
                    </Button>
                  )}
                  
                  <Button 
                    onClick={handleSetupComplete}
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={!phoneNumber}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Complete Setup
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Test Message Preview */}
          {testMessage && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-900 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  SMS Preview
                </CardTitle>
                <CardDescription className="text-green-700">
                  This is how your SMS messages will look
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
                  <div className="text-sm font-mono text-gray-800 whitespace-pre-wrap">
                    {testMessage.message}
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-green-700 font-medium">Length:</span>
                    <div className="text-green-800">{testMessage.length} characters</div>
                  </div>
                  <div>
                    <span className="text-green-700 font-medium">SMS Parts:</span>
                    <div className="text-green-800">{testMessage.parts}</div>
                  </div>
                  <div>
                    <span className="text-green-700 font-medium">Cost:</span>
                    <div className="text-green-800">₹{testMessage.cost.toFixed(2)}</div>
                  </div>
                  <div>
                    <span className="text-green-700 font-medium">Delivery:</span>
                    <div className="text-green-800">{testMessage.deliveryTime}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Setup Complete */}
          {isSetup && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="text-center">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-green-900 mb-2">
                    Offline Access Configured!
                  </h3>
                  <p className="text-green-800 mb-4">
                    You'll start receiving {selectedMethod.toLowerCase()} updates within 24 hours.
                  </p>
                  
                  <div className="bg-white/70 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-green-900 mb-2">What's Next?</h4>
                    <div className="space-y-2 text-sm text-green-800 text-left">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Your phone number has been registered</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Language preference set to {language}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>
                          {selectedMethod === 'SMS' 
                            ? `${Object.values(smsPreferences).filter(Boolean).length} notification types enabled`
                            : 'IVR call preferences configured'
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-green-600">
                    📞 Helpline: 1800-XXX-XXXX (Toll-free) • Available 24/7 in Hindi & English
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Help & Support */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <Headphones className="h-5 w-5" />
                Need Help?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-blue-800">
                    <Phone className="h-4 w-4" />
                    <span><strong>Helpline:</strong> 1800-XXX-XXXX (Toll-free)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-800">
                    <MessageSquare className="h-4 w-4" />
                    <span><strong>SMS Support:</strong> Text HELP to 567XX</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-800">
                    <MapPin className="h-4 w-4" />
                    <span><strong>Local Office:</strong> District Health Center</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-blue-800">
                    <Languages className="h-4 w-4" />
                    <span><strong>Languages:</strong> Hindi, English, Regional</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-800">
                    <Clock className="h-4 w-4" />
                    <span><strong>Support Hours:</strong> 24/7 Available</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-800">
                    <Users className="h-4 w-4" />
                    <span><strong>Community:</strong> 2.3M families connected</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default OfflineAccessibility;