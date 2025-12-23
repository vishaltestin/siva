import { useState } from "react";
import { Menu, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 h-[85px] w-full border-b bg-white shadow-md">
      {/* ✅ CONTAINER ADDED HERE */}
      <div className="custom-container h-full">
        <div className="flex items-center h-full">
          {/* Logo */}
          <div className="flex-1 relative h-full">
            <Link to="/" className="flex items-center h-full">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="sm:h-full rounded-b-lg h-16"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex flex-1 items-center justify-end gap-6">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.name} className="relative group">
                  <Link
                    to={item.href}
                    className={`text-lg transition-colors hover:text-primary ${isActive(item.href)
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
                  className={`text-lg transition-colors hover:text-primary ${isActive(item.href)
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
              <span className="text-xs leading-tight">
                Call Us Now
                <br />
                <strong>(+91) 9619521254</strong>
              </span>
            </a>
          </nav>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden border-none size-8 [&_svg]:size-7"
              >
                <Menu strokeWidth={1} />
              </Button>
            </SheetTrigger>

            <SheetContent side="right">
              <SheetTitle className="hidden">Menu</SheetTitle>

              <div className="flex flex-col space-y-4 mt-10">
                {navItems.map((item) =>
                  item.children ? (
                    <div key={item.name}>
                      <button
                        type="button"
                        onClick={() => toggleDropdown(item.name)}
                        className="flex w-full items-center justify-between font-semibold"
                      >
                        {item.name}
                        <span
                          className={`transition-transform ${openDropdown === item.name ? "rotate-45" : ""
                            }`}
                        >
                          <Plus className="h-4 w-4" />
                        </span>
                      </button>

                      <div
                        className={`ml-4 space-y-2 transition-all ${openDropdown === item.name
                          ? "max-h-[500px] opacity-100 py-4"
                          : "max-h-0 opacity-0 overflow-hidden"
                          }`}
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child}
                            to={`/shop/${child
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                            onClick={() => setIsOpen(false)}
                            className="block"
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
                      className="font-medium"
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
      </div>
    </header>
  );
}
