import { Navigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "@/api/api";

export default function ProtectedCollection({
    children,
}: {
    children: JSX.Element;
}) {
    const { user, loading } = useAuth();
    const { categoryId } = useParams();
    const location = useLocation();

    const { data, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategory,
    });

    if (loading || isLoading) return null;

    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location.pathname }}
            />
        );
    }

    const collection = data?.packages.find(
        (c) => c.id === categoryId
    );

    if (!collection) {
        return <Navigate to="/404" replace />;
    }

    if (collection.user_id !== user.user_id) {
        return <Navigate to="/no-access" replace />;
    }

    return children;
}
