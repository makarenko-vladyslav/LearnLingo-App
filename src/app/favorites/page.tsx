"use client";

import { useSelector } from "react-redux";
import { selectFavoriteTeachers } from "../../redux/teachersSlice";
import TeacherList from "../../components/TeacherList";

export default function FavoritesPage() {
    const favoriteTeachers = useSelector(selectFavoriteTeachers);

    return (
        <section className="container px-4 py-8 xl:px-32 xl:py-16 bg-backgroundSection rounded-xl min-h-dvh">
            <TeacherList teachers={favoriteTeachers} />
        </section>
    );
}
