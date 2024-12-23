'use client';

import { useEffect, useState, useRef } from 'react';

interface AnimateInViewProps {
  children?: React.ReactNode;
  className?: string; // Изначальные классы
  activeClass?: string; // Классы, которые активируются при появлении
  tag?: JSX.ElementType; // Тег, который нужно использовать для обёртки (по умолчанию div)
  threshold: number;
}

export const AnimateInView: React.FC<AnimateInViewProps> = ({
  children,
  className = 'opacity-0',
  activeClass = 'opacity-100 transition-opacity duration-1000 ease-in-out',
  tag = 'div',
  threshold = 0.1,
  ...props
}) => {
  if (threshold < 0 || threshold > 1) {
    throw new Error('Value must be between 0 and 1');
  }

  const [isVisible, setIsVisible] = useState(false);

  const elementRef = useRef<HTMLElement | SVGElement | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          console.log('observer active');
          observer.disconnect(); // Disconnect observer after visibility
        }
      },
      { threshold }, // Trigger when visible
    );

    observer.observe(elementRef.current); // Observe the element through ref

    return () => observer.disconnect(); // Cleanup observer on unmount
  }, [threshold]);

  const Component = tag;

  return (
    <Component
      ref={elementRef}
      className={isVisible ? `${className} ${activeClass}` : className}
      {...props}
    >
      {children}
    </Component>
  );
};
