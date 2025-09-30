import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  X, ArrowLeft, Heart, Users, MapPin, Calendar, 
  Phone, Globe, FileText, AlertCircle, CheckCircle,
  ExternalLink, Download, Clock, IndianRupee,
  School, Stethoscope, Utensils, Baby, Accessibility,
  Filter, Search, Star, BookOpen, Shield
} from 'lucide-react';
import GovernmentPolicyEngine from '../utils/GovernmentPolicyEngine';

const GovernmentSchemes = ({ userProfile, onClose }) => {
  const [policyEngine] = useState(new GovernmentPolicyEngine());
  const [recommendations, setRecommendations] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [applicationStatus, setApplicationStatus] = useState({});
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecommendations = async () => {
      setLoading(true);
      const schemes = policyEngine.getRecommendedSchemes(userProfile);
      setRecommendations(schemes);
      setLoading(false);
    };
    
    loadRecommendations();
  }, [policyEngine, userProfile]);

  const filteredSchemes = recommendations.filter(scheme => {
    const matchesFilter = activeFilter === 'all' || scheme.category.toLowerCase().includes(activeFilter.toLowerCase());
    const matchesSearch = scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getCategoryIcon = (category) => {
    if (category.includes('Nutrition')) return <Utensils className="h-5 w-5" />;
    if (category.includes('Education')) return <School className="h-5 w-5" />;
    if (category.includes('Health')) return <Stethoscope className="h-5 w-5" />;
    if (category.includes('Maternal')) return <Baby className="h-5 w-5" />;
    if (category.includes('Disability')) return <Accessibility className="h-5 w-5" />;
    return <FileText className="h-5 w-5" />;
  };

  const getCategoryColor = (category) => {
    if (category.includes('Nutrition')) return 'bg-orange-50 text-orange-700 border-orange-200';
    if (category.includes('Education')) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (category.includes('Health')) return 'bg-green-50 text-green-700 border-green-200';
    if (category.includes('Maternal')) return 'bg-pink-50 text-pink-700 border-pink-200';
    if (category.includes('Disability')) return 'bg-purple-50 text-purple-700 border-purple-200';
    return 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const getPriorityBadgeColor = (priority) => {
    if (priority >= 8) return 'bg-red-100 text-red-800';
    if (priority >= 6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const handleApplyScheme = async (scheme) => {
    // Mock application process
    const applicationId = 'APP' + Date.now();
    const status = policyEngine.getApplicationStatus(applicationId);
    
    setApplicationStatus(prev => ({
      ...prev,
      [scheme.id]: { ...status, applied: true }
    }));
    
    // Show success message or redirect to application
    alert(`Application initiated for ${scheme.name}. Application ID: ${applicationId}`);
  };

  if (selectedScheme) {
    return <SchemeDetailView 
      scheme={selectedScheme} 
      onBack={() => setSelectedScheme(null)} 
      onClose={onClose}
      onApply={() => handleApplyScheme(selectedScheme)}
      applicationStatus={applicationStatus[selectedScheme.id]}
    />;
  }

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
                <Shield className="h-6 w-6 text-blue-600" />
                Government Schemes
              </h1>
              <p className="text-sm text-gray-600">Personalized recommendations for your family</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {filteredSchemes.length} schemes available
          </Badge>
        </div>
      </div>

      <div className="flex h-full overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">
            
            {/* User Profile Summary */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-gray-900 mb-2">
                      Your Eligibility Profile
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Annual Income:</span>
                        <div className="font-semibold">₹{userProfile.annualIncome?.toLocaleString() || 'Not provided'}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Child Age:</span>
                        <div className="font-semibold">{userProfile.childAge} months</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Location:</span>
                        <div className="font-semibold">{userProfile.district || 'Not specified'}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Category:</span>
                        <div className="font-semibold">{userProfile.caste || 'General'}</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-4xl">🏛️</div>
                </div>
              </CardContent>
            </Card>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search schemes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-600" />
                <select
                  value={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  <option value="nutrition">Nutrition</option>
                  <option value="education">Education</option>
                  <option value="health">Health</option>
                  <option value="maternal">Maternal</option>
                  <option value="disability">Disability Support</option>
                </select>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600 mt-4">Loading personalized recommendations...</p>
              </div>
            )}

            {/* Scheme Cards */}
            {!loading && (
              <div className="space-y-4">
                {filteredSchemes.map(scheme => (
                  <Card 
                    key={scheme.id} 
                    className="hover:shadow-lg transition-all cursor-pointer border-l-4 border-l-blue-500"
                    onClick={() => setSelectedScheme(scheme)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3 flex-1">
                          <div className={`p-2 rounded-lg ${getCategoryColor(scheme.category)}`}>
                            {getCategoryIcon(scheme.category)}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                              {scheme.name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2">{scheme.description}</p>
                            <div className="flex items-center gap-2 mb-3">
                              <Badge variant="secondary" className="text-xs">
                                {scheme.category}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {scheme.targetAge}
                              </Badge>
                              <Badge className={`text-xs ${getPriorityBadgeColor(scheme.priority)}`}>
                                Priority: {scheme.priority}/10
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">
                            {scheme.eligibilityScore.toFixed(0)}%
                          </div>
                          <div className="text-xs text-gray-500">Eligibility</div>
                        </div>
                      </div>

                      {/* Benefits Preview */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 text-sm mb-2">Key Benefits:</h4>
                        <div className="flex flex-wrap gap-2">
                          {scheme.benefits.slice(0, 3).map((benefit, index) => (
                            <Badge key={index} variant="outline" className="text-xs bg-gray-50">
                              {benefit}
                            </Badge>
                          ))}
                          {scheme.benefits.length > 3 && (
                            <Badge variant="outline" className="text-xs bg-gray-50">
                              +{scheme.benefits.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Estimated Benefits */}
                      {scheme.estimatedBenefit && (
                        <div className="mb-4 bg-green-50 p-3 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-semibold text-green-800">Estimated Annual Benefit</div>
                              <div className="flex items-center gap-4 text-sm text-green-700">
                                {scheme.estimatedBenefit.monetary > 0 && (
                                  <span className="flex items-center gap-1">
                                    <IndianRupee className="h-3 w-3" />
                                    ₹{scheme.estimatedBenefit.monetary.toLocaleString()}
                                  </span>
                                )}
                                <span>+ Services worth ₹{scheme.estimatedBenefit.longTermValue?.toLocaleString() || '50,000'}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {scheme.processingTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {scheme.applicationDeadline}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {applicationStatus[scheme.id]?.applied ? (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Applied
                            </Badge>
                          ) : (
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleApplyScheme(scheme);
                              }}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Apply Now
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>

                      {/* Missing Requirements */}
                      {scheme.missingRequirements && scheme.missingRequirements.length > 0 && (
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="text-sm font-semibold text-yellow-800">Additional Requirements:</div>
                              <ul className="text-xs text-yellow-700 mt-1 list-disc list-inside">
                                {scheme.missingRequirements.map((req, index) => (
                                  <li key={index}>{req}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}

                {filteredSchemes.length === 0 && !loading && (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Schemes Found</h3>
                    <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 border-l border-gray-200 bg-gray-50/50 overflow-y-auto">
          <div className="p-6 space-y-6">
            
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">Your Benefits Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{recommendations.length}</div>
                    <div className="text-xs text-gray-600">Available Schemes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      ₹{recommendations.reduce((sum, scheme) => sum + (scheme.estimatedBenefit?.monetary || 0), 0).toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600">Annual Benefits</div>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-gray-200">
                  <div className="text-xs text-gray-600 space-y-2">
                    <div className="flex justify-between">
                      <span>High Priority:</span>
                      <span className="font-semibold">{recommendations.filter(s => s.priority >= 8).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Applied:</span>
                      <span className="font-semibold">{Object.keys(applicationStatus).length}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Application Tracking */}
            {Object.keys(applicationStatus).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900">Application Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(applicationStatus).map(([schemeId, status]) => (
                    <div key={schemeId} className="p-3 bg-white rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-sm text-gray-900">
                          {recommendations.find(s => s.id === schemeId)?.name?.slice(0, 30) || 'Unknown Scheme'}...
                        </div>
                        <Badge className={status.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {status.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600">
                        ID: {status.applicationId}
                      </div>
                      <div className="text-xs text-gray-600">
                        Next: {status.nextAction}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Help & Contact */}
            <Card className="border-blue-200 bg-blue-50/50">
              <CardContent className="p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-blue-800">
                    <Phone className="h-3 w-3" />
                    <span>Helpline: 1800-XXX-XXXX</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-800">
                    <Globe className="h-3 w-3" />
                    <span>Portal: gov.in/schemes</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-800">
                    <MapPin className="h-3 w-3" />
                    <span>Visit: District Collector Office</span>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
};

// Detailed Scheme View Component
const SchemeDetailView = ({ scheme, onBack, onClose, onApply, applicationStatus }) => {
  return (
    <div className="fixed inset-0 bg-white z-50 overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/95 backdrop-blur-md sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onBack}
              className="text-gray-600 hover:text-gray-800 rounded-full p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 rounded-full p-2"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            {applicationStatus?.applied ? (
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Applied
              </Badge>
            ) : (
              <Button onClick={onApply} className="bg-blue-600 hover:bg-blue-700">
                Apply for This Scheme
              </Button>
            )}
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              Official Website
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="overflow-y-auto h-full">
        <div className="max-w-4xl mx-auto px-6 py-8">
          
          {/* Scheme Header */}
          <div className="mb-8">
            <div className="flex items-start gap-4 mb-4">
              <div className={`p-3 rounded-xl ${scheme.category.includes('Nutrition') ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                {scheme.category.includes('Nutrition') ? <Utensils className="h-8 w-8" /> : <School className="h-8 w-8" />}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{scheme.name}</h1>
                <p className="text-lg text-gray-600 mb-4">{scheme.description}</p>
                <div className="flex items-center gap-3">
                  <Badge className="bg-blue-100 text-blue-800">{scheme.category}</Badge>
                  <Badge variant="outline">{scheme.targetAge}</Badge>
                  <Badge className="bg-green-100 text-green-800">
                    {scheme.eligibilityScore.toFixed(0)}% Match
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Benefits & Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {scheme.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-800">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Eligibility & Documents */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Eligibility Criteria</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(scheme.eligibility).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                      <span className="text-gray-600">
                        {typeof value === 'object' ? JSON.stringify(value) : value.toString()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {scheme.documents.map((doc, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Application Process */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>How to Apply</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">{scheme.applicationProcess}</p>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="font-semibold text-blue-900 mb-1">Processing Time</div>
                    <div className="text-blue-700">{scheme.processingTime}</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="font-semibold text-green-900 mb-1">Application Deadline</div>
                    <div className="text-green-700">{scheme.applicationDeadline}</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="font-semibold text-purple-900 mb-1">Contact</div>
                    <div className="text-purple-700">{scheme.contactInfo}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scheme Details */}
          <Card>
            <CardHeader>
              <CardTitle>Scheme Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <div className="font-semibold text-gray-900">Implementing Agency</div>
                    <div className="text-gray-600">{scheme.implementingAgency}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Coverage</div>
                    <div className="text-gray-600">{scheme.coverage}</div>
                  </div>
                  {scheme.budgetAllocation && (
                    <div>
                      <div className="font-semibold text-gray-900">Budget Allocation</div>
                      <div className="text-gray-600">{scheme.budgetAllocation}</div>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="font-semibold text-gray-900">Official Website</div>
                    <a href={scheme.website} className="text-blue-600 hover:underline flex items-center gap-1">
                      {scheme.website}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  {scheme.nutritionalValue && (
                    <div>
                      <div className="font-semibold text-gray-900">Nutritional Value</div>
                      <div className="text-gray-600">{scheme.nutritionalValue}</div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default GovernmentSchemes;