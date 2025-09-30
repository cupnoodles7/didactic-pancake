/**
 * Government Policy Integration System
 * Provides personalized government scheme recommendations based on user eligibility
 */

class GovernmentPolicyEngine {
  constructor() {
    this.schemes = this.initializeSchemes();
    this.eligibilityCalculator = new EligibilityCalculator();
  }

  initializeSchemes() {
    return {
      nutrition: [
        {
          id: 'midday_meal',
          name: 'Pradhan Mantri Poshan Shakti Nirman (PM POSHAN)',
          description: 'Mid-day meal scheme providing nutritious meals to school children',
          category: 'Nutrition',
          targetAge: '3-14 years',
          eligibility: {
            income: { max: 800000, currency: 'INR' }, // 8 LPA
            schoolEnrollment: true,
            governmentSchool: true
          },
          benefits: [
            'Free nutritious meals during school days',
            'Improved nutritional status',
            'Enhanced school attendance',
            'Micronutrient supplementation'
          ],
          applicationProcess: 'Through school enrollment',
          documents: ['School admission certificate', 'Income certificate', 'Ration card'],
          website: 'https://pmposhan.education.gov.in/',
          contactInfo: 'District Education Officer',
          implementingAgency: 'Ministry of Education',
          budgetAllocation: '₹11,500 crores (2024-25)',
          coverage: '11.8 crore children',
          nutritionalValue: '450 kcal energy, 12g protein per meal'
        },
        {
          id: 'anganwadi_nutrition',
          name: 'Integrated Child Development Services (ICDS)',
          description: 'Comprehensive nutrition and health services through Anganwadi centers',
          category: 'Nutrition & Health',
          targetAge: '0-6 years',
          eligibility: {
            income: { max: 500000, currency: 'INR' }, // 5 LPA
            ageRange: [0, 72], // months
            residentProof: true
          },
          benefits: [
            'Supplementary nutrition (THR/SNP)',
            'Growth monitoring',
            'Immunization services',
            'Health check-ups',
            'Referral services',
            'Pre-school education'
          ],
          applicationProcess: 'Register at nearest Anganwadi center',
          documents: ['Birth certificate', 'Residence proof', 'Income certificate', 'Aadhaar card'],
          website: 'https://icds-wcd.nic.in/',
          contactInfo: 'Anganwadi Worker/Supervisor',
          implementingAgency: 'Ministry of Women and Child Development',
          budgetAllocation: '₹20,105 crores (2024-25)',
          coverage: '10.89 crore beneficiaries',
          nutritionalValue: '500 kcal, 12-16g protein for children 3-6 years'
        },
        {
          id: 'fortified_foods',
          name: 'Food Fortification Program',
          description: 'Access to fortified rice, wheat, oil, milk, and salt through PDS',
          category: 'Nutrition',
          targetAge: 'All ages',
          eligibility: {
            rationCard: ['BPL', 'APL', 'AAY'],
            income: { max: 1000000, currency: 'INR' }
          },
          benefits: [
            'Iron and folic acid fortified wheat flour',
            'Vitamin A and D fortified edible oil',
            'Iron fortified rice',
            'Iodized salt',
            'Vitamin A, D fortified milk'
          ],
          applicationProcess: 'Available through existing PDS system',
          documents: ['Ration card', 'Aadhaar card'],
          website: 'https://dfpd.gov.in/',
          contactInfo: 'Fair Price Shop dealer',
          implementingAgency: 'Department of Food and Public Distribution',
          coverage: '80 crore people',
          nutritionalValue: 'Addresses micronutrient deficiencies'
        }
      ],
      education: [
        {
          id: 'rte_admission',
          name: 'Right to Education (RTE) Act',
          description: 'Free and compulsory education for children aged 6-14 years',
          category: 'Education',
          targetAge: '6-14 years',
          eligibility: {
            age: [72, 168], // months
            citizenship: 'Indian',
            noEducationBarrier: true
          },
          benefits: [
            'Free admission in government schools',
            '25% quota in private schools',
            'No fees for tuition, books, uniforms',
            'No donation or capitation fees',
            'Protection from discrimination'
          ],
          applicationProcess: 'Online application through state education portal',
          documents: ['Birth certificate', 'Address proof', 'Caste certificate (if applicable)'],
          website: 'https://rte.gov.in/',
          contactInfo: 'Block Education Officer',
          implementingAgency: 'Ministry of Education',
          coverage: '19.4 crore children',
          specialProvisions: '25% reservation in private schools for disadvantaged groups'
        },
        {
          id: 'balvatika',
          name: 'Balvatika (Pre-primary Education)',
          description: 'Quality pre-primary education in government schools',
          category: 'Early Education',
          targetAge: '3-6 years',
          eligibility: {
            age: [36, 72], // months
            schoolAvailability: true
          },
          benefits: [
            'Play-based learning curriculum',
            'Trained teachers',
            'Learning materials and toys',
            'Preparation for formal schooling',
            'Activity-based pedagogy'
          ],
          applicationProcess: 'Direct admission at government schools',
          documents: ['Birth certificate', 'Immunization card', 'Photo'],
          website: 'https://nipun.education.gov.in/',
          contactInfo: 'School Principal/Head Teacher',
          implementingAgency: 'Ministry of Education',
          coverage: 'Expanding to all government schools',
          curriculum: 'National Curriculum Framework for Foundational Stage'
        },
        {
          id: 'scholarship_pre_matric',
          name: 'Pre-Matric Scholarship Scheme',
          description: 'Financial assistance for SC/ST/OBC students',
          category: 'Education Support',
          targetAge: '6-18 years',
          eligibility: {
            caste: ['SC', 'ST', 'OBC'],
            income: { max: 250000, currency: 'INR' }, // 2.5 LPA
            schoolEnrollment: true
          },
          benefits: [
            'Monthly scholarship amount',
            'Books and stationery allowance',
            'Uniform allowance',
            'Examination fees',
            'Hostel charges (if applicable)'
          ],
          applicationProcess: 'Online application through National Scholarship Portal',
          documents: ['Caste certificate', 'Income certificate', 'School certificate', 'Bank details'],
          website: 'https://scholarships.gov.in/',
          contactInfo: 'District Welfare Officer',
          implementingAgency: 'Ministry of Social Justice and Empowerment',
          scholarshipAmount: '₹225-700 per month (varies by class)',
          coverage: '4.2 crore students'
        }
      ],
      health: [
        {
          id: 'immunization_universal',
          name: 'Mission Indradhanush',
          description: 'Universal immunization program for children and pregnant women',
          category: 'Health',
          targetAge: '0-2 years, Pregnant women',
          eligibility: {
            age: [0, 24], // months
            pregnancyStatus: 'applicable',
            citizenship: 'Indian'
          },
          benefits: [
            'Free vaccines against 12 diseases',
            'Routine immunization',
            'Catch-up vaccination',
            'New vaccine introduction',
            'Cold chain maintenance'
          ],
          applicationProcess: 'Visit nearest health center/Anganwadi',
          documents: ['Birth certificate', 'Immunization card', 'Mother-child protection card'],
          website: 'https://mohfw.gov.in/',
          contactInfo: 'ANM/ASHA worker',
          implementingAgency: 'Ministry of Health and Family Welfare',
          coverage: '90%+ immunization coverage',
          vaccines: 'BCG, Hepatitis B, OPV, IPV, Pentavalent, Rotavirus, PCV, MR, JE, Typhoid'
        },
        {
          id: 'ayushman_bharat',
          name: 'Ayushman Bharat PM-JAY',
          description: 'Health insurance coverage for poor and vulnerable families',
          category: 'Health Insurance',
          targetAge: 'All ages',
          eligibility: {
            secc2011: true,
            income: { max: 500000, currency: 'INR' },
            vulnerableCategories: ['SC/ST', 'landless', 'manual scavengers']
          },
          benefits: [
            '₹5 lakh annual health cover per family',
            'Cashless treatment',
            'Pre and post hospitalization',
            'Day care procedures',
            'Emergency services'
          ],
          applicationProcess: 'Check eligibility and get Ayushman card',
          documents: ['Aadhaar card', 'Ration card', 'SECC verification'],
          website: 'https://pmjay.gov.in/',
          contactInfo: 'Common Service Center',
          implementingAgency: 'National Health Authority',
          coverage: '12 crore families',
          hospitalNetwork: '27,000+ empaneled hospitals'
        }
      ],
      maternal: [
        {
          id: 'janani_suraksha',
          name: 'Janani Suraksha Yojana (JSY)',
          description: 'Safe motherhood intervention to reduce maternal and infant mortality',
          category: 'Maternal Health',
          targetAge: 'Pregnant women',
          eligibility: {
            pregnancyStatus: 'pregnant',
            deliveryType: 'institutional',
            bplStatus: 'applicable'
          },
          benefits: [
            'Cash assistance for institutional delivery',
            'Free delivery services',
            'Post-delivery care',
            'Transportation support',
            'ASHA accompaniment'
          ],
          applicationProcess: 'Register during pregnancy at health center',
          documents: ['Pregnancy card', 'BPL certificate', 'Bank account details'],
          website: 'https://nhm.gov.in/',
          contactInfo: 'ANM/ASHA worker',
          implementingAgency: 'National Health Mission',
          cashBenefit: '₹1,400 (rural), ₹1,000 (urban)',
          coverage: 'All pregnant women below poverty line'
        },
        {
          id: 'pradhan_mantri_matru',
          name: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
          description: 'Maternity benefit program for pregnant and lactating mothers',
          category: 'Maternal Support',
          targetAge: 'Pregnant & lactating women',
          eligibility: {
            pregnancyStatus: 'pregnant_or_lactating',
            firstChild: true,
            age: [19, 45],
            income: { max: 1000000, currency: 'INR' }
          },
          benefits: [
            '₹5,000 cash transfer in three installments',
            'Nutritional support',
            'Health monitoring',
            'Birth registration support'
          ],
          applicationProcess: 'Apply at Anganwadi center during pregnancy',
          documents: ['Pregnancy registration', 'Bank account', 'Aadhaar card', 'Delivery certificate'],
          website: 'https://pmmvy.nic.in/',
          contactInfo: 'Anganwadi Worker',
          implementingAgency: 'Ministry of Women and Child Development',
          coverage: '1.76 crore beneficiaries',
          paymentSchedule: '₹1,000 + ₹2,000 + ₹2,000'
        }
      ],
      disability: [
        {
          id: 'unique_disability_id',
          name: 'Unique Disability ID (UDID)',
          description: 'Single document for persons with disabilities to access benefits',
          category: 'Disability Support',
          targetAge: 'All ages',
          eligibility: {
            disabilityStatus: true,
            disabilityPercentage: { min: 40 },
            medicalCertificate: true
          },
          benefits: [
            'Single identity document',
            'Access to all disability schemes',
            'Scholarship eligibility',
            'Job reservation benefits',
            'Travel concessions'
          ],
          applicationProcess: 'Online application with medical certificate',
          documents: ['Disability certificate', 'Photo', 'Address proof', 'Aadhaar card'],
          website: 'https://udid.gov.in/',
          contactInfo: 'District Disability Rehabilitation Officer',
          implementingAgency: 'Ministry of Social Justice and Empowerment',
          coverage: '2.68 crore registered',
          validity: 'Lifetime'
        }
      ]
    };
  }

