import { useState } from "react";
import DialogueBox from "./components/DialogueBox";
import ParticleField from "./components/ParticleField";
import FileExplorer from "./components/FileExplorer";
import "./styles/App.css";

/*
  Root application controller.
  Manages the full boot flow:
    1. Intro dialogue
    2. Transition particle effect
    3. Main OS / File Explorer
    4. Optional "Corrupted Folder" overlay

  All global UI state lives here.
*/

const App = () => {
  // Opening dialogue
  const [showDialogue, setShowDialogue] = useState(true);

  // Particle transition between dialogue → OS
  const [showParticles, setShowParticles] = useState(false);

  // Main File Explorer window
  const [openExplorer, setOpenExplorer] = useState(false);

  // Active OS section ("about", "projects", etc.)
  const [activeSection, setActiveSection] = useState(null);

  // Tracks additional windows opened inside the OS
  const [openWindows, setOpenWindows] = useState([]);

  /*
    Opens additional windows inside the File Explorer UI.
    Ensures a window is only added once.
    Uses functional setState to avoid stale state in future updates.
  */
  const handleOpenWindow = (windowName) => {
    setOpenWindows((prev) =>
      prev.includes(windowName) ? prev : [...prev, windowName]
    );
  };

  return (
    <div className="app">
      {/* Static background */}
      <div className="background-wrap"></div>

      {/* Step 1: Opening dialogue */}
      {showDialogue && (
        <DialogueBox
          onComplete={() => {
            setShowDialogue(false);
            setShowParticles(true);
          }}
        />
      )}

      {/* Step 2: Transition particle effect */}
      {showParticles && (
        <ParticleField
          active={true}
          color="rgba(219,15,175,0.8)"
          onFieldComplete={() => setOpenExplorer(true)}
        />
      )}

      {/* Step 3: Main File Explorer */}
      {openExplorer && (
        <FileExplorer
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          handleOpenWindow={handleOpenWindow}
        />
      )}
    </div>
  );
};

export default App;