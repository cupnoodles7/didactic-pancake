import { useState, useEffect } from 'react';
import AnimatedCharacter from './AnimatedCharacter';

const FloatingCharacter = ({ 
  position = 'bottom-right',
  size = 'md',
  autoAnimate = true,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentAnimation, setCurrentAnimation] = useState('welcoming');

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
  };

  const animations = ['welcoming', 'encouraging', 'thinking', 'waving'];

  useEffect(() => {
    if (autoAnimate) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % animations.length;
        setCurrentAnimation(animations[currentIndex]);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [autoAnimate]);

  const handleCharacterClick = () => {
    // Cycle through animations on click
    const currentIndex = animations.indexOf(currentAnimation);
    const nextIndex = (currentIndex + 1) % animations.length;
    setCurrentAnimation(animations[nextIndex]);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed ${positionClasses[position]} z-50 cursor-pointer transition-all duration-300 hover:scale-110 ${className}`}
      onClick={handleCharacterClick}
      title="Click me for different animations!"
    >
      <div className="relative">
        <AnimatedCharacter 
          animation={currentAnimation}
          size={size}
          className="animate-float"
        />
        
        {/* Speech bubble for tips */}
        <div className="absolute -top-12 -left-8 bg-white rounded-lg px-3 py-2 shadow-lg border border-sage-200 opacity-0 hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          <div className="text-xs text-sage-700">
            {currentAnimation === 'welcoming' && "Welcome! Let's learn together!"}
            {currentAnimation === 'encouraging' && "You're doing great!"}
            {currentAnimation === 'thinking' && "What should we explore next?"}
            {currentAnimation === 'waving' && "See you next time!"}
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
        </div>

        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(false);
          }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-sage-600 text-white rounded-full text-xs hover:bg-sage-700 transition-colors opacity-0 hover:opacity-100"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default FloatingCharacter;