  // Get personalized scheme recommendations based on user profile
  getRecommendedSchemes(userProfile) {
    const recommendations = [];
    
    // Check each category of schemes
    Object.entries(this.schemes).forEach(([category, schemes]) => {
      schemes.forEach(scheme => {
        const eligibility = this.eligibilityCalculator.checkEligibility(scheme, userProfile);
        if (eligibility.isEligible) {
          recommendations.push({
            ...scheme,
            eligibilityScore: eligibility.score,
            missingRequirements: eligibility.missingRequirements,
            priority: this.calculatePriority(scheme, userProfile),
            estimatedBenefit: this.estimateBenefit(scheme, userProfile),
            applicationDeadline: this.getApplicationDeadline(scheme),
            processingTime: this.getProcessingTime(scheme)
          });
        }
      });
    });

    // Sort by priority and eligibility score
    return recommendations.sort((a, b) => {
      if (a.priority !== b.priority) return b.priority - a.priority;
      return b.eligibilityScore - a.eligibilityScore;
    });
  }

  calculatePriority(scheme, userProfile) {
    let priority = 5; // Base priority
    
    // Higher priority for nutrition schemes if child is underweight
    if (scheme.category.includes('Nutrition') && userProfile.nutritionConcerns) {
      priority += 3;
    }
    
    // Higher priority for education schemes based on child age
    if (scheme.category.includes('Education') && this.isInSchoolAge(userProfile.childAge, scheme.targetAge)) {
      priority += 2;
    }
    
    // Higher priority for health schemes if health issues exist
    if (scheme.category.includes('Health') && userProfile.healthConcerns) {
      priority += 2;
    }
    
    // Higher priority for maternal schemes if pregnant
    if (scheme.category.includes('Maternal') && userProfile.pregnancyStatus) {
      priority += 4;
    }
    
    return Math.min(priority, 10); // Cap at 10
  }

