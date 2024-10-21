"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectFavoriteTeachers } from "../../redux/teachersSlice";
import { selectAuthLoading, selectIsAuthenticated } from "../../redux/authSlice";
import TeacherList from "../../components/TeacherList";

export default function FavoritesPage() {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const loading = useSelector(selectAuthLoading);
    const router = useRouter();

    const favoriteTeachers = useSelector(selectFavoriteTeachers);

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push("/");
        }
    }, [loading, isAuthenticated, router]);

    return (
        <section className="container px-32 py-16 bg-backgroundSection rounded-xl min-h-screen">
            <TeacherList teachers={favoriteTeachers} />
        </section>
    );
}
