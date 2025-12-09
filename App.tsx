import React, { useState, Suspense, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from './components/Scene';
import { Overlay } from './components/Overlay';
import { GestureController } from './components/GestureController';
import { TreeState } from './types';
import { CAMERA_POS } from './constants';
import { Loader } from '@react-three/drei';

const App: React.FC = () => {
  const [treeState, setTreeState] = useState<TreeState>(TreeState.FORMED);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [userPhotos, setUserPhotos] = useState<string[]>([]);
  const [handData, setHandData] = useState({ x: 0.5, y: 0.5, active: false });
  const [zoomFactor, setZoomFactor] = useState(0.5); // 0 to 1

  const toggleState = () => {
    setTreeState((prev) => 
      prev === TreeState.CHAOS ? TreeState.FORMED : TreeState.CHAOS
    );
  };

  const handlePhotoUpload = (files: FileList | null) => {
    if (!files) return;
    const newPhotos: string[] = [];
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
           setUserPhotos(prev => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Callback from Gesture Controller
  const handleGesture = useCallback((gesture: string) => {
    if (gesture === "Open_Palm") {
      setTreeState(TreeState.CHAOS);
    } else if (gesture === "Closed_Fist") {
      setTreeState(TreeState.FORMED);
    }
  }, []);

  const handleHandMove = useCallback((x: number, y: number, active: boolean) => {
      setHandData({ x, y, active });
  }, []);

  const handlePinch = useCallback((distance: number) => {
      // Smooth out the zoom a bit if needed, but direct mapping feels responsive
      setZoomFactor(distance);
  }, []);

  return (
    <div className="w-full h-screen bg-black relative">
      <Canvas
        camera={{ position: CAMERA_POS, fov: 45, near: 0.1, far: 100 }}
        dpr={[1, 2]} // Optimize pixel ratio
        gl={{ 
          antialias: false, // Postprocessing handles AA or makes it irrelevant with Bloom
          toneMapping: 3, // Cineon
          toneMappingExposure: 1.5 
        }}
        shadows
      >
        <Suspense fallback={null}>
          <Scene 
            treeState={treeState} 
            userPhotos={userPhotos}
            zoomFactor={zoomFactor}
            onPhotoClick={setSelectedPhoto} 
            handData={handData}
          />
        </Suspense>
      </Canvas>
      
      <Overlay state={treeState} onToggle={toggleState} onUpload={handlePhotoUpload} />
      <GestureController 
        onGesture={handleGesture} 
        onHandMove={handleHandMove} 
        onPinch={handlePinch}
      />
      
      {/* Photo Modal Overlay */}
      {selectedPhoto && (
        <div 
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-12 transition-all duration-500 animate-in fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
           <div 
             className="relative max-w-4xl max-h-full p-2 bg-gradient-to-b from-[#F9E58A] to-[#C5A059] shadow-[0_0_50px_rgba(197,160,89,0.5)] transform transition-transform duration-500 scale-100 hover:scale-[1.01]"
             onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image frame
           >
              {/* Image Frame */}
              <div className="bg-white p-4 pb-16 shadow-inner">
                <img 
                  src={selectedPhoto} 
                  alt="Memory" 
                  className="w-full h-auto max-h-[80vh] object-cover block border border-gray-100"
                />
                <div className="absolute bottom-6 left-0 right-0 text-center">
                    <p className="font-playfair italic text-gray-500 text-lg">A Cherished Moment</p>
                </div>
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-6 -right-6 w-12 h-12 bg-[#8a1c1c] text-[#F9E58A] rounded-full flex items-center justify-center font-bold shadow-lg hover:bg-red-700 hover:scale-110 transition-all border-2 border-[#C5A059]"
              >
                ✕
              </button>
           </div>
        </div>
      )}

      <Loader 
        containerStyles={{ background: '#000' }} 
        innerStyles={{ background: '#111', width: '200px' }}
        barStyles={{ background: '#C5A059', height: '2px' }}
        dataStyles={{ fontFamily: 'Cinzel', color: '#C5A059' }}
      />
    </div>
  );
};

export default App;