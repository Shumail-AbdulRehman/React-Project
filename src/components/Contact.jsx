import React from 'react';
import Navbar from './navbar';

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-4xl w-full bg-white text-black rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-pink-500 to-yellow-500 text-transparent bg-clip-text mb-6">
            Contact Us
          </h1>
          <p className="text-gray-600 text-center mb-8">
            We’d love to hear from you! Whether you have a question about features, pricing, or anything else, our team is ready to help.
          </p>
          <form className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            {/* Email Input */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Your Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            {/* Message Input */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                placeholder="Write your message here..."
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              ></textarea>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
