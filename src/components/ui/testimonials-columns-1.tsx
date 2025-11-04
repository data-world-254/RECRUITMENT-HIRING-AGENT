"use client";
import React, { useState, useEffect, useRef } from "react";

type Testimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  const pauseTimeRef = useRef<number>(0);
  const duration = props.duration || 20;

  // Keep ref in sync with state
  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const animate = (timestamp: number) => {
      if (!container) return;

      // Initialize start time on first run
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      // Use current hover state from ref
      const currentlyHovered = isHoveredRef.current;

      if (currentlyHovered) {
        // When hovered, save the pause start time
        if (pauseTimeRef.current === 0) {
          pauseTimeRef.current = timestamp;
        }
        // Don't update transform when paused - it stays at current position
      } else {
        // When not hovered, calculate and update position
        if (pauseTimeRef.current > 0) {
          // We're resuming from pause - adjust start time by pause duration
          const pauseDuration = timestamp - pauseTimeRef.current;
          startTimeRef.current += pauseDuration;
          pauseTimeRef.current = 0;
        }

        // Calculate continuous smooth scrolling
        const elapsed = (timestamp - startTimeRef.current) / 1000;
        const progress = (elapsed % duration) / duration;
        const translateY = progress * -50;
        
        container.style.transform = `translateY(${translateY}%)`;
      }
      
      // Always continue the animation loop
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start the animation loop (only once on mount)
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
    };
  }, [duration]); // Animation loop only depends on duration, hover state is read via ref

  return (
    <div 
      className={props.className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={containerRef}
        className="flex flex-col gap-6 pb-6 bg-black"
        style={{
          willChange: "transform",
        }}
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div 
                  className="p-10 rounded-3xl border bg-black/80 backdrop-blur-sm shadow-lg shadow-primary/10 max-w-xs w-full font-figtree" 
                  style={{ borderColor: '#4A0DBA', borderWidth: '1px' }}
                  key={i}
                >
                  <div className="text-white/90 leading-relaxed font-figtree">{text}</div>
                  <div className="flex items-center gap-2 mt-5">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5 text-white font-figtree">{name}</div>
                      <div className="leading-5 opacity-60 tracking-tight text-white/70 font-figtree">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </div>
    </div>
  );
};

