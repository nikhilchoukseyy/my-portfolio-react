import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EducationPage = () => {
  const pathRef = useRef(null);
  const cardsRef = useRef([]);

  const Education = [
    {
      id: "10th",
      title: "10th Class",
      institute: "Vivekanand Higher Secondary School",
      date: "2020",
      description: "Finished 10th grade with 94.6%",
    },
    {
      id: "12th",
      title: "12th Class",
      institute: "Vivekanand Higher Secondary School",
      date: "2022",
      description: "Completed 12th with 90.6% (PCM)",
    },
    {
      id: "uni",
      title: "University",
      institute: "University Institute of Technology RGPV, Bhopal",
      date: "2023 - Present",
      description: "B.Tech in Information Technology",
    },
  ];

  useEffect(() => {
    const path = pathRef.current;
    const pathLength = path.getTotalLength();

    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    const cardLengths = Education.map((_, i) => {
      return (pathLength / (Education.length + 1)) * (i + 1);
    });

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".timeline-container",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        markers: false,
        onUpdate: (self) => {
          const currentLength = pathLength * self.progress;

          cardsRef.current.forEach((card, i) => {
            if (!card) return;

           
            if (currentLength >= cardLengths[i]) {
              gsap.to(card, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out",
              });
            } else {
              gsap.to(card, {
                opacity: 0,
                y: 20,
                duration: 0.3,
                ease: "power2.in",
              });
            }

            
            const point = path.getPointAtLength(cardLengths[i]);
            card.style.top = `${point.y}px`;

           
          });
        },
      },
    });

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="timeline-container relative w-full min-h-[220vh] bg-bg-primary overflow-hidden border-bg-tertiary border-dotted border-2 border-t-0">
      <h1 className="text-text-primary text-center font-thin text-2xl pt-4">Education</h1>
      <svg
        width="100%"
        height="1500"
        className="absolute left-0 top-0 z-0"
        viewBox="0 0 400 1500"
      >
        <path
          ref={pathRef}
          d="
            M200,50
            C300,250 100,450 200,650
            C300,850 100,1050 200,1250
          "
          stroke="var(--text-primary)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      
      {Education.map((card, i) => {
   
        const positionClass = i % 2 === 0
          ? "left-[45%] sm:left-[10%] md:left-[45%] lg:left-[45%]"
          : "left-[55%] sm:left-[10%] md:left-[55%] lg:left-[55%]";

        return (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className={`absolute ${positionClass} w-[260px] lg:w-[360px] bg-bg-secondary text-text-primary p-4 rounded-xl shadow-xl opacity-0`}
            style={{ transform: "translateX(-50%)" }} 
          >
            <h3 className="text-xl font-bold">{card.title}</h3>
            <p className="text-sm text-gray-400">{card.institute}</p>
            <p className="text-sm text-gray-400 italic">{card.date}</p>
            <p className="mt-2">{card.description}</p>
          </div>
        );
      })}
      
    </div>
  );
};

export default EducationPage;
