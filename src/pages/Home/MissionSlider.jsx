import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import food1 from "../../assets/food1.jpeg";
import food2 from "../../assets/food2.jpeg";
import food3 from "../../assets/food5.jpeg";

const MissionSlider = () => {
  const missions = [
    {
      title: "Reduce Food Waste",
      description:
        "We partner with restaurants and food businesses to collect their excess food and distribute it to shelters and communities in need. This way, edible food doesn't end up in landfills and can instead fill empty plates.",
      image: food1,
    },
    {
      title: "Empower Communities",
      description:
        "By connecting donors with local organizations, we help underserved families receive nutritious meals. It's not just about food—it's about dignity, hope, and building stronger, more caring communities.",
      image: food2,
    },
    {
      title: "Promote Sustainability",
      description:
        "Our mission supports a circular economy by ensuring food resources are used efficiently. Every meal rescued reduces waste, lowers carbon emissions, and creates a positive impact on the planet.",
      image: food3,
    },
  ];

  return (
    <section>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
      >
        {missions.map((mission, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="relative w-full h-[500px] bg-center bg-cover flex items-center justify-center px-4"
              style={{ backgroundImage: `url(${mission.image})` }}
            >
              <div className="text-white max-w-3xl text-center">
                <h3 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                  {mission.title}
                </h3>
                <p className="text-lg md:text-xl font-medium drop-shadow-md">
                  {mission.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default MissionSlider;
