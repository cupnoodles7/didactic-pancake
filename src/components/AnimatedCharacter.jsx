import { useState, useEffect } from 'react';
import welcomingKid from '../assets/welcoming_kid_no_bg.png';
import guidingKid from '../assets/guiding_kid_no_bg.png';
import celebratingKid from '../assets/celebrating_kid_no_bg.png';
import encouragingKid from '../assets/encouraging_kid_no_bg.png';
import thinkingKid from '../assets/thinking_kid_no_bg.png';
import listeningKid from '../assets/listening_kid_no_bg.png';
import wavingKid from '../assets/waving_kid_no_bg.png';

const animations = {
  welcoming: welcomingKid,
  guiding: guidingKid,
  celebrating: celebratingKid,
  encouraging: encouragingKid,
  thinking: thinkingKid,
  listening: listeningKid,
  waving: wavingKid,
};

const AnimatedCharacter = ({ 
  animation = 'welcoming', 
  size = 'md',
  className = '',
  autoAnimate = false,
  animationDuration = 3000 
}) => {
  const [currentAnimation, setCurrentAnimation] = useState(animation);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40'
  };

  useEffect(() => {
    if (autoAnimate) {
      const animationKeys = Object.keys(animations);
      let currentIndex = animationKeys.indexOf(animation);
      
      const interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % animationKeys.length;
        setCurrentAnimation(animationKeys[currentIndex]);
      }, animationDuration);

      return () => clearInterval(interval);
    } else {
      setCurrentAnimation(animation);
    }
  }, [animation, autoAnimate, animationDuration]);

  return (
    <div className={`${sizeClasses[size]} ${className} transition-all duration-500 ease-in-out`}>
      <img 
        src={animations[currentAnimation]} 
        alt={`Character ${currentAnimation}`}
        className="w-full h-full object-contain animate-float"
        style={{
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
        }}
      />
    </div>
  );
};

export default AnimatedCharacter;

