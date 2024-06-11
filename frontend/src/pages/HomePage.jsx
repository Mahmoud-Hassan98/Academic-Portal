import video from "../assets/video.mp4"
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import InfoSeaction from "../Components/InfoSeaction";
import Stats from "../Components/Stats";
export default function HomePage() {
  return ( <>
    <section className="relative flex flex-col items-center justify-end text-center text-white" style={{ height: '700px' }}>
    <div className="video-docker absolute top-0 left-0 w-full h-full overflow-hidden">
      <video
        className="min-w-full min-h-full absolute object-cover"
        src={video}
        type="video/mp4"
        autoPlay
        muted
        loop
        style={{ filter: 'brightness(60%)' }} // Apply the brightness filter to darken the video
      />
    </div>
    <div className="video-content space-y-2 z-10 pb-5" style={{ height: '55vh' }}>
      <h1 style={{ color: 'white', fontSize: '60px', fontWeight: '600' }}>Welcome to Our Academic Portal </h1>
      <h3 style={{ color: 'white', fontSize: '30px', fontWeight: '500' }}>Begin your Academic Odyssey with our Cutting-Edge Portal</h3><HashLink smooth to="#food">
      <div className="mt-6">
   
        <Link className="relative px-8 py-4 font-medium text-white group"
         to="about" >
        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-500 group-hover:bg-purple-700 group-hover:skew-x-12" />
        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-500 group-hover:-skew-x-12" />
        <span className="absolute bottom-0 left-0 hidden w-16 h-32 transition-all duration-100 ease-out transform -translate-x-12 translate-y-16 bg-purple-600 -rotate-12" />
        <span className="absolute bottom-0 right-0 hidden w-16 h-32 transition-all duration-100 ease-out transform translate-x-16 translate-y-12 bg-purple-400 -rotate-12" />

        <span className="relative">About Us</span>

        </Link>
   
    </div>
      </HashLink>
    </div>   
  </section>
  <InfoSeaction/>
  <Stats/>
  </>
  );
}