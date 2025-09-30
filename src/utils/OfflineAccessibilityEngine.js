/**
 * Offline Accessibility System
 * Provides SMS and IVR alternatives for rural and low-connectivity regions
 */

class OfflineAccessibilityEngine {
  constructor() {
    this.smsTemplates = this.initializeSMSTemplates();
    this.ivrFlows = this.initializeIVRFlows();
    this.connectivityDetector = new ConnectivityDetector();
  }

  initializeSMSTemplates() {
    return {
      dailyActivity: {
        english: "🌟 Little Steps Daily Activity\n\nFor {childName} ({age}yr):\n📚 {activityTitle}\n⏰ Duration: {duration}min\n🎯 Goal: {skill}\n\n📋 Instructions:\n{instructions}\n\n💡 Tip: {tip}\n\nReply DONE when complete\nReply HELP for support\n\nFree SMS • Government Health Dept",
        hindi: "🌟 छोटे कदम दैनिक गतिविधि\n\nके लिए {childName} ({age}वर्ष):\n📚 {activityTitle}\n⏰ अवधि: {duration}मिनट\n🎯 लक्ष्य: {skill}\n\n📋 निर्देश:\n{instructions}\n\n💡 सुझाव: {tip}\n\nपूर्ण होने पर DONE भेजें\nसहायता के लिए HELP भेजें\n\nनिःशुल्क SMS • सरकारी स्वास्थ्य विभाग"
      },
      weeklyProgress: {
        english: "📊 Weekly Progress Report\n\n{childName}'s achievements:\n✅ {completedActivities} activities done\n⭐ {xpEarned} XP earned\n🕐 {totalTime} minutes active\n🏆 New badges: {badges}\n\n🎯 This week's focus: {focusArea}\n📅 Next milestone: {nextMilestone}\n\nKeep it up! Reply ACTIVITY for today's task",
        hindi: "📊 साप्ताहिक प्रगति रिपोर्ट\n\n{childName} की उपलब्धियां:\n✅ {completedActivities} गतिविधियां पूर्ण\n⭐ {xpEarned} XP अर्जित\n🕐 {totalTime} मिनट सक्रिय\n🏆 नए बैज: {badges}\n\n🎯 इस सप्ताह का फोकस: {focusArea}\n📅 अगला लक्ष्य: {nextMilestone}\n\nऐसे ही जारी रखें! आज के कार्य के लिए ACTIVITY भेजें"
      },
      governmentSchemes: {
        english: "🏛️ Government Benefits Available\n\nBased on your profile:\n💰 {schemeCount} schemes match\n📋 Top recommendation: {topScheme}\n💵 Est. annual benefit: ₹{estimatedBenefit}\n\n📄 Required docs:\n{documents}\n\n📞 Apply: Call {helplineNumber}\n🌐 Or visit: {website}\n\nReply SCHEMES for more options",
        hindi: "🏛️ सरकारी लाभ उपलब्ध\n\nआपकी प्रोफाइल के आधार पर:\n💰 {schemeCount} योजनाएं मैच\n📋 शीर्ष सिफारिश: {topScheme}\n💵 अनुमानित वार्षिक लाभ: ₹{estimatedBenefit}\n\n📄 आवश्यक दस्तावेज:\n{documents}\n\n📞 आवेदन: कॉल करें {helplineNumber}\n🌐 या विज़िट करें: {website}\n\nअधिक विकल्पों के लिए SCHEMES भेजें"
      },
      nutritionAlert: {
        english: "🍎 Nutrition Alert\n\nYour child's growth tracking shows:\n📈 Height: {height}cm ({percentile}%ile)\n⚖️ Weight: {weight}kg ({percentile}%ile)\n\n⚠️ Recommendation: {recommendation}\n\n🥗 Today's meal suggestion:\n{mealSuggestion}\n\n📞 Free nutrition counseling: {nutritionHelpline}\n💊 Nearest Anganwadi: {anganwadiLocation}",
        hindi: "🍎 पोषण चेतावनी\n\nआपके बच्चे की वृद्धि ट्रैकिंग दिखाती है:\n📈 लंबाई: {height}सेमी ({percentile}%ile)\n⚖️ वजन: {weight}किग्रा ({percentile}%ile)\n\n⚠️ सिफारिश: {recommendation}\n\n🥗 आज का भोजन सुझाव:\n{mealSuggestion}\n\n📞 निःशुल्क पोषण परामर्श: {nutritionHelpline}\n💊 निकटतम आंगनवाड़ी: {anganwadiLocation}"
      },
      learningAlert: {
        english: "🧠 Learning Development Alert\n\nAI analysis suggests:\n📊 {childName} shows {riskLevel} risk for {condition}\n\n📋 Recommended actions:\n{recommendations}\n\n🏥 Consult: {specialistContact}\n📞 Free assessment: {assessmentHelpline}\n🏛️ Govt support: {governmentSupport}\n\nEarly intervention is key!",
        hindi: "🧠 सीखने का विकास अलर्ट\n\nAI विश्लेषण सुझाता है:\n📊 {childName} में {condition} के लिए {riskLevel} जोखिम\n\n📋 सुझाए गए कार्य:\n{recommendations}\n\n🏥 सलाह लें: {specialistContact}\n📞 निःशुल्क मूल्यांकन: {assessmentHelpline}\n🏛️ सरकारी सहायता: {governmentSupport}\n\nशीघ्र हस्तक्षेप महत्वपूर्ण है!"
      }
    };
  }

