import React from "react";
import MissionSlider from "./MissionSlider";
import Featured from "./Featured";
import ImpactStats from "./ImpactStats";
import Community from "./Community";
import LatestCharityRequests from "./LatestCharityRequest";
import image from "../../assets/bg.png";

function Home() {
  return (
    <div>
      <MissionSlider></MissionSlider>
      <section style={{ backgroundImage: `linear-gradient(to top, rgba(255, 255, 255, 0.3), rgba(254, 163, 1, 0.1) 100%), url(${image})` }}>
        <Featured></Featured>
        <LatestCharityRequests></LatestCharityRequests>
        <ImpactStats></ImpactStats>
        <Community></Community>
      </section>
    </div>
  );
}

export default Home;
