import { ArrowDownIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Siddhi Chikhal",
    role: "Fashion Designer",
    image: "/images/user.webp",
  },
  {
    name: "Brooklyn Simmons",
    role: "Marketing Coordinator",
    image: "/images/user.webp",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Banner Section */}
      <section className="relative h-screen flex items-center justify-center bg-black">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/about-us.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-7xl font-bold mb-6 text-white">About Us</h1>
          <div className="w-24 h-1 bg-[#d1af5d] mx-auto mb-8"></div>
          <p className="text-xl mb-12 text-white max-w-2xl mx-auto">
            We are a team of innovators, dreamers, and doers. Our mission is to
            create exceptional experiences that inspire and transform.
          </p>
          <ArrowDownIcon
            className="text-[#d1af5d] animate-bounce mx-auto"
            size={48}
          />
        </div>
      </section>

      {/* Description Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex text-center items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8 text-[#d1af5d]">
                By profession, I’m a Certified Fraud Examiner. By passion, I’m
                not your run-of-the-mill designer.
              </h2>
              <p className="text-lg mb-6 leading-relaxed">
                While I was studying, all my breaks had me browsing through the
                latest fashion trends, celebrity outfits and instantly
                silhouetting a different look for them. The back pages of my
                accounts books were full of such silhouettes. Finally in 2019,
                when I took a sabbatical, I thought, why not make my passion
                into my new profession ?
              </p>
              <p className="text-lg leading-relaxed">
                I then got certified in Fashion Designing from IITC and
                established my brand SiVa in a year. I was immensely lucky to
                have earned the trust of multiple clients when they chose my
                outfits for their special occasions.
              </p>
              <p className="text-lg leading-relaxed">
                To me, dressing has a direct impact on our mood. Hence, I took
                up designing to ensure that everyone feels confident and happy
                wearing my outifts. Whether our clients have 2k or 20k, I want
                them to feel a sense of comfort when they dress and to know that
                their outfit is a reflection of their personal style. I think we
                all wish to have special outfits to share with the people we
                love. The best part about what we do at SiVa, is we get to
                create unique outfits for families that will surely make
                beautiful memories wearing these, memories that will last a
                lifetime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center text-[#d1af5d]">
            Meet Our Team
          </h2>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {teamMembers.map((member, index) => (
                <div key={index} className="group">
                  <div className="relative aspect-square mb-6 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-[#d1af5d] opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-center justify-center">
                      <p className="text-black text-lg font-bold transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                  <p className="text-[#d1af5d]">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-16 text-[#d1af5d]">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Innovation",
                description: "We push boundaries and embrace new ideas.",
              },
              {
                title: "Collaboration",
                description:
                  "We believe in the power of teamwork and diverse perspectives.",
              },
              {
                title: "Excellence",
                description:
                  "We strive for the highest quality in everything we do.",
              },
            ].map((value, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-[#d1af5d]">
                  {value.title}
                </h3>
                <p className="text-lg">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 bg-[#d1af5d]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-black">
            Join Our Journey
          </h2>
          <p className="text-xl mb-12 text-black">
            Be part of our story and help us shape the future.
          </p>
          <Link
            to="/contact"
            className="bg-black text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-gray-900 transition-colors duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