  initializeIVRFlows() {
    return {
      mainMenu: {
        english: {
          prompt: "Welcome to Little Steps child development support. Press 1 for today's activity, 2 for progress report, 3 for government schemes, 4 for health alerts, 5 for nutrition guidance, 9 for help, or 0 to speak to an operator.",
          options: {
            1: 'dailyActivity',
            2: 'progressReport', 
            3: 'governmentSchemes',
            4: 'healthAlerts',
            5: 'nutritionGuidance',
            9: 'help',
            0: 'operator'
          }
        },
        hindi: {
          prompt: "लिटिल स्टेप्स बाल विकास सहायता में आपका स्वागत है। आज की गतिविधि के लिए 1, प्रगति रिपोर्ट के लिए 2, सरकारी योजनाओं के लिए 3, स्वास्थ्य अलर्ट के लिए 4, पोषण मार्गदर्शन के लिए 5, सहायता के लिए 9, या ऑपरेटर से बात करने के लिए 0 दबाएं।",
          options: {
            1: 'dailyActivity',
            2: 'progressReport',
            3: 'governmentSchemes', 
            4: 'healthAlerts',
            5: 'nutritionGuidance',
            9: 'help',
            0: 'operator'
          }
        }
      },
      dailyActivity: {
        english: {
          prompt: "Today's activity for {childName}: {activityTitle}. This {duration} minute activity focuses on {skill}. Press 1 to hear detailed instructions, 2 to hear tips, 3 to mark as completed, or 0 to go back to main menu.",
          options: {
            1: 'activityInstructions',
            2: 'activityTips',
            3: 'markComplete',
            0: 'mainMenu'
          }
        },
        hindi: {
          prompt: "{childName} के लिए आज की गतिविधि: {activityTitle}। यह {duration} मिनट की गतिविधि {skill} पर केंद्रित है। विस्तृत निर्देश सुनने के लिए 1, सुझाव सुनने के लिए 2, पूर्ण के रूप में चिह्नित करने के लिए 3, या मुख्य मेनू पर वापس जाने के लिए 0 दबाएं।",
          options: {
            1: 'activityInstructions',
            2: 'activityTips', 
            3: 'markComplete',
            0: 'mainMenu'
          }
        }
      },
      governmentSchemes: {
        english: {
          prompt: "Based on your profile, {schemeCount} government schemes are available. Top recommendation: {topScheme} with estimated annual benefit of {estimatedBenefit} rupees. Press 1 for application process, 2 for required documents, 3 for contact details, or 0 to go back.",
          options: {
            1: 'applicationProcess',
            2: 'requiredDocuments',
            3: 'contactDetails',
            0: 'mainMenu'
          }
        },
        hindi: {
          prompt: "आपकी प्रोफाइल के आधार पर, {schemeCount} सरकारी योजनाएं उपलब्ध हैं। शीर्ष सिफारिश: {topScheme} जिसका अनुमानित वार्षिक लाभ {estimatedBenefit} रुपये है। आवेदन प्रक्रिया के लिए 1, आवश्यक दस्तावेजों के लिए 2, संपर्क विवरण के लिए 3, या वापस जाने के लिए 0 दबाएं।",
          options: {
            1: 'applicationProcess',
            2: 'requiredDocuments', 
            3: 'contactDetails',
            0: 'mainMenu'
          }
        }
      }
    };
  }

