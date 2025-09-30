import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, X, Mic, MicOff, Volume2 } from 'lucide-react';
import AnimatedCharacter from './AnimatedCharacter';
import { useSpeech } from '@/hooks/useSpeech';

const ChatBot = ({ isOpen, onClose, childData }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: `Hi! I'm here to help you with ${childData?.childName || 'your child'}'s development. Ask me anything about activities, milestones, or parenting tips!`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Speech functionality
  const { isSupported, speak } = useSpeech();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses = {
    'activity': `Based on ${childData?.childName || 'your child'}'s age (${childData?.developmentalStage || 'current stage'}), I recommend activities that focus on ${
      childData?.developmentalStage?.includes('Sensorimotor') ? 'sensory exploration and object permanence' :
      childData?.developmentalStage?.includes('Preoperational') ? 'pretend play and language development' :
      'logical thinking and problem-solving'
    }. Would you like me to suggest a specific activity?`,
    
    'milestone': `At ${childData?.childAge || '3'} years old, ${childData?.childName || 'your child'} should be developing skills like ${
      childData?.developmentalStage?.includes('Sensorimotor') ? 'sitting up, crawling, and recognizing familiar faces' :
      childData?.developmentalStage?.includes('Preoperational') ? 'speaking in sentences, engaging in pretend play, and showing independence' :
      'understanding rules, solving simple problems, and showing logical thinking'
    }. Every child develops at their own pace, so don't worry if some skills come earlier or later!`,
    
    'help': `I can help you with:
    • Activity recommendations for ${childData?.childName || 'your child'}
    • Developmental milestone information
    • Tips for encouraging learning through play
    • Understanding your child's current developmental stage
    • Troubleshooting common parenting challenges
    
    Just ask me anything!`,
    
    'development': `${childData?.childName || 'Your child'} is in the ${childData?.developmentalStage || 'Preoperational Stage'}. This means they're developing ${
      childData?.developmentalStage?.includes('Sensorimotor') ? 'basic motor skills and understanding that objects exist even when they can\'t see them' :
      childData?.developmentalStage?.includes('Preoperational') ? 'language skills, imagination, and the ability to think symbolically' :
      'logical thinking skills and can understand concrete concepts and rules'
    }. The activities we recommend are specifically designed for this stage!`
  };

  const getResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('activity') || lowerMessage.includes('what should') || lowerMessage.includes('recommend')) {
      return predefinedResponses.activity;
    } else if (lowerMessage.includes('milestone') || lowerMessage.includes('should') || lowerMessage.includes('development')) {
      return predefinedResponses.milestone;
    } else if (lowerMessage.includes('help') || lowerMessage.includes('what can')) {
      return predefinedResponses.help;
    } else if (lowerMessage.includes('stage') || lowerMessage.includes('piaget')) {
      return predefinedResponses.development;
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return `Hello! I'm excited to help you support ${childData?.childName || 'your child'}'s learning journey. What would you like to know?`;
    } else if (lowerMessage.includes('thank')) {
      return `You're welcome! Remember, every moment with ${childData?.childName || 'your child'} is a learning opportunity. Keep up the great work!`;
    } else {
      return `That's a great question! While I'm still learning, I can help you with activity recommendations, developmental milestones, and general parenting tips for ${childData?.childName || 'your child'}'s age group. What specific area would you like to explore?`;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: getResponse(inputMessage),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input would be implemented here
    // For now, just toggle the state
  };

  const quickQuestions = [
    "What activity should we do today?",
    "Is my child developing normally?",
    "How can I encourage language development?",
    "What are the key milestones for this age?"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md h-[600px] bg-white/95 backdrop-blur-sm border-sage-200 shadow-xl flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b border-sage-200">
          <div className="flex items-center gap-3">
            <AnimatedCharacter 
              animation="listening"
              size="sm"
              className="animate-float"
            />
            <div>
              <CardTitle className="text-lg text-sage-800">AI Assistant</CardTitle>
              <p className="text-sm text-sage-600">Here to help with {childData?.childName || 'your child'}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="text-sage-600 hover:text-sage-800"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-sage-600 text-white'
                      : 'bg-sage-50 text-sage-800 border border-sage-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-sage-200' : 'text-sage-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {message.type === 'bot' && isSupported && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => speak(message.content)}
                        className="flex-shrink-0 h-6 w-6 p-0 text-sage-600 hover:bg-sage-100/50 rounded-full"
                      >
                        <Volume2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-sage-50 text-sage-800 border border-sage-200 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-sage-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-sage-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-sage-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="p-4 border-t border-sage-200">
              <p className="text-sm text-sage-600 mb-2">Quick questions:</p>
              <div className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start text-xs border-sage-300 text-sage-700 hover:bg-sage-50"
                    onClick={() => setInputMessage(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-sage-200">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about child development..."
                className="flex-1 border-sage-300 focus:ring-sage-500"
              />
              <Button
                onClick={toggleVoiceInput}
                variant="outline"
                size="sm"
                className={`border-sage-300 ${isListening ? 'bg-sage-100' : ''}`}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-sage-600 hover:bg-sage-700 text-white"
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatBot;

