import React from 'react';
import MissionSlider from './MissionSlider';
import Featured from './Featured';
import ImpactStats from './ImpactStats';

function Home() {
  return (
    <div>
      <MissionSlider></MissionSlider>
      <Featured></Featured>
      <ImpactStats></ImpactStats>
    </div>
  );
}

export default Home;