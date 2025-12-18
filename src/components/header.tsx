import { useState } from "react";
import { Menu, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  {
    name: "Shop",
    href: "/",
    children: [
      "RASA LUXE",
      "RADHYA",
      "VRINDAS",
      "SHYAMA SUNDARI",
      "NITYA",
      "GOPIKAS",
      "NEEL RANGA",
      "KESHAV EDIT",
      "KANHA",
      "LADLI",
      "MORPANKH",
      "BANSURI",
      "LAXMI",
      "VRAJE",
    ],
  },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 h-[85px] w-full border-b bg-white shadow-md">
      <div className="container mx-auto flex items-center h-full">
        {/* Logo */}
        <div className="flex-1 relative">
          <Link to="/" className="flex items-center">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-[22%] md:w-[15%] lg:w-[9%] absolute top-0 m-2 rounded-b-lg"
              style={{
                boxShadow: "#b0adad 0px 5px 6px -6px",
                borderBottom: "1px solid rgb(222 222 222)",
              }}
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex flex-1 items-center justify-end gap-6 lg:pr-5">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.name} className="relative group">
                <Link
                  to={item.href}
                  className={`text-lg hover:text-primary transition-colors ${isActive(item.href)
                      ? "text-[#d1af5d] font-semibold"
                      : ""
                    }`}
                >
                  {item.name}
                </Link>

                {/* Dropdown */}
                <div className="absolute left-0 top-full mt-3 w-56 rounded-md border bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <ul className="py-2">
                    {item.children.map((child) => (
                      <li key={child}>
                        <Link
                          to={`/shop/${child
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#d1af5d]"
                        >
                          {child}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className={`text-lg hover:text-primary transition-colors ${isActive(item.href)
                    ? "text-[#d1af5d] font-semibold"
                    : ""
                  }`}
              >
                {item.name}
              </Link>
            )
          )}

          {/* Phone */}
          <a className="flex items-center gap-2 hover:text-[#d1af5d]">
            <span className="text-xs">
              Call Us Now<br />
              <strong>(+91) 9619521254</strong>
            </span>
          </a>

          {/* Auth */}
          {user ? (
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut size={18} /> Logout
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => navigate("/login")}
              className="flex items-center gap-2"
            >
              <User size={18} /> Login
            </Button>
          )}
        </nav>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right">
            <div className="flex flex-col space-y-6 mt-6">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.name}>
                    <p className="font-semibold mb-2">{item.name}</p>
                    <div className="ml-4 space-y-2">
                      {item.children.map((child) => (
                        <Link
                          key={child}
                          to={`/shop/${child
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          onClick={() => setIsOpen(false)}
                          className="block text-sm hover:text-primary"
                        >
                          {child}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-medium hover:text-primary"
                  >
                    {item.name}
                  </Link>
                )
              )}

              {user ? (
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    navigate("/login");
                    setIsOpen(false);
                  }}
                >
                  Login
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
