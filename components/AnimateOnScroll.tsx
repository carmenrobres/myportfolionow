import React, { useRef, useEffect, useState, ReactNode, ElementType } from 'react';

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  // Fix: Add 'as' prop to allow for polymorphic component rendering.
  as?: ElementType;
}

const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({ children, className = '', stagger = 0, as: Component = 'div' }) => {
  // Fix: Use a more generic ref type to support different element types.
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    // Fix: Render the component specified by the 'as' prop.
    <Component
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
      style={{ transitionDelay: `${stagger}ms` }}
    >
      {children}
    </Component>
  );
};

export default AnimateOnScroll;
