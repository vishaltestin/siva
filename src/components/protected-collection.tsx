import { Navigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedCollection({
    children,
}: {
    children: JSX.Element;
}) {
    const { user, loading } = useAuth();
    const params = useParams();
    const location = useLocation();

    if (loading) {
        return null;
    }

    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location.pathname }}
            />
        );
    }

    const rawSlug = params.slug || params.collectionSlug;
    const normalize = (value: string) =>
        value.toLowerCase().replace(/\s+/g, "-");

    const userCollections = user.collections.map(normalize);
    const slug = rawSlug ? normalize(rawSlug) : null;

    if (slug && !userCollections.includes(slug)) {
        return <Navigate to="/no-access" replace />;
    }

    return children;
}
