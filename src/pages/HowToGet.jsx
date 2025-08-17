import { FaMapMarkerAlt, FaSearch, FaPaperPlane, FaCheckCircle, FaHandHoldingHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const steps = [
  {
    id: 1,
    title: "Choose Your Location",
    icon: <FaMapMarkerAlt className="text-orange-600 text-4xl" />,
  },
  {
    id: 2,
    title: "Browse Available Donations",
    icon: <FaSearch className="text-orange-600 text-4xl" />,
  },
  {
    id: 3,
    title: "Send a Request",
    icon: <FaPaperPlane className="text-orange-600 text-4xl" />,
  },
  {
    id: 4,
    title: "Donation Will Be Assigned",
    icon: <FaCheckCircle className="text-orange-600 text-4xl" />,
  },
  {
    id: 5,
    title: "Pick Up Your Donation",
    icon: <FaHandHoldingHeart className="text-orange-600 text-4xl" />,
  },
];

export default function HowToGet() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2, 
  });

  return (
    <section ref={ref} className="py-20 px-6 text-center">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-orange-500 text-center">
        How To Get?
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-14">
        Follow these simple steps to request and receive food donations easily.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              delay: index * 0.5,
              duration: 0.6,
              type: "spring",
            }}
          >
            <div className="w-40 h-40 flex items-center justify-center rounded-full bg-orange-50 shadow-md relative">
              <div className="absolute -top-6 bg-orange-100 p-4 rounded-full shadow">
                {step.icon}
              </div>
              <p className="text-lg font-semibold px-3">{step.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
