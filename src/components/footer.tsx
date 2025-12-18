import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="w-full bg-white py-12 border-t">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {/* Quick Links */}
          <div className="space-y-4 lg:pl-5">
            <h3 className="text-lg font-semibold">About Us</h3>
            <ul className="space-y-2">
              <li>
                By profession, I’m a Certified Fraud Examiner. By passion, I’m
                not your run-of-the-mill designer. <br />
                <small>
                  While I was studying, all my breaks had me browsing through
                  the latest fashion trends, celebrity outfits and instantly
                  silhouetting a different look for them. The back pages of my
                  accounts books were full of such silhouettes. Finally in 2019,
                  when I took a sabbatical, I thought, why not make my passion
                  into my new profession ?
                </small>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:underline">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Address */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Our Address</h3>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Address:</span> Motilal Nagar 1,
                Goregaon West, Mumbai-400062
              </p>
              <div>
                <p className="font-medium">Hours:</p>
                <p>9.30am – 6.30pm Monday to Saturday</p>
              </div>
            </div>
          </div>

          {/* Contact us */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact us</h3>
            <div className="space-y-2">
              {/* <p>Find a location nearest you.</p> */}
              {/* <Link to="/stores" className="text-primary hover:underline">
              See Our Stores
            </Link> */}
              <p className="pt-2">
                <a href="tel:+919619521254">+91 9619521254</a>
              </p>

              <p>
                <a href="mailto:sivafshionsworld@gmail.com">
                  sivafshionsworld@gmail.com
                </a>
              </p>

              <div className="flex space-x-4 pt-4">
                <Link to="#" className="hover:text-primary">
                  <Facebook className="h-6 w-6" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link to="#" className="hover:text-primary">
                  <Instagram className="h-6 w-6" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link to="#" className="hover:text-primary">
                  <Youtube className="h-6 w-6" />
                  <span className="sr-only">YouTube</span>
                </Link>
                <Link to="#" className="hover:text-primary">
                  <Twitter className="h-6 w-6" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="w-full py-4 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-300">
            <p>&copy; {currentYear} Siva Fashion All Rights Reserved.</p>
            <p className="mt-2 sm:mt-0 flex items-center">
              Design & Developed By :{" "}
              <a
                href="https://www.digitalfueled.com/"
                target="_blank"
                className="text-black no-underline"
              >
                Digital Fueled
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
