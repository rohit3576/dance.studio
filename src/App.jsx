import React, { useEffect } from 'react'
import { useCustomCursor } from './hooks/useCustomCursor'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import ParticleField from './components/ParticleField'

import SceneHero from './sections/SceneHero'
import SceneEnergyBuild from './sections/SceneEnergyBuild'
import ScenePerformanceDrop from './sections/ScenePerformanceDrop'
import SceneStudioShowcase from './sections/SceneStudioShowcase'
import SceneCTA from './sections/SceneCTA'

export default function App() {
  useCustomCursor()

  return (
    <div className="relative bg-[#020205] min-h-screen">
      {/* Fixed UI */}
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <ParticleField />

      {/* Scene flow */}
      <main>
        <SceneHero />
        <SceneEnergyBuild />
        <ScenePerformanceDrop />
        <SceneStudioShowcase />
        <SceneCTA />
      </main>
    </div>
  )
}
