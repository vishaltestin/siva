import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="border-t mt-6 md:mt-8 lg:mt-16 bg-white pt-12">
        {/* ✅ CONTAINER ADDED */}
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About Us */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">About Us</h3>
              <p className="text-sm leading-relaxed">
                By profession, I’m a Certified Fraud Examiner. By passion, I’m
                not your run-of-the-mill designer.
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                While I was studying, all my breaks had me browsing through the
                latest fashion trends, celebrity outfits and instantly
                silhouetting a different look for them. The back pages of my
                accounts books were full of such silhouettes. Finally in 2019,
                when I took a sabbatical, I thought — why not make my passion
                into my new profession?
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-sm">
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

            {/* Address */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Our Address</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  Motilal Nagar 1, Goregaon West, Mumbai – 400062
                </p>
                <div>
                  <p className="font-medium">Hours:</p>
                  <p>9:30am – 6:30pm (Mon–Sat)</p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Us</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <a href="tel:+919619521254" className="hover:underline">
                    +91 96195 21254
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:sivafshionsworld@gmail.com"
                    className="hover:underline"
                  >
                    sivafshionsworld@gmail.com
                  </a>
                </p>

                <div className="flex space-x-4 pt-4">
                  <Link to="#" className="hover:text-primary">
                    <Facebook className="h-5 w-5" />
                  </Link>
                  <Link to="#" className="hover:text-primary">
                    <Instagram className="h-5 w-5" />
                  </Link>
                  <Link to="#" className="hover:text-primary">
                    <Youtube className="h-5 w-5" />
                  </Link>
                  <Link to="#" className="hover:text-primary">
                    <Twitter className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Bar */}
      <div className="w-full py-4 bg-gray-100 mt-12">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
            <p>&copy; {currentYear} Siva Fashion. All Rights Reserved.</p>
            <p className="mt-2 sm:mt-0">
              Design & Developed By{" "}
              <a
                href="https://www.digitalfueled.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-black hover:underline"
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
