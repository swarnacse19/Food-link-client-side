import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import { Card, Avatar, Button } from 'react-daisyui';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Community = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
  {
    id: 1,
    text: "Thanks to this platform, our restaurant donates meals daily instead of wasting them. It’s heartwarming to know our food is reaching people who truly need it.",
    name: "Rashi Ahamed",
    title: "Restaurant Manager",
    avatar: "https://i.ibb.co/jv81Z19r/girl1.jpg",
  },
  {
    id: 2,
    text: "This initiative has transformed how we serve our community. Regular food donations have allowed us to support dozens of families with fresh meals every week.",
    name: "Arpa Hossain",
    title: "Charity Organizer",
    avatar: "https://i.ibb.co/LXxHXP5g/girl2.jpg",
  },
  {
    id: 3,
    text: "We’ve partnered with several local restaurants through this program. Their contributions help us feed the homeless population in our area every single night.",
    name: "Nasira Mira",
    title: "Non-Profit Director",
    avatar: "https://i.ibb.co/v6TrY4pZ/girl3.jpg",
  },
  {
    id: 4,
    text: "Instead of throwing away perfectly good food, we now donate it to shelters nearby. It’s a small act from us, but it creates a huge impact.",
    name: "Janne Doe",
    title: "Café Owner",
    avatar: "https://i.ibb.co/Pz4MMyKD/student3.webp",
  },
  {
    id: 5,
    text: "Being part of this donation network helped us connect with people and causes we never imagined. Giving food is now part of our kitchen routine.",
    name: "John Smitha",
    title: "Restaurant Chef",
    avatar: "https://i.ibb.co/bjfz1Dv4/student1.jpg",
  },
];


  const settings = {
    className: "center", 
    centerMode: true,
    infinite: true,
    centerPadding: "60px", 
    slidesToShow: 3, 
    speed: 500,
    dots: false, 
    arrows: false, 
    autoplay: true, 
    autoplaySpeed: 3000,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex), 


    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 3,
          centerPadding: "40px",
        }
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 1, 
          centerPadding: "0px", 
          dots: true, 
        }
      },
      {
        breakpoint: 640, 
        settings: {
          slidesToShow: 1,
          centerPadding: "0px",
          dots: true,
        }
      }
    ]
  };

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Community Stories</h2>

        <div className="">
          <Slider ref={sliderRef} {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="p-2 outline-none">
                <Card
                  className={`shadow-xl p-6 bg-white testimonial-card`}
                >
                  <Card.Body className="p-0">
                    <p className="text-left text-gray-700 text-lg mb-6 relative">
                      {testimonial.text}
                    </p>
                    <div className="flex items-center mt-auto border-t-2 pt-4 border-gray-300">
                      <Avatar
                        src={testimonial.avatar}
                        alt={`${testimonial.name}'s avatar`}
                        shape="circle"
                        size="lg"
                        className="mr-4 w-16"
                      />
                      <div className="text-left">
                        <h4 className="text-lg font-semibold text-gray-800">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.title}</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </Slider>
        </div>

        {/* Custom Navigation Dots and arrow*/}
        <div className="flex items-center justify-center mt-8 space-x-2">
            <Button className="btn rounded-3xl bg-white text-black hover:text-primary backdrop-blur-sm" onClick={goToPrev}>
              <FaArrowLeft />
            </Button>
          {testimonials.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-200 ${
                index === currentSlide ? 'bg-primary' : 'bg-gray-300'
              }`}
              onClick={() => sliderRef.current.slickGoTo(index)}
            ></span>
          ))}
          <Button className="btn rounded-3xl text-black bg-orange-200" onClick={goToNext}>
              <FaArrowRight />
            </Button>
        </div>
      </div>
    </section>
  );
};

export default Community;