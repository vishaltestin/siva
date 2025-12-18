import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import MainLayout from "@/layouts/MainLayout";

import Home from "@/pages/Home";
import AboutPage from "@/pages/about";
import ContactPage from "@/pages/contact";
import Login from "@/pages/login";
import NoAccess from "@/pages/no-access";
import CollectionPage from "@/pages/collection";
import ProtectedCollection from "@/components/protected-collection";
import ProductDetailPage from "./pages/product-detail-page";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Layout Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Protected Collection */}
            <Route
              path="/shop/:slug"
              element={
                <ProtectedCollection>
                  <CollectionPage />
                </ProtectedCollection>
              }
            />
            <Route
              path="/shop/:collectionSlug/:id"
              element={
                <ProtectedCollection>
                  <ProductDetailPage />
                </ProtectedCollection>
              }
            />
          </Route>

          {/* Standalone Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/no-access" element={<NoAccess />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
