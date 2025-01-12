import React, { useEffect } from "react";
import Navbar from "./navbar"; // Import Navbar component

const AboutUs = () => {
  useEffect(() => {
    // Smooth scrolling animations
    const elements = document.querySelectorAll(".fade-in-on-scroll");
    const handleScroll = () => {
      elements.forEach((el) => {
        
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
          el.classList.add("opacity-100", "translate-y-0");
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tl from-teal-100 via-cyan-50 to-blue-50 text-gray-800">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-[70vh] bg-cover bg-center" style={{ backgroundImage: "url('./assets/hero-bg.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center text-white space-y-4">
          <h1 className="text-5xl font-bold tracking-wide">Empowering Content Creators</h1>
          <p className="text-lg font-light max-w-2xl mx-auto">
            Welcome to TIKTAK, a modern platform designed to support creators, administrators, and users alike with innovative tools and features.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center fade-in-on-scroll opacity-0 translate-y-10 transition duration-700">
            <h2 className="text-4xl font-semibold mb-6">Who We Are</h2>
            <p className="text-lg text-gray-600">
              TIKTAK is an innovative platform designed to revolutionize content creation and management. We offer scalable solutions for video platforms, empowering creators and administrators with cutting-edge tools.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold">Our Key Features</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg p-6 rounded-lg text-center fade-in-on-scroll opacity-0 translate-y-10 transition duration-700">
              <h3 className="text-xl font-semibold mb-3 text-blue-600">User Authentication</h3>
              <p className="text-gray-600">
                Secure and role-based access management using JWT, ensuring personalized navigation and data protection.
              </p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg text-center fade-in-on-scroll opacity-0 translate-y-10 transition duration-700">
              <h3 className="text-xl font-semibold mb-3 text-green-600">Admin Dashboard</h3>
              <p className="text-gray-600">
                Monitor user activity, manage content, and access analytics with our powerful administrative tools.
              </p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg text-center fade-in-on-scroll opacity-0 translate-y-10 transition duration-700">
              <h3 className="text-xl font-semibold mb-3 text-purple-600">Content Scalability</h3>
              <p className="text-gray-600">
                A robust infrastructure ensures long-term reliability as your content and user base grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center fade-in-on-scroll opacity-0 translate-y-10 transition duration-700 mb-12">
            <h2 className="text-4xl font-semibold">Technological Framework</h2>
            <p className="text-gray-600 text-lg">
              Built with modern technologies, TIKTAK is designed to deliver a seamless user experience.
            </p>
          </div>
          <ul className="list-disc list-inside space-y-4 text-gray-600 fade-in-on-scroll opacity-0 translate-y-10 transition duration-700">
            <li>Frontend: React.js, React Router, Context API</li>
            <li>Backend: Node.js, Express.js</li>
            <li>Database: MongoDB</li>
            <li>Cloud Storage: Cloudinary</li>
            <li>Authentication: JSON Web Tokens (JWT)</li>
            <li>Deployment Platforms: Azure (backend), Netlify (frontend)</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>© 2025 TIKTAK. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
