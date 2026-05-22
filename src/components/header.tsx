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
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "@/api/api";
import { Category } from "@/@types/types";

const navItems = [
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategory,
    staleTime: 1000 * 60 * 5,
  });

  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const collections: Category[] = data?.packages ?? [];


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
            )}
            <div className="relative group">
              <Link
                to="/"
                className={`text-lg transition-colors hover:text-primary ${isActive("/") ? "text-[#d1af5d] font-semibold" : ""
                  }`}
              >
                Shop
              </Link>

              <div className="absolute left-0 top-full mt-3 w-52 rounded-md border bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <ul className="py-2 max-h-[400px] overflow-y-auto">
                  {isLoading ? (
                    <li className="px-4 py-2 text-sm text-gray-400">
                      Loading collections...
                    </li>
                  ) : (
                    collections.map((collection) => (
                      <li key={collection.id}>
                        <Link
                          to={`/shop/${collection.id}`}
                          className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#d1af5d]"
                        >
                          {collection.name}
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>


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
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="font-medium"
                  >
                    {item.name}
                  </Link>
                )}

                <div>
                  <button
                    type="button"
                    onClick={() => toggleDropdown("Shop")}
                    className="flex w-full items-center justify-between font-semibold"
                  >
                    Shop
                    <span
                      className={`transition-transform ${openDropdown === "Shop" ? "rotate-45" : ""
                        }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>

                  <div
                    className={`ml-4 space-y-2 transition-all ${openDropdown === "Shop"
                      ? "max-h-[500px] opacity-100 py-4"
                      : "max-h-0 opacity-0 overflow-hidden"
                      }`}
                  >
                    {isLoading ? (
                      <span className="text-sm text-gray-400">Loading...</span>
                    ) : (
                      collections.map((collection) => (
                        <Link
                          key={collection.id}
                          to={`/shop/${collection.id}`}
                          onClick={() => setIsOpen(false)}
                          className="block text-sm"
                        >
                          {collection.name}
                        </Link>
                      ))
                    )}
                  </div>
                </div>

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
