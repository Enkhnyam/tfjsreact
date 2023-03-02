import './App.css';
import Layout from './components/Layout';
import Contact from './pages/contact/Contact';
import ProjectsLanding from './pages/projects/projects-landing';
import NoPage from './pages/sonstige/NoPage';
import Home from './pages/home/Home';
import ObjectDetectionTFJSR from './pages/projects/ObjectDetectionTFJSR/ObjectDetectionTFJSR';
import ComingSoon from './pages/sonstige/ComingSoon';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="projects-landing" element={<ProjectsLanding />} />
          <Route path="objectdetectiontfjsr" element={<ObjectDetectionTFJSR />} />
          <Route path="comingsoon" element={<ComingSoon/>} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
