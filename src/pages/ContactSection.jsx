import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

export default function ContactUs() {
  const form = useRef();
  const [status, setStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .sendForm(
        "service_q85npvb",   
        "template_g5xnj43", 
        form.current,
        "41xSar3KTsHunwJGx" 
      )
      .then(
        () => {
          setStatus("success");
          form.current.reset();
          setTimeout(() => setStatus(null), 4000);
        },
        (error) => {
          console.error("EmailJS error:", error);
          setStatus("error");
          setTimeout(() => setStatus(null), 4000);
        }
      );
  };

  return (
    <section id="contact" className="px-6 md:px-14 mx-auto py-20 bg-orange-50">
      <h2 className="text-3xl md:text-4xl text-orange-500 font-bold mb-10 text-center">
        Contact Us
      </h2>

      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        {/* Left: Contact Info */}
        <div className="w-full lg:w-1/2 p-8 bg-white shadow-md rounded-xl">
          <h3 className="text-xl font-semibold mb-6">
            Have questions about food donations or partnerships? Reach out!
          </h3>

          <div className="space-y-4">
            {/* Email */}
            <div className="flex items-center gap-4 p-4 rounded-lg hover:shadow transition">
              <FaEnvelope className="text-orange-500 text-2xl" />
              <div>
                <p className="font-semibold">Email</p>
                <a
                  href="mailto:foodlink.bd@gmail.com"
                  className="text-gray-500 hover:underline break-words"
                >
                  foodlink.bd@gmail.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4 p-4 rounded-lg hover:shadow transition">
              <FaPhoneAlt className="text-orange-500 text-2xl" />
              <div>
                <p className="font-semibold">Phone / WhatsApp</p>
                <a
                  href="tel:+8801824311959"
                  className="text-gray-500 hover:underline"
                >
                  +880 18243-11959
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-4 p-4 rounded-lg hover:shadow transition">
              <IoLocationSharp size={30} className="text-orange-500 text-2xl" />
              <div>
                <p className="font-semibold">Location</p>
                <p className="text-gray-500">Barishal, Bangladesh</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-lg p-8">
          {status === "success" && (
            <div className="p-3 mb-4 rounded bg-green-100 text-green-600">
              ✅ Message sent successfully. We will get back to you soon!
            </div>
          )}
          {status === "error" && (
            <div className="p-3 mb-4 rounded bg-red-100 text-red-700">
              ❌ Something went wrong. Please try again later.
            </div>
          )}

          <form ref={form} onSubmit={sendEmail} className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your full name"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your.email@example.com"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Message</label>
              <textarea
                name="message"
                required
                placeholder="Write your message..."
                rows="6"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-y"
              />
            </div>

            <div>
              <button
                type="submit"
                className={`w-full py-3 rounded-lg font-semibold text-white bg-orange-600 hover:bg-orange-700 transition ${
                  status === "sending" ? "opacity-75 cursor-not-allowed" : ""
                }`}
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
