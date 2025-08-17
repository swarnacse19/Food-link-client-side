import React from "react";
import image from "../assets/bg.png";

export default function TermsAndConditions() {
  return (
    <section style={{ backgroundImage: `linear-gradient(to top, rgba(255, 255, 255, 0.3), rgba(254, 163, 1, 0.1) 100%), url(${image})` }} className="px-6 md:px-14 py-16 text-gray-700">
      <div className="max-w-4xl mx-auto bg-orange-50 shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">
          Terms & Conditions
        </h1>
        <p className="mb-6 text-sm text-gray-500 text-center">
          Last updated: August 17, 2025
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
            <p>
              Welcome to <span className="font-medium">Foodie Restaurant</span>. 
              By accessing or using our website, services, or ordering food, you
              agree to comply with and be bound by these Terms & Conditions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. Use of Service</h2>
            <p>
              Our services are provided for personal and non-commercial use only.
              You agree not to misuse or interfere with our website, booking
              system, or delivery service in any unlawful manner.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. Orders & Payments</h2>
            <p>
              All orders are subject to availability and confirmation. Payment
              must be completed through the accepted payment methods. We reserve
              the right to cancel or refuse any order if fraudulent or incorrect
              details are detected.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Cancellations & Refunds</h2>
            <p>
              Orders once confirmed cannot be cancelled. Refunds will only be
              provided in cases of non-delivery, incorrect items, or unavoidable
              circumstances as per our restaurant’s refund policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Liability</h2>
            <p>
              Foodie Restaurant shall not be held liable for any direct,
              indirect, incidental, or consequential damages arising from the use
              of our services, except as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. Changes to Terms</h2>
            <p>
              We may update these Terms & Conditions from time to time. Changes
              will be posted on this page with the updated date mentioned above.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">7. Contact Us</h2>
            <p>
              If you have any questions about these Terms & Conditions, please
              contact us at:  
              <br />
              📧{" "}
              <a
                href="mailto:info@foodierestaurant.com"
                className="text-orange-700 hover:underline"
              >
                info@foodierestaurant.com
              </a>
              <br />
              📞 +880 18243-11959
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
