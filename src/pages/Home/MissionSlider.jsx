import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import food1 from "../../assets/food1.jpeg";
import food2 from "../../assets/food4.jpeg";
import food3 from "../../assets/food5.jpeg";

const MissionSlider = () => {
  const missions = [
    {
      title: "Reduce Food Waste",
      description:
        "We help restaurants donate surplus food to those in need, ensuring nothing goes to waste.",
      image: food1
    },
    {
      title: "Empower Communities",
      description:
        "Connecting local charities with donors to support underprivileged communities with fresh meals.",
      image: food2
    },
    {
      title: "Promote Sustainability",
      description:
        "Every meal saved means less environmental harm and a greener planet.",
      image: food3,
    },
  ];

  return (
    <section className="my-10">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {missions.map((mission, idx) => (
          <SwiperSlide key={idx}>
            <div className="flex flex-col md:flex-row items-center gap-6 bg-orange-100 p-6 rounded-xl shadow-md">
              <img
                src={mission.image}
                alt={mission.title}
                className="w-full md:w-1/2 rounded-lg object-cover h-64 md:h-80"
              />
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-orange-600">
                  {mission.title}
                </h3>
                <p className="text-gray-700 text-base md:text-lg">
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
