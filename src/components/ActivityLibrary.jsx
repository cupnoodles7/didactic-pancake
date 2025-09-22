// Activity library based on Piaget's developmental stages
export const activityLibrary = {
  sensorimotor: {
    name: "Sensorimotor Stage (0-2 years)",
    focus: "Exploration, object permanence, sensory-motor coordination",
    activities: [
      {
        id: "peek_a_boo",
        title: "Peek-a-Boo Adventure",
        description: "Play peek-a-boo or hide-and-seek with toys to teach object permanence",
        skills: "Object permanence, cause-and-effect understanding, social interaction",
        duration: "3-5 minutes",
        ageRange: "0-2 years",
        materials: ["Blanket or cloth", "Favorite toy", "Your hands"],
        steps: [
          {
            title: "Start with your face",
            instruction: "Cover your face with your hands and say 'Where did I go?' Then reveal your face and say 'Peek-a-boo!'",
            tip: "Use an excited, animated voice to keep your baby engaged and smiling."
          },
          {
            title: "Hide a favorite toy",
            instruction: "Take a favorite toy and slowly cover it with a blanket. Ask 'Where did the toy go?' Then pull away the blanket.",
            tip: "Watch for your baby's reaction - they may reach for the blanket or show excitement when the toy reappears."
          },
          {
            title: "Let baby participate",
            instruction: "Help your baby pull the blanket off the toy themselves. Celebrate when they do it!",
            tip: "This helps develop their understanding that objects exist even when they can't see them."
          }
        ]
      },
      {
        id: "sensory_exploration",
        title: "Sensory Discovery Box",
        description: "Explore different textures, sounds, and materials for sensory development",
        skills: "Sensory processing, fine motor skills, curiosity, exploration",
        duration: "5-7 minutes",
        ageRange: "6-24 months",
        materials: ["Safe textured items", "Rattles", "Soft blocks", "Different fabrics"],
        steps: [
          {
            title: "Prepare safe items",
            instruction: "Gather 3-4 safe items with different textures: smooth, rough, soft, bumpy. Make sure they're large enough to prevent choking.",
            tip: "Good options include textured balls, fabric squares, wooden blocks, or rubber toys."
          },
          {
            title: "Guide exploration",
            instruction: "Place items in front of your baby. Show them how to touch and feel each one. Describe what they're feeling: 'This is soft!' or 'This is bumpy!'",
            tip: "Let your baby explore at their own pace. Some may be cautious, others will grab everything immediately."
          },
          {
            title: "Make sounds together",
            instruction: "Show how different items make different sounds when tapped, shaken, or dropped (safely).",
            tip: "This develops cause-and-effect understanding and auditory processing skills."
          }
        ]
      },
      {
        id: "cause_effect_play",
        title: "Cause and Effect Fun",
        description: "Simple activities that show actions have consequences",
        skills: "Cause-and-effect reasoning, problem-solving, motor coordination",
        duration: "4-6 minutes",
        ageRange: "8-24 months",
        materials: ["Push-button toys", "Stacking cups", "Ball", "Simple musical instruments"],
        steps: [
          {
            title: "Demonstrate actions",
            instruction: "Show your baby how pressing a button makes a sound or light. Do it slowly so they can see the connection.",
            tip: "Use toys that have clear, immediate responses to actions."
          },
          {
            title: "Encourage baby to try",
            instruction: "Guide your baby's hand to press the button or perform the action. Celebrate when something happens!",
            tip: "Be patient - it may take several attempts before they understand the connection."
          },
          {
            title: "Expand the play",
            instruction: "Try dropping a ball into a cup, stacking blocks and knocking them down, or shaking a rattle.",
            tip: "Each activity reinforces that their actions can make things happen in the world around them."
          }
        ]
      }
    ]
  },
  preoperational: {
    name: "Preoperational Stage (2-7 years)",
    focus: "Symbolic thinking, pretend play, language development, imagination",
    activities: [
      {
        id: "cooking_adventure",
        title: "Cooking Adventure",
        description: "Pretend to cook a meal together using play kitchen items or real (safe) kitchen tools",
        skills: "Symbolic thinking, language development, social skills, creativity",
        duration: "3-5 minutes",
        ageRange: "2-7 years",
        materials: ["Play kitchen items", "Empty containers", "Wooden spoons", "Play food or real safe items"],
        steps: [
          {
            title: "Set up the kitchen",
            instruction: "Gather play kitchen items, pots, pans, and pretend food. If you don't have play items, use real (safe) kitchen utensils and empty containers.",
            tip: "Let your child choose what they want to 'cook' today. This gives them control and makes the activity more engaging."
          },
          {
            title: "Plan the meal",
            instruction: "Ask your child what they want to cook. Encourage them to describe the ingredients they need and the steps they'll follow.",
            tip: "Use questions like 'What should we cook first?' or 'What ingredients do we need?' to promote language development."
          },
          {
            title: "Start cooking together",
            instruction: "Begin the pretend cooking process. Stir, mix, and 'taste' the food. Take turns being the chef and the customer.",
            tip: "Make cooking sounds and describe what you're doing: 'I'm stirring the soup' or 'The pasta is bubbling!'"
          },
          {
            title: "Serve and enjoy",
            instruction: "Pretend to serve the meal to family members, dolls, or stuffed animals. Talk about how delicious it tastes!",
            tip: "This step develops social skills and empathy as your child considers others' needs and preferences."
          }
        ]
      },
      {
        id: "storytelling_adventure",
        title: "Story Creation Time",
        description: "Create stories together, encouraging imagination and language skills",
        skills: "Language development, creativity, narrative thinking, imagination",
        duration: "5-8 minutes",
        ageRange: "3-7 years",
        materials: ["Picture books", "Drawing paper", "Crayons", "Stuffed animals or dolls"],
        steps: [
          {
            title: "Choose a starting point",
            instruction: "Pick a picture from a book, a toy, or just start with 'Once upon a time...' Let your child help decide what the story will be about.",
            tip: "Follow your child's interests - if they love dinosaurs, make it a dinosaur story!"
          },
          {
            title: "Build the story together",
            instruction: "Take turns adding to the story. You say one sentence, then your child adds the next. Ask 'What happens next?' to keep them engaged.",
            tip: "Don't worry about the story making perfect sense - the goal is creativity and language practice."
          },
          {
            title: "Act it out",
            instruction: "Use toys, stuffed animals, or just your hands to act out parts of the story as you tell it.",
            tip: "Physical movement helps children remember the story and makes it more engaging."
          },
          {
            title: "Draw the story",
            instruction: "After telling the story, draw pictures of the main events or characters together.",
            tip: "This reinforces the narrative and gives your child a visual representation of their creativity."
          }
        ]
      },
      {
        id: "sorting_classification",
        title: "Sorting Safari",
        description: "Sort and classify objects by color, shape, size, or type",
        skills: "Classification, logical thinking, attention to detail, vocabulary",
        duration: "4-6 minutes",
        ageRange: "2-6 years",
        materials: ["Various household items", "Colored blocks", "Toys", "Containers for sorting"],
        steps: [
          {
            title: "Gather sorting materials",
            instruction: "Collect 10-15 safe items that can be sorted in different ways: by color, size, shape, or type (like all the cars together).",
            tip: "Start with obvious differences - red vs blue, big vs small - before moving to more subtle categories."
          },
          {
            title: "Start with one category",
            instruction: "Begin by sorting by one clear attribute, like color. Say 'Let's put all the red things together!' and demonstrate.",
            tip: "Let your child do most of the sorting while you provide gentle guidance and encouragement."
          },
          {
            title: "Try different categories",
            instruction: "Once they master one way of sorting, try another: 'Now let's sort by size!' or 'Can we group all the round things?'",
            tip: "This shows that the same objects can be organized in multiple ways, developing flexible thinking."
          },
          {
            title: "Make it a game",
            instruction: "Turn it into a treasure hunt: 'Can you find all the things that are smooth?' or 'Where are all the things that make noise?'",
            tip: "Adding movement and excitement keeps children engaged while they learn classification skills."
          }
        ]
      }
    ]
  },
  concrete_operational: {
    name: "Concrete Operational Stage (7-8 years)",
    focus: "Logical thinking, problem solving, understanding concrete concepts",
    activities: [
      {
        id: "math_logic_puzzles",
        title: "Number Detective",
        description: "Solve simple math puzzles and pattern recognition challenges",
        skills: "Mathematical reasoning, pattern recognition, logical thinking, problem-solving",
        duration: "6-10 minutes",
        ageRange: "7-8 years",
        materials: ["Paper and pencil", "Small counting objects", "Number cards", "Simple puzzles"],
        steps: [
          {
            title: "Start with patterns",
            instruction: "Create a simple pattern with objects or numbers: 2, 4, 6, ?, 10. Ask your child to find the missing number.",
            tip: "Start with easy patterns and gradually increase difficulty as they get comfortable."
          },
          {
            title: "Try word problems",
            instruction: "Create simple story problems: 'If you have 5 apples and eat 2, how many are left?' Use real objects to help visualize.",
            tip: "Make the problems relevant to your child's life and interests to keep them engaged."
          },
          {
            title: "Explore number relationships",
            instruction: "Show how numbers relate to each other: 'What's bigger, 7 or 9?' 'How much bigger?' Use visual aids if needed.",
            tip: "This develops their understanding of quantity and numerical relationships."
          },
          {
            title: "Create your own puzzles",
            instruction: "Let your child create math puzzles for you to solve. This reverses the roles and reinforces their learning.",
            tip: "When children teach others, it strengthens their own understanding of the concepts."
          }
        ]
      },
      {
        id: "science_experiments",
        title: "Little Scientist Lab",
        description: "Simple science experiments to explore cause and effect",
        skills: "Scientific thinking, hypothesis formation, observation, cause-and-effect reasoning",
        duration: "8-12 minutes",
        ageRange: "7-8 years",
        materials: ["Water", "Various safe household items", "Containers", "Notebook for observations"],
        steps: [
          {
            title: "Choose an experiment",
            instruction: "Pick a simple experiment like 'What floats and what sinks?' Gather items to test: coin, cork, paper, toy car.",
            tip: "Let your child make predictions before testing each item. This develops hypothesis-forming skills."
          },
          {
            title: "Make predictions",
            instruction: "Before testing each item, ask 'Do you think this will float or sink? Why?' Write down their predictions.",
            tip: "There are no wrong predictions - the goal is to encourage thinking and reasoning."
          },
          {
            title: "Test and observe",
            instruction: "Test each item one by one. Have your child observe carefully and describe what happens.",
            tip: "Encourage detailed observations: 'How quickly did it sink?' 'Did it float on top or just under the water?'"
          },
          {
            title: "Draw conclusions",
            instruction: "Compare predictions with results. Ask 'Why do you think some things float and others sink?' Discuss their ideas.",
            tip: "This develops critical thinking and helps them understand that learning comes from testing ideas."
          }
        ]
      },
      {
        id: "strategy_games",
        title: "Strategy Challenge",
        description: "Play simple strategy games that require planning and logical thinking",
        skills: "Strategic planning, logical reasoning, problem-solving, patience",
        duration: "10-15 minutes",
        ageRange: "7-8 years",
        materials: ["Simple board games", "Card games", "Checkers", "Tic-tac-toe"],
        steps: [
          {
            title: "Choose an appropriate game",
            instruction: "Start with simple strategy games like tic-tac-toe, connect four, or simple card games that require thinking ahead.",
            tip: "Choose games that are challenging but not frustrating - the goal is to develop thinking skills, not win at all costs."
          },
          {
            title: "Explain the strategy",
            instruction: "As you play, think out loud about your moves: 'I'm putting my X here because...' This models strategic thinking.",
            tip: "Encourage your child to explain their moves too: 'Why did you choose that spot?'"
          },
          {
            title: "Discuss different options",
            instruction: "When it's their turn, ask 'What are your options?' Help them see multiple possible moves before choosing.",
            tip: "This develops the ability to consider multiple solutions to a problem."
          },
          {
            title: "Learn from mistakes",
            instruction: "When a move doesn't work out, discuss what happened and what might work better next time.",
            tip: "Frame mistakes as learning opportunities rather than failures. This builds resilience and problem-solving skills."
          }
        ]
      }
    ]
  }
};

export const getActivityByStage = (stage) => {
  const stageMap = {
    'Sensorimotor Stage (0-2 years)': 'sensorimotor',
    'Preoperational Stage (2-7 years)': 'preoperational', 
    'Concrete Operational Stage (7-8 years)': 'concrete_operational'
  };
  
  return activityLibrary[stageMap[stage]] || activityLibrary.preoperational;
};

export const getRandomActivity = (stage) => {
  const stageActivities = getActivityByStage(stage);
  const activities = stageActivities.activities;
  return activities[Math.floor(Math.random() * activities.length)];
};