  estimateBenefit(scheme, userProfile) {
    const benefits = {
      monetary: 0,
      services: [],
      longTermValue: 0
    };
    
    // Calculate monetary benefits
    if (scheme.scholarshipAmount) {
      const amount = scheme.scholarshipAmount.match(/₹(\d+)-?(\d+)?/);
      if (amount) {
        benefits.monetary = parseInt(amount[1]) * 12; // Annual
      }
    }
    
    if (scheme.cashBenefit) {
      const amount = scheme.cashBenefit.match(/₹([\d,]+)/);
      if (amount) {
        benefits.monetary = parseInt(amount[1].replace(',', ''));
      }
    }
    
    // List service benefits
    benefits.services = scheme.benefits || [];
    
    // Estimate long-term value
    if (scheme.category.includes('Education')) {
      benefits.longTermValue = 500000; // Education ROI
    }
    if (scheme.category.includes('Health')) {
      benefits.longTermValue = 200000; // Health savings
    }
    if (scheme.category.includes('Nutrition')) {
      benefits.longTermValue = 300000; // Nutrition impact
    }
    
    return benefits;
  }

  getApplicationDeadline(scheme) {
    // Mock deadlines based on scheme type
    const deadlines = {
      'scholarship': '31st March',
      'admission': 'Ongoing',
      'health': 'No deadline',
      'nutrition': 'Ongoing enrollment',
      'maternal': 'During pregnancy'
    };
    
    return deadlines[scheme.category.toLowerCase()] || 'Check official website';
  }

