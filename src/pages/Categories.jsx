import React from "react";
import Marquee from "react-fast-marquee";

const donations = [
  { id: 1, title: "Cooked", image: "https://i.ibb.co/HTXJ5tnQ/biriyani.jpg" },
  { id: 2, title: "Bakery", image: "https://i.ibb.co/M56bh6r9/bread.jpg" },
  { id: 3, title: "Produce", image: "https://i.ibb.co/h1nVgqRk/salad.jpg" },
  { id: 4, title: "Canned", image: "https://i.ibb.co.com/GQ9RTRWP/beans.jpg" },
  { id: 5, title: "Pizza", image: "https://i.ibb.co.com/3YsZW21z/pizza1.jpg" },
  { id: 6, title: "Pasta", image: "https://i.ibb.co.com/kgTGcv89/pasta1.jpg" },
  { id: 7, title: "Sandwich", image: "https://i.ibb.co.com/TqxPfVb2/sandwitch.jpg" },
  { id: 8, title: "Burger", image: "https://i.ibb.co.com/GfhWV10k/burger.jpg" },
  { id: 5, title: "Chocolate", image: "https://i.ibb.co.com/dwtKjmKc/chocolate.jpg" },
];

const Categories = () => {
  return (
    <div className="py-20 px-4 md:px-10 mx-auto">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-orange-500 text-center">Our Categories</h2>
      <p className="mb-14 text-center text-[16px] font-semibold">More than 1100+ Dishes</p>
      <Marquee pauseOnHover={true} speed={60} direction="left">
        {donations.map((donation) => (
          <div
            key={donation.id}
            className="bg-white shadow-md rounded-xl w-56 p-4 m-2 flex flex-col items-center"
          >
            <img
              src={donation.image}
              alt={donation.title}
              className="w-32 h-32 object-cover rounded-full mb-3"
            />
            <h3 className="text-lg font-semibold">{donation.title}</h3>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Categories;
