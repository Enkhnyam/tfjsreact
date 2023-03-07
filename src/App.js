import './App.css';
import Layout from './components/Layout';
import Contact from './pages/contact/Contact';
import ProjectsLanding from './pages/projects/projects-landing';
import NoPage from './pages/sonstige/NoPage';
import Home from './pages/home/Home';
import ObjectDetectionTFJSR from './pages/projects/ObjectDetectionTFJSR/ObjectDetectionTFJSR';
import ComingSoon from './pages/sonstige/ComingSoon';
import PoseDetection from './pages/projects/PoseDetection/PoseDetection';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PoseDetectionTFHUB from './pages/projects/PoseDetection/PoseDetectionTFHUB';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="https://enkhnyam.github.io/tfjsreact/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="projects-landing" element={<ProjectsLanding />} />
          <Route path="objectdetectiontfjsr" element={<ObjectDetectionTFJSR />} />
          <Route path="posedetection" element={<PoseDetection />} />
          <Route path="posedetectiontfhub" element={<PoseDetectionTFHUB />} />
          <Route path="comingsoon" element={<ComingSoon/>} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
