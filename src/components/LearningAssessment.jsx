import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Brain, AlertTriangle, CheckCircle, Eye, TrendingUp, 
  BookOpen, Calculator, Focus, Clock, Shield, ExternalLink,
  Star, Award
} from 'lucide-react';
import AnimatedCharacter from './AnimatedCharacter';
import LearningDisabilitiesDetector, { generateMockActivityData } from '@/utils/LearningDisabilitiesDetector';

const LearningAssessment = ({ childData, onClose }) => {
  const [assessment, setAssessment] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [showGiftolexiaInfo, setShowGiftolexiaInfo] = useState(false);

  useEffect(() => {
    analyzeChildData();
  }, [childData]);

  const analyzeChildData = async () => {
    setIsAnalyzing(true);
    
    // Simulate ML analysis delay
    setTimeout(() => {
      const detector = new LearningDisabilitiesDetector();
      
      // Generate mock activity data based on child's profile
      const mockActivities = generateMockActivityData(childData.childAge, 25);
      
      // Add some realistic patterns for demo
      if (childData.childName?.toLowerCase().includes('test')) {
        // Demo scenario with elevated dyslexia indicators
        mockActivities.forEach((activity, index) => {
          if (activity.type === 'language' && index % 2 === 0) {
            activity.timeSpent = activity.expectedTime * 1.8;
            activity.stepsCompleted = Math.floor(activity.totalSteps * 0.6);
            activity.textPerformance = 0.45;
            activity.performance = 0.75;
            activity.visualElements = true;
          }
        });
      }
      
      const result = detector.analyzeActivityData(mockActivities);
      setAssessment(result);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getRiskColor = (risk) => {
    if (risk < 0.3) return 'text-green-600 bg-green-50';
    if (risk < 0.6) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getRiskLabel = (risk) => {
    if (risk < 0.3) return 'Low Risk';
    if (risk < 0.6) return 'Moderate Risk';
    return 'High Risk';
  };

  const getConditionIcon = (condition) => {
    switch(condition) {
      case 'dyslexia': return <BookOpen className="h-5 w-5" />;
      case 'dyscalculia': return <Calculator className="h-5 w-5" />;
      case 'adhd': return <Focus className="h-5 w-5" />;
      case 'processing': return <Clock className="h-5 w-5" />;
      default: return <Brain className="h-5 w-5" />;
    }
  };

  const getConditionName = (condition) => {
    switch(condition) {
      case 'dyslexia': return 'Dyslexia';
      case 'dyscalculia': return 'Dyscalculia';
      case 'adhd': return 'ADHD';
      case 'processing': return 'Processing Speed';
      default: return condition;
    }
  };

  if (isAnalyzing) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-md animate-slide-in-up">
          <CardContent className="text-center p-8">
            <div className="animate-spin mb-4">
              <Brain className="h-12 w-12 mx-auto text-sage-600" />
            </div>
            <h3 className="text-lg font-bold text-sage-800 mb-2">Analyzing Learning Patterns</h3>
            <p className="text-sage-600 mb-4">
              Our AI is examining {childData.childName}'s activity data to identify potential learning patterns...
            </p>
            <div className="space-y-2 text-sm text-sage-500">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-sage-600 rounded-full animate-pulse"></div>
                Processing activity completion patterns
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-sage-600 rounded-full animate-pulse delay-100"></div>
                Analyzing attention and focus metrics
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-sage-600 rounded-full animate-pulse delay-200"></div>
                Identifying learning strengths and challenges
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-md animate-slide-in-up">
          <CardHeader className="text-center border-b border-sage-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-sage-100 to-sage-200 rounded-full">
                  <Brain className="h-6 w-6 text-sage-700" />
                </div>
                <div className="text-left">
                  <CardTitle className="text-xl text-sage-800">Learning Assessment</CardTitle>
                  <CardDescription className="text-sage-600">
                    AI-powered analysis for {childData.childName}
                  </CardDescription>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-sage-600 hover:bg-sage-100/50 rounded-full"
              >
                ✕
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Overall Assessment */}
            <div className="bg-gradient-to-br from-sage-50 to-warm-50 p-4 rounded-2xl border border-sage-100">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-full ${assessment.overallRisk < 0.3 ? 'bg-green-100' : assessment.overallRisk < 0.6 ? 'bg-yellow-100' : 'bg-red-100'}`}>
                  {assessment.overallRisk < 0.3 ? 
                    <CheckCircle className="h-5 w-5 text-green-600" /> :
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  }
                </div>
                <div>
                  <h3 className="font-bold text-sage-800">Overall Assessment</h3>
                  <p className="text-sm text-sage-600">
                    Confidence Level: {assessment.confidence.charAt(0).toUpperCase() + assessment.confidence.slice(1)}
                  </p>
                </div>
              </div>
              
              {assessment.overallRisk < 0.3 ? (
                <p className="text-sage-700">
                  🎉 Great news! {childData.childName}'s learning patterns show typical development across all areas.
                </p>
              ) : (
                <p className="text-sage-700">
                  Our analysis has identified some patterns that may benefit from additional attention and support.
                </p>
              )}
            </div>

            {/* Risk Areas */}
            <div className="space-y-4">
              <h4 className="font-bold text-sage-800 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Detailed Analysis
              </h4>
              
              {Object.entries(assessment.specificRisks).map(([condition, risk]) => (
                <div key={condition} className="bg-white p-4 rounded-xl border border-sage-200 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getConditionIcon(condition)}
                      <div>
                        <h5 className="font-semibold text-sage-800">{getConditionName(condition)}</h5>
                        <Badge className={`text-xs ${getRiskColor(risk)}`}>
                          {getRiskLabel(risk)}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-sage-800">
                        {Math.round(risk * 100)}%
                      </div>
                      <div className="text-xs text-sage-600">risk level</div>
                    </div>
                  </div>
                  <Progress value={risk * 100} className="h-2 mb-2" />
                </div>
              ))}
            </div>

            {/* High Risk Areas & Recommendations */}
            {assessment.highRiskAreas.length > 0 && (
              <div className="space-y-4">
                <Alert className="border-orange-200 bg-orange-50">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800 ml-2">
                    <strong>Areas requiring attention:</strong> {assessment.highRiskAreas.length} potential area(s) identified
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  {assessment.recommendations.map((rec, index) => (
                    <div key={index} className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                      <div className="flex items-start gap-3">
                        <div className="p-1 bg-blue-100 rounded-full mt-1">
                          <Lightbulb className="h-3 w-3 text-blue-600" />
                        </div>
                        <div>
                          <h6 className="font-semibold text-blue-800">{rec.title}</h6>
                          <p className="text-sm text-blue-700 mt-1">{rec.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Professional Assessment Recommendation */}
            {assessment.requiresProfessionalAssessment && (
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-2xl border border-purple-200">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <h4 className="font-bold text-purple-800">Professional Assessment Recommended</h4>
                </div>
                <p className="text-purple-700 mb-3">
                  Based on the patterns identified, we recommend consulting with a learning specialist 
                  for a comprehensive evaluation.
                </p>
                <div className="flex gap-2">
                  <Badge className="bg-purple-100 text-purple-800">Early Intervention</Badge>
                  <Badge className="bg-blue-100 text-blue-800">Personalized Support</Badge>
                </div>
              </div>
            )}

            {/* Giftolexia Premium Feature */}
            {assessment.giftolexiaEligible && (
              <div className="bg-gradient-to-br from-gold-50 to-yellow-50 p-4 rounded-2xl border border-gold-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 transform rotate-12 translate-x-2 -translate-y-2">
                  <div className="bg-gradient-to-r from-gold-400 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    PREMIUM
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-br from-gold-100 to-yellow-100 rounded-full">
                    <Eye className="h-5 w-5 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gold-800 flex items-center gap-2">
                      Advanced Dyslexia Assessment Available
                      <Star className="h-4 w-4 text-gold-500" />
                    </h4>
                    <p className="text-sm text-gold-600">Powered by Giftolexia</p>
                  </div>
                </div>
                
                <p className="text-gold-700 mb-4">
                  Your child shows patterns that qualify for our advanced eye-movement based dyslexia 
                  assessment. This cutting-edge technology provides 94% accuracy in early detection.
                </p>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-gold-600" />
                      <span className="text-gold-700">Clinical-grade accuracy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-gold-600" />
                      <span className="text-gold-700">Eye-tracking technology</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gold-600" />
                      <span className="text-gold-700">15-minute assessment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-gold-600" />
                      <span className="text-gold-700">Professional report</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-gold-600 to-yellow-600 hover:from-gold-700 hover:to-yellow-700 text-white font-semibold"
                      onClick={() => setShowGiftolexiaInfo(true)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Unlock Advanced Assessment
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-gold-300 text-gold-700 hover:bg-gold-50"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <p className="text-xs text-gray-600 leading-relaxed">
                <strong>Important:</strong> This AI-powered analysis is for educational purposes and early identification only. 
                It does not constitute a medical diagnosis. For comprehensive evaluation and professional guidance, 
                please consult with qualified learning specialists or educational psychologists.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button onClick={onClose} className="flex-1 bg-sage-600 hover:bg-sage-700 text-white">
                Continue Learning Journey
              </Button>
              <Button 
                variant="outline" 
                className="border-sage-300 text-sage-700"
                onClick={() => window.print()}
              >
                Save Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Giftolexia Premium Modal */}
      {showGiftolexiaInfo && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-60 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg bg-white animate-slide-in-up">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="p-2 bg-gradient-to-br from-gold-100 to-yellow-100 rounded-full">
                  <Eye className="h-6 w-6 text-gold-600" />
                </div>
                <h3 className="text-xl font-bold text-gold-800">Giftolexia Partnership</h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <AnimatedCharacter animation="thinking" size="lg" className="mx-auto mb-4" />
                <p className="text-gray-700">
                  Partner with industry leaders in dyslexia detection for the most accurate early assessment available.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-gold-50 to-yellow-50 p-4 rounded-xl">
                <h4 className="font-bold text-gold-800 mb-2">What's Included:</h4>
                <ul className="space-y-2 text-sm text-gold-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-gold-600" />
                    State-of-the-art eye movement tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-gold-600" />
                    Professional assessment report
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-gold-600" />
                    Personalized intervention recommendations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-gold-600" />
                    Follow-up consultation included
                  </li>
                </ul>
              </div>

              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-gradient-to-r from-gold-600 to-yellow-600 hover:from-gold-700 hover:to-yellow-700 text-white"
                  onClick={() => alert('This would integrate with Giftolexia\'s booking system')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Schedule Assessment
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowGiftolexiaInfo(false)}
                  className="border-gray-300"
                >
                  Maybe Later
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LearningAssessment;