  // Generate SMS message based on template and data
  generateSMS(templateType, language, data) {
    const template = this.smsTemplates[templateType][language];
    if (!template) return null;

    let message = template;
    
    // Replace placeholders with actual data
    Object.keys(data).forEach(key => {
      const placeholder = `{${key}}`;
      message = message.replace(new RegExp(placeholder, 'g'), data[key]);
    });

    return {
      message,
      length: message.length,
      parts: Math.ceil(message.length / 160), // SMS parts calculation
      cost: this.calculateSMSCost(message.length),
      deliveryTime: '2-5 minutes'
    };
  }

  // Generate IVR prompt based on flow and language
  generateIVRPrompt(flowType, language, data = {}) {
    const flow = this.ivrFlows[flowType][language];
    if (!flow) return null;

    let prompt = flow.prompt;
    
    // Replace placeholders with actual data
    Object.keys(data).forEach(key => {
      const placeholder = `{${key}}`;
      prompt = prompt.replace(new RegExp(placeholder, 'g'), data[key]);
    });

    return {
      prompt,
      options: flow.options,
      duration: this.estimateAudioDuration(prompt),
      language
    };
  }

  calculateSMSCost(messageLength) {
    const parts = Math.ceil(messageLength / 160);
    const costPerPart = 0.10; // 10 paise per SMS part
    return parts * costPerPart;
  }

  estimateAudioDuration(text) {
    // Estimate 150 words per minute average speaking rate
    const wordsPerMinute = 150;
    const wordCount = text.split(' ').length;
    const durationMinutes = wordCount / wordsPerMinute;
    return Math.ceil(durationMinutes * 60); // Return in seconds
  }

  // Get user's preferred offline method based on connectivity and profile
  getRecommendedOfflineMethod(userProfile) {
    const connectivity = this.connectivityDetector.getCurrentConnectivity();
    const recommendations = [];

    if (connectivity.level === 'none' || connectivity.level === 'poor') {
      recommendations.push({
        method: 'SMS',
        priority: 1,
        reason: 'Works without internet connection',
        cost: '₹0.10 per message',
        availability: '24/7',
        languages: ['English', 'Hindi', 'Regional languages']
      });

      recommendations.push({
        method: 'IVR',
        priority: 2, 
        reason: 'Voice guidance for non-literate users',
        cost: '₹2-3 per minute',
        availability: '24/7',
        languages: ['English', 'Hindi', 'Regional languages']
      });
    }

    if (connectivity.level === 'slow') {
      recommendations.push({
        method: 'Lightweight App',
        priority: 1,
        reason: 'Optimized for slow connections',
        cost: 'Data charges apply',
        availability: 'When connected',
        languages: ['English', 'Hindi']
      });

      recommendations.push({
        method: 'SMS Backup',
        priority: 2,
        reason: 'Fallback when app fails',
        cost: '₹0.10 per message',
        availability: '24/7',
        languages: ['English', 'Hindi']
      });
    }

    return recommendations;
  }

  // Schedule SMS delivery based on user preferences
  scheduleSMSDelivery(phoneNumber, messageType, data, schedule) {
    const deliveryPlan = {
      phoneNumber,
      messageType,
      data,
      schedule: {
        frequency: schedule.frequency, // daily, weekly, monthly
        time: schedule.preferredTime, // HH:MM format
        timezone: schedule.timezone || 'Asia/Kolkata',
        language: schedule.language || 'english'
      },
      delivery: {
        method: 'SMS_GATEWAY',
        provider: 'Government_SMS_Service',
        priority: 'standard',
        retry: {
          attempts: 3,
          interval: '5 minutes'
        }
      },
      tracking: {
        deliveryId: this.generateDeliveryId(),
        status: 'scheduled',
        createdAt: new Date().toISOString()
      }
    };

    return deliveryPlan;
  }

  // Process incoming SMS responses
  processSMSResponse(phoneNumber, message, context) {
    const response = message.toUpperCase().trim();
    const actions = {
      'DONE': () => this.markActivityComplete(phoneNumber, context),
      'HELP': () => this.sendHelpMessage(phoneNumber, context.language),
      'ACTIVITY': () => this.sendDailyActivity(phoneNumber, context),
      'PROGRESS': () => this.sendProgressReport(phoneNumber, context),
      'SCHEMES': () => this.sendGovernmentSchemes(phoneNumber, context),
      'STOP': () => this.unsubscribeUser(phoneNumber),
      'START': () => this.resubscribeUser(phoneNumber)
    };

    const action = actions[response];
    if (action) {
      return action();
    } else {
      return this.sendInvalidCommandMessage(phoneNumber, context.language);
    }
  }

  // Handle IVR call flow
  processIVRResponse(callId, dtmfInput, currentFlow, userData) {
    const flow = this.ivrFlows[currentFlow][userData.language];
    const nextFlow = flow.options[dtmfInput];

    if (nextFlow) {
      return {
        action: 'navigate',
        nextFlow,
        prompt: this.generateIVRPrompt(nextFlow, userData.language, userData),
        callId
      };
    } else {
      return {
        action: 'error',
        prompt: this.generateIVRPrompt('invalidOption', userData.language),
        callId
      };
    }
  }

  generateDeliveryId() {
    return 'DEL_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Offline mode data sync
  prepareOfflineSync(userData) {
    return {
      userData: {
        childName: userData.childName,
        age: userData.childAge,
        language: userData.language || 'english',
        phoneNumber: userData.phoneNumber,
        preferences: userData.offlinePreferences || {}
      },
      contentPackage: {
        activities: this.getOfflineActivities(userData.developmentalStage),
        tips: this.getOfflineTips(userData.language),
        emergencyContacts: this.getEmergencyContacts(userData.district),
        governmentSchemes: this.getOfflineSchemes(userData)
      },
      deliverySchedule: {
        dailyActivity: userData.preferences?.dailyActivityTime || '09:00',
        weeklyProgress: userData.preferences?.weeklyProgressDay || 'Sunday',
        monthlyReport: userData.preferences?.monthlyReportDate || 1
      }
    };
  }

  getOfflineActivities(developmentalStage) {
    // Return simplified activities that can be conveyed via SMS/IVR
    return [
      {
        id: 'simple_counting',
        title: 'Simple Counting Game',
        instructions: 'Count objects around the house with your child. Start with 1-5 items.',
        duration: 10,
        skill: 'Math basics'
      },
      {
        id: 'story_time',
        title: 'Daily Story Time',
        instructions: 'Tell a simple story or describe daily activities to your child.',
        duration: 15,
        skill: 'Language development'
      },
      {
        id: 'movement_game',
        title: 'Movement Game',
        instructions: 'Play simple games like clapping, jumping, or dancing together.',
        duration: 10,
        skill: 'Motor skills'
      }
    ];
  }
}

// Connectivity Detection Class
class ConnectivityDetector {
  getCurrentConnectivity() {
    // Mock connectivity detection - in real app would use navigator.connection
    const speeds = ['none', 'poor', 'slow', 'good', 'excellent'];
    const currentSpeed = speeds[Math.floor(Math.random() * speeds.length)];
    
    return {
      level: currentSpeed,
      bandwidth: this.getBandwidthEstimate(currentSpeed),
      latency: this.getLatencyEstimate(currentSpeed),
      stability: Math.random() > 0.3 ? 'stable' : 'unstable'
    };
  }

  getBandwidthEstimate(level) {
    const bandwidths = {
      'none': 0,
      'poor': 50, // 50 kbps
      'slow': 200, // 200 kbps
      'good': 1000, // 1 Mbps
      'excellent': 5000 // 5 Mbps
    };
    return bandwidths[level];
  }

  getLatencyEstimate(level) {
    const latencies = {
      'none': Infinity,
      'poor': 2000, // 2 seconds
      'slow': 800, // 800ms
      'good': 200, // 200ms
      'excellent': 50 // 50ms
    };
    return latencies[level];
  }
}

export default OfflineAccessibilityEngine;