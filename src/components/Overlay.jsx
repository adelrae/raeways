import { useProgress } from "@react-three/drei";
import Sound from "./Sound";
import { usePlay } from "../contexts/Play";

const Overlay = () => {
  const { progress } = useProgress();
  const { play, setPlay, end, hasScroll } = usePlay();

  return (
    <div
      className={`overlay ${play ? "overlay--disable" : ""} ${
        hasScroll ? "overlay--scrolled" : ""
      }`}
    >
      <div
        className={`loader ${progress === 100 ? "loader--disappear" : ""}`}
      />
      {progress === 100 && (
        <div className={`intro ${play ? "intro--disappear" : ""}`}>
          <h1 className="logo">RAEWAYS</h1>
          <p className="intro__scroll">Scroll to brgin the journey</p>
          <button className="explore" onClick={() => setPlay(true)}>
            Explore
          </button>
        </div>
      )}
      <div className={`outro ${end ? "outro--appear" : ""}`}>
        <p className="outro__text">Wish you has a great flight with us...</p>
      </div>
      <Sound />
    </div>
  );
};

export default Overlay;
