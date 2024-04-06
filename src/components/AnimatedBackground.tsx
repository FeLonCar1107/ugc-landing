import { Tranquiluxe } from "uvcanvas";

export default function AnimatedBackground() {
  return (
    <div className="w-screen h-screen relative">
      <div className="w-full h-full relative">
        <Tranquiluxe />
        <div className="bg-black absolute top-0 w-full h-full opacity-15"></div>
      </div>
    </div>
  );
}
