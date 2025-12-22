import { Outlet } from "react-router-dom";
import { Header } from "@/components/header";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";

export default function MainLayout() {
    return (
        <>
            <Header />
            <ScrollToTop />
            <main className="min-h-[70vh]">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
