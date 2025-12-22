import { useState } from "react";
import { MapPin, Phone, Mail, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the form data to your server
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Banner Section */}
      <section className="relative h-64 md:h-80 flex items-center justify-center bg-black">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/contact-us.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            Contact Us
          </h1>
          <div className="w-24 h-1 bg-[#d1af5d] mx-auto"></div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-16 px-4 md:py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-[#000]">
              Get in Touch
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d1af5d]"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d1af5d]"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d1af5d]"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-[#d1af5d] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#c09c4f] transition-colors duration-300 flex items-center"
              >
                Send Message
                <Send className="ml-2 h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-[#000]">
              Contact Information
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="text-[#d1af5d] h-6 w-6 mt-1 mr-4" />
                <div>
                  <h3 className="font-semibold mb-1">Address</h3>
                  <p>Motilal Nagar 1, Goregaon West, Mumbai- 400062</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="text-[#d1af5d] h-6 w-6 mt-1 mr-4" />
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p>
                    Ms. Siddhi Chikhal,
                    <a href="tel:+919619521254">+91 9619521254</a>
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="text-[#d1af5d] h-6 w-6 mt-1 mr-4" />
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p>
                    <a href="mailto:sivafshionsworld@gmail.com">
                      sivafshionsworld@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4">Find Us</h3>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2965.0824050173574!2d-93.63905729999999!3d41.998507000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sWebFilings%2C+University+Boulevard%2C+Ames%2C+IA!5e0!3m2!1sen!2sus!4v1390839289319"
                  width="100%"
                  height="200"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
