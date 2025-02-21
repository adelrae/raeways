import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const Sound = () => {
  const barRef = useRef([]);
  const [envAudio] = useState(() => new Audio("/audios/env-audio.mp3"));
  const [isPlaying, setIsPlaying] = useState(false);
  const timeline = useRef(null);

  const handlePlaying = () => {
    setIsPlaying((prev) => !prev);
  };

  useGSAP(() => {
    // timeline.clear();
    timeline.current = gsap.timeline({
      repeat: -1,
      repeatDelay: 0,
      yoyo: true,
    });

    timeline.current.to(barRef.current, {
      scale: 1,
      duration: 2.5,
      ease: "power2.inOut",
      stagger: { each: -0.3, grid: [10, 1], axis: "y", yoyo: true, repeat: -1 },
    });
  }, []);

  useEffect(() => {
    envAudio.volume = 0.1;
    if (isPlaying) {
      envAudio.play();
      timeline.current.play();
    } else {
      envAudio.pause();
      timeline.current.pause();
      //   timeline.current.progress(0).pause();
    }
  }, [isPlaying]);

  return (
    <div
      onClick={handlePlaying}
      style={{
        position: "fixed",
        top: "2.2rem",
        left: "5rem",
        zIndex: 999,
        pointerEvents: "auto",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          width: "50px",
          height: "25px",
          cursor: "pointer",
        }}
      >
        {[...Array(10)].map((_, i) => (
          <span
            ref={(el) => (barRef.current[i] = el)}
            key={i}
            style={{
              width: "1px",
              height: "100%",
              backgroundColor: "white",
              display: "block",
              transform: "scaleY(0.1)",
              transformOrigin: "center bottom",
            }}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Sound;
