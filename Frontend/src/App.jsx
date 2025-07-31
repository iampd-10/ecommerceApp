import React from "react";
// import Particles from "./components/Animation/Particles";
import PageToAssist from './components/PageToAssist';

function App() {
  return (
    <>
      
      <div style={{  width: "100%", height: "100%", position: "relative", zIndex: 0  }}>
        {/* <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        /> */}
         <div style={{ position: "relative", zIndex: 10 }}>
        <PageToAssist />

         </div>
      </div>
    </>
  );
}

export default App;
