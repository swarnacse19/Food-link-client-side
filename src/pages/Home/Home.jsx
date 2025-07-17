import React from 'react';
import MissionSlider from './MissionSlider';
import Featured from './Featured';
import ImpactStats from './ImpactStats';
import Community from './Community';

function Home() {
  return (
    <div>
      <MissionSlider></MissionSlider>
      <Featured></Featured>
      <ImpactStats></ImpactStats>
      <Community></Community>
    </div>
  );
}

export default Home;