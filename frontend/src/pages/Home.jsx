import Navbar from "../components/layout/Navbar.jsx";
import Hero from "../components/home/Hero.jsx";
import Features from "../components/home/Features.jsx";
import Workflow from "../components/home/Workflow.jsx";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Workflow />
    </>
  );
}

export default Home;
