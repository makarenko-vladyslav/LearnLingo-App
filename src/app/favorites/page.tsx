"use client";

import { useSelector } from "react-redux";
import { selectFavoriteTeachers } from "../../redux/teachersSlice";
import TeacherList from "../../components/TeacherList";

export default function FavoritesPage() {
    const favoriteTeachers = useSelector(selectFavoriteTeachers);

    return (
        <section className="container px-32 py-16 bg-backgroundSection rounded-xl min-h-screen">
            <TeacherList teachers={favoriteTeachers} />
        </section>
    );
}