  getProcessingTime(scheme) {
    const processingTimes = {
      'education': '15-30 days',
      'nutrition': '7-15 days', 
      'health': 'Immediate',
      'maternal': '30-45 days',
      'disability': '60-90 days'
    };
    
    return processingTimes[scheme.category.toLowerCase()] || '30-60 days';
  }

  isInSchoolAge(childAge, targetAge) {
    // Parse target age range and check if child fits
    const ageMatch = targetAge.match(/(\d+)-(\d+)/);
    if (ageMatch) {
      const minAge = parseInt(ageMatch[1]);
      const maxAge = parseInt(ageMatch[2]);
      return childAge >= minAge && childAge <= maxAge;
    }
    return false;
  }

  // Get application tracking information
  getApplicationStatus(applicationId) {
    // Mock application tracking
    const statuses = ['Submitted', 'Under Review', 'Document Verification', 'Approved', 'Rejected', 'Benefits Disbursed'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      applicationId,
      status: randomStatus,
      submissionDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      lastUpdated: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      estimatedCompletion: new Date(Date.now() + Math.random() * 60 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      nextAction: this.getNextAction(randomStatus),
      contactInfo: 'District Program Officer',
      grievanceNumber: 'GRV' + Math.floor(Math.random() * 1000000)
    };
  }

  getNextAction(status) {
    const actions = {
      'Submitted': 'Wait for initial review',
      'Under Review': 'Application being processed',
      'Document Verification': 'Submit missing documents if requested',
      'Approved': 'Benefits will be disbursed soon',
      'Rejected': 'Check rejection reason and reapply if eligible',
      'Benefits Disbursed': 'Check bank account for benefits'
    };
    
    return actions[status] || 'Contact program officer';
  }
}

// Eligibility Calculator Class
class EligibilityCalculator {
  checkEligibility(scheme, userProfile) {
    let score = 0;
    let maxScore = 0;
    const missingRequirements = [];
    
    const eligibility = scheme.eligibility;
    
    // Check income eligibility
    if (eligibility.income) {
      maxScore += 30;
      if (userProfile.annualIncome <= eligibility.income.max) {
        score += 30;
      } else {
        missingRequirements.push(`Annual income should be ≤ ₹${eligibility.income.max.toLocaleString()}`);
      }
    }
    
    // Check age eligibility
    if (eligibility.age || eligibility.ageRange) {
      maxScore += 25;
      const ageRange = eligibility.age || eligibility.ageRange;
      if (userProfile.childAge >= ageRange[0] && userProfile.childAge <= ageRange[1]) {
        score += 25;
      } else {
        missingRequirements.push(`Child age should be between ${ageRange[0]} and ${ageRange[1]} months`);
      }
    }
    
    // Check caste eligibility
    if (eligibility.caste) {
      maxScore += 20;
      if (eligibility.caste.includes(userProfile.caste)) {
        score += 20;
      } else {
        missingRequirements.push(`Caste should be one of: ${eligibility.caste.join(', ')}`);
      }
    }
    
    // Check ration card
    if (eligibility.rationCard) {
      maxScore += 15;
      if (eligibility.rationCard.includes(userProfile.rationCardType)) {
        score += 15;
      } else {
        missingRequirements.push(`Ration card type should be: ${eligibility.rationCard.join(' or ')}`);
      }
    }
    
    // Check school enrollment
    if (eligibility.schoolEnrollment) {
      maxScore += 10;
      if (userProfile.schoolEnrolled) {
        score += 10;
      } else {
        missingRequirements.push('Child should be enrolled in school');
      }
    }
    
    const finalScore = maxScore > 0 ? (score / maxScore) * 100 : 100;
    
    return {
      isEligible: finalScore >= 70, // 70% threshold
      score: finalScore,
      missingRequirements
    };
  }
}

export default GovernmentPolicyEngine;