import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  X, ArrowLeft, TrendingUp, Users, MapPin, Calendar, 
  Eye, Share2, FileText, AlertTriangle, Target,
  BookOpen, PieChart, BarChart3, Globe, Filter,
  Download, Bell, ExternalLink, Heart
} from 'lucide-react';
import CommunityDataAnalytics from '../utils/CommunityDataAnalytics';

const CommunityDataStream = ({ onClose }) => {
  const [analytics] = useState(new CommunityDataAnalytics());
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [policyBriefs, setPolicyBriefs] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    setBlogPosts(analytics.generateBlogPosts());
    setTrendingTopics(analytics.getTrendingTopics());
    setPolicyBriefs(analytics.generatePolicyBriefs());
  }, [analytics]);

  const filteredPosts = blogPosts.filter(post => {
    if (activeFilter === 'all') return true;
    return post.tags.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase()));
  });

  if (selectedPost) {
    return <BlogPostView post={selectedPost} onBack={() => setSelectedPost(null)} onClose={onClose} />;
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
                <TrendingUp className="h-6 w-6 text-blue-600" />
                Early Childhood Insights
              </h1>
              <p className="text-sm text-gray-600">Community data stream for policymakers & educators</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={subscribed ? "default" : "outline"}
              size="sm"
              onClick={() => setSubscribed(!subscribed)}
              className={subscribed ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600 hover:bg-blue-50"}
            >
              <Bell className={`h-4 w-4 mr-2 ${subscribed ? 'fill-current' : ''}`} />
              {subscribed ? 'Subscribed' : 'Subscribe'}
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-full overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">
            
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Empowering Policy Through Data
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    Anonymized, community-level insights tracking early childhood development trends, 
                    identifying gaps in education and nutrition, and guiding evidence-based resource allocation.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>8,900+ families</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>5 districts</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Updated weekly</span>
                    </div>
                  </div>
                </div>
                <div className="text-6xl">📊</div>
              </div>
            </div>

            {/* Trending Topics */}
            <Card className="border-orange-200 bg-orange-50/50">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Trending Policy Topics
                </CardTitle>
                <CardDescription>Issues requiring immediate policymaker attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-100">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{topic.topic}</h4>
                          <Badge 
                            variant={topic.urgency === 'critical' ? 'destructive' : topic.urgency === 'high' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {topic.urgency}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{topic.description}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                          <span>Impact: {topic.impact}</span>
                          <span>Timeline: {topic.timeframe}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Filter Bar */}
            <div className="flex items-center gap-2 py-2">
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filter by topic:</span>
              {['all', 'Policy Impact', 'AI Technology', 'Nutrition', 'Education Policy'].map(filter => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(filter)}
                  className={`text-xs ${activeFilter === filter ? 'bg-blue-600' : 'border-gray-300'}`}
                >
                  {filter === 'all' ? 'All Posts' : filter}
                </Button>
              ))}
            </div>

            {/* Blog Posts */}
            <div className="space-y-6">
              {filteredPosts.map(post => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow cursor-pointer border-gray-200" onClick={() => setSelectedPost(post)}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 font-medium mb-2">{post.subtitle}</p>
                        <p className="text-gray-700 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.publishDate).toLocaleDateString()}
                        </span>
                        <span>By {post.author}</span>
                        <span>{post.readTime}</span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {post.metrics.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Share2 className="h-3 w-3" />
                          {post.metrics.shares}
                        </span>
                        <span className="flex items-center gap-1 text-blue-600">
                          <Users className="h-3 w-3" />
                          {post.metrics.policymakerEngagement} policymakers
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      {post.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 border-l border-gray-200 bg-gray-50/50 overflow-y-auto">
          <div className="p-6 space-y-6">
            
            {/* Policy Briefs */}
            <Card className="border-red-200 bg-red-50/50">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-red-600" />
                  Policy Briefs
                </CardTitle>
                <CardDescription>Urgent recommendations for action</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {policyBriefs.map(brief => (
                  <div key={brief.id} className="p-3 bg-white rounded-lg border border-red-100">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm text-gray-900 leading-tight">{brief.title}</h4>
                      <Badge 
                        variant={brief.priority === 'critical' ? 'destructive' : 'default'}
                        className="text-xs ml-2"
                      >
                        {brief.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{brief.summary}</p>
                    <div className="text-xs text-gray-500">
                      <div className="mb-1">{brief.budgetImplication}</div>
                      <div>{brief.timeline}</div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-2 text-xs">
                      View Full Brief
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Data Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  Data Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">Data Coverage</span>  
                      <span className="font-semibold">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">Weekly Engagement</span>
                      <span className="font-semibold">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">Policymaker Reach</span>
                      <span className="font-semibold">76%</span>
                    </div>
                    <Progress value={76} className="h-2" />
                  </div>
                </div>
                
                <div className="pt-3 border-t border-gray-200">
                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Total Participants:</span>
                      <span className="font-semibold">8,947</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Programs:</span>
                      <span className="font-semibold">127</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Partner Organizations:</span>
                      <span className="font-semibold">34</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Updated:</span>
                      <span className="font-semibold">2 hours ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Notice */}
            <Card className="border-blue-200 bg-blue-50/50">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <Globe className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm text-blue-900 mb-1">Privacy Protected</h4>
                    <p className="text-xs text-blue-800 leading-relaxed">
                      All data is anonymized and aggregated to protect individual privacy while enabling 
                      evidence-based policy decisions. No personal information is shared or stored.
                    </p>
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

// Individual Blog Post View Component
const BlogPostView = ({ post, onBack, onClose }) => {
  const [liked, setLiked] = useState(false);
  
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
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLiked(!liked)}
              className={`${liked ? 'text-red-600 hover:bg-red-50' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Heart className={`h-4 w-4 mr-2 ${liked ? 'fill-current' : ''}`} />
              {liked ? 'Liked' : 'Like'}
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="overflow-y-auto h-full">
        <div className="max-w-3xl mx-auto px-6 py-8">
          {/* Article Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-gray-600 font-medium mb-6 leading-relaxed">
              {post.subtitle}
            </p>
            
            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.publishDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
                <span>By {post.author}</span>
                <span>{post.readTime}</span>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {post.metrics.views.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Share2 className="h-4 w-4" />
                  {post.metrics.shares}
                </span>
                <span className="flex items-center gap-1 text-blue-600">
                  <Users className="h-4 w-4" />
                  {post.metrics.policymakerEngagement}
                </span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 mb-8">
            {post.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-700">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none">
            <div 
              className="text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: post.content.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/## (.*?)(<br\/>|$)/g, '<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h2>').replace(/### (.*?)(<br\/>|$)/g, '<h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">$1</h3>') 
              }}
            />
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-2">About This Analysis</h3>
              <p className="text-sm text-blue-800 leading-relaxed">
                This report is based on anonymized, aggregated data from community early childhood development programs. 
                All individual privacy is protected through advanced anonymization techniques while enabling evidence-based 
                policy recommendations. Data represents real trends and outcomes from participating families and educational institutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDataStream;