// Learning Disabilities Detection System
// Uses activity data patterns to identify potential learning challenges
// Prototype implementation - real ML model would be implemented server-side

export class LearningDisabilitiesDetector {
  constructor() {
    this.activityPatterns = [];
    this.riskThresholds = {
      dyslexia: 0.6,
      dyscalculia: 0.65,
      adhd: 0.55,
      processing: 0.5
    };
  }

  // Analyze activity completion patterns
  analyzeActivityData(activityHistory) {
    const analysis = {
      dyslexiaIndicators: this.detectDyslexiaPatterns(activityHistory),
      dyscalculiaIndicators: this.detectDyscalculiaPatterns(activityHistory),
      adhdIndicators: this.detectADHDPatterns(activityHistory),
      processingIndicators: this.detectProcessingIssues(activityHistory)
    };

    return this.generateRiskAssessment(analysis);
  }

  // Dyslexia pattern detection based on reading/language activities
  detectDyslexiaPatterns(activities) {
    const languageActivities = activities.filter(a => 
      a.skills.includes('language') || 
      a.skills.includes('reading') || 
      a.skills.includes('vocabulary')
    );

    if (languageActivities.length < 5) return { risk: 0, confidence: 'low' };

    let indicators = 0;
    let totalActivities = languageActivities.length;

    languageActivities.forEach(activity => {
      // Pattern: Consistently longer time on language tasks
      if (activity.timeSpent > activity.expectedTime * 1.5) indicators += 0.2;
      
      // Pattern: Difficulty with sequential activities
      if (activity.stepsCompleted < activity.totalSteps * 0.7) indicators += 0.15;
      
      // Pattern: Inconsistent performance on similar tasks
      const similarActivities = languageActivities.filter(a => a.type === activity.type);
      const performanceVariation = this.calculatePerformanceVariation(similarActivities);
      if (performanceVariation > 0.4) indicators += 0.1;
      
      // Pattern: Better performance on visual vs. text-based tasks
      if (activity.visualElements && activity.performance > activity.textPerformance * 1.3) {
        indicators += 0.1;
      }
    });

    const risk = Math.min(indicators / totalActivities, 1);
    return {
      risk,
      confidence: this.getConfidenceLevel(totalActivities, risk),
      patterns: this.getDyslexiaPatterns(risk)
    };
  }

  // Dyscalculia pattern detection for math-related activities
  detectDyscalculiaPatterns(activities) {
    const mathActivities = activities.filter(a => 
      a.skills.includes('counting') || 
      a.skills.includes('numbers') || 
      a.skills.includes('math') ||
      a.skills.includes('sorting')
    );

    if (mathActivities.length < 3) return { risk: 0, confidence: 'low' };

    let indicators = 0;
    let totalActivities = mathActivities.length;

    mathActivities.forEach(activity => {
      // Pattern: Difficulty with number recognition
      if (activity.numberRecognitionScore < 0.6) indicators += 0.25;
      
      // Pattern: Problems with quantity estimation
      if (activity.quantityEstimationAccuracy < 0.5) indicators += 0.2;
      
      // Pattern: Trouble with sequential counting
      if (activity.countingSequenceErrors > 2) indicators += 0.15;
    });

    const risk = Math.min(indicators / totalActivities, 1);
    return {
      risk,
      confidence: this.getConfidenceLevel(totalActivities, risk),
      patterns: this.getDyscalculiaPatterns(risk)
    };
  }

  // ADHD pattern detection based on attention and focus metrics
  detectADHDPatterns(activities) {
    if (activities.length < 10) return { risk: 0, confidence: 'low' };

    let indicators = 0;
    let totalActivities = activities.length;

    activities.forEach(activity => {
      // Pattern: Difficulty maintaining attention
      if (activity.attentionSpanSeconds < activity.expectedAttentionSpan * 0.6) {
        indicators += 0.15;
      }
      
      // Pattern: High activity switching rate
      if (activity.taskSwitches > 3) indicators += 0.1;
      
      // Pattern: Inconsistent performance across sessions
      if (activity.performanceVariability > 0.5) indicators += 0.1;
    });

    const risk = Math.min(indicators / totalActivities, 1);
    return {
      risk,
      confidence: this.getConfidenceLevel(totalActivities, risk),
      patterns: this.getADHDPatterns(risk)
    };
  }

  // Processing speed and working memory issues
  detectProcessingIssues(activities) {
    let indicators = 0;
    let totalActivities = activities.length;

    activities.forEach(activity => {
      // Pattern: Consistently slow completion times
      if (activity.timeSpent > activity.expectedTime * 2) indicators += 0.2;
      
      // Pattern: Difficulty with multi-step instructions
      if (activity.multiStepAccuracy < 0.6) indicators += 0.15;
    });

    const risk = Math.min(indicators / totalActivities, 1);
    return {
      risk,
      confidence: this.getConfidenceLevel(totalActivities, risk),
      patterns: this.getProcessingPatterns(risk)
    };
  }

  // Generate comprehensive risk assessment
  generateRiskAssessment(analysis) {
    const risks = {
      dyslexia: analysis.dyslexiaIndicators.risk,
      dyscalculia: analysis.dyscalculiaIndicators.risk,
      adhd: analysis.adhdIndicators.risk,
      processing: analysis.processingIndicators.risk
    };

    const highRiskAreas = Object.entries(risks)
      .filter(([key, value]) => value > this.riskThresholds[key])
      .map(([key, value]) => ({ condition: key, risk: value }));

    return {
      overallRisk: Math.max(...Object.values(risks)),
      specificRisks: risks,
      highRiskAreas,
      confidence: this.calculateOverallConfidence(analysis),
      recommendations: this.generateRecommendations(highRiskAreas),
      requiresProfessionalAssessment: highRiskAreas.length > 0,
      giftolexiaEligible: risks.dyslexia > 0.7 // Premium feature threshold
    };
  }

  // Helper methods
  calculatePerformanceVariation(activities) {
    if (activities.length < 2) return 0;
    const scores = activities.map(a => a.completionRate);
    const mean = scores.reduce((a, b) => a + b) / scores.length;
    const variance = scores.reduce((acc, score) => acc + Math.pow(score - mean, 2), 0) / scores.length;
    return Math.sqrt(variance);
  }

  getConfidenceLevel(dataPoints, risk) {
    if (dataPoints < 5) return 'low';
    if (dataPoints < 15) return 'medium';
    if (risk > 0.7) return 'high';
    return 'medium';
  }

  getDyslexiaPatterns(risk) {
    if (risk < 0.3) return [];
    return [
      'Longer completion times on reading tasks',
      'Better visual than text performance',
      'Inconsistent performance on similar activities',
      'Difficulty with sequential processing'
    ].slice(0, Math.ceil(risk * 4));
  }

  getDyscalculiaPatterns(risk) {
    if (risk < 0.3) return [];
    return [
      'Difficulty with number recognition',
      'Problems estimating quantities',
      'Trouble with counting sequences',
      'Challenges with mathematical concepts'
    ].slice(0, Math.ceil(risk * 4));
  }

  getADHDPatterns(risk) {
    if (risk < 0.3) return [];
    return [
      'Short attention span on tasks',
      'Frequent task switching',
      'Inconsistent performance',
      'Difficulty following multi-step instructions'
    ].slice(0, Math.ceil(risk * 4));
  }

  getProcessingPatterns(risk) {
    if (risk < 0.3) return [];
    return [
      'Slower processing speed',
      'Difficulty with complex instructions',
      'Working memory challenges',
      'Need for additional processing time'
    ].slice(0, Math.ceil(risk * 4));
  }

  generateRecommendations(highRiskAreas) {
    const recommendations = [];
    
    highRiskAreas.forEach(area => {
      switch(area.condition) {
        case 'dyslexia':
          recommendations.push({
            title: 'Reading Support',
            description: 'Focus on phonics-based activities and visual learning aids',
            priority: 'high'
          });
          break;
        case 'dyscalculia':
          recommendations.push({
            title: 'Math Support',
            description: 'Use visual representations and hands-on counting activities',
            priority: 'high'
          });
          break;
        case 'adhd':
          recommendations.push({
            title: 'Attention Building',
            description: 'Shorter activities with frequent breaks and clear structure',
            priority: 'medium'
          });
          break;
        case 'processing':
          recommendations.push({
            title: 'Processing Support',
            description: 'Allow extra time and break complex tasks into smaller steps',
            priority: 'medium'
          });
          break;
      }
    });

    return recommendations;
  }

  calculateOverallConfidence(analysis) {
    const confidenceLevels = [
      analysis.dyslexiaIndicators.confidence,
      analysis.dyscalculiaIndicators.confidence,
      analysis.adhdIndicators.confidence,
      analysis.processingIndicators.confidence
    ];

    const highCount = confidenceLevels.filter(c => c === 'high').length;
    const mediumCount = confidenceLevels.filter(c => c === 'medium').length;

    if (highCount >= 2) return 'high';
    if (mediumCount >= 2) return 'medium';
    return 'low';
  }
}

// Mock activity data generator for prototype
export const generateMockActivityData = (childAge, activityCount = 20) => {
  const activities = [];
  const activityTypes = [
    'language', 'counting', 'sorting', 'visual-spatial', 'memory', 'attention'
  ];

  for (let i = 0; i < activityCount; i++) {
    const type = activityTypes[Math.floor(Math.random() * activityTypes.length)];
    const baseTime = Math.random() * 300 + 120; // 2-7 minutes
    
    activities.push({
      id: `activity_${i}`,
      type,
      skills: [type, 'cognitive development'],
      timeSpent: baseTime + (Math.random() * 60 - 30), // Add variation
      expectedTime: baseTime,
      stepsCompleted: Math.floor(Math.random() * 5) + 3,
      totalSteps: 5,
      completionRate: Math.random() * 0.4 + 0.6, // 0.6-1.0
      performance: Math.random() * 0.5 + 0.5,
      textPerformance: Math.random() * 0.4 + 0.4,
      visualElements: Math.random() > 0.5,
      attentionSpanSeconds: Math.random() * 180 + 60,
      expectedAttentionSpan: 120,
      taskSwitches: Math.floor(Math.random() * 5),
      performanceVariability: Math.random() * 0.6,
      numberRecognitionScore: Math.random() * 0.6 + 0.4,
      quantityEstimationAccuracy: Math.random() * 0.8 + 0.2,
      countingSequenceErrors: Math.floor(Math.random() * 4),
      multiStepAccuracy: Math.random() * 0.6 + 0.4,
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
    });
  }

  return activities;
};

export default LearningDisabilitiesDetector;