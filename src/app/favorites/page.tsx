"use client";

import { useSelector } from "react-redux";
import { selectFavoriteTeachers } from "../../redux/teachersSlice";

export default function FavoritesPage() {
    const favoriteTeachers = useSelector(selectFavoriteTeachers);

    return (
        <section className="container mx-auto">
            <h1 className="text-2xl font-medium my-4">Favorites</h1>

            {favoriteTeachers.length === 0 ? (
                <p>No favorite teachers yet.</p>
            ) : (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteTeachers.map((teacher) => (
                        <li
                            key={teacher.id}
                            className="border p-4 rounded-lg shadow">
                            <h2 className="text-xl font-semibold">
                                {teacher.name} {teacher.surname}
                            </h2>
                            <p>Languages: {teacher.languages.join(", ")}</p>
                            <p>Rating: {teacher.rating}/5</p>
                            <p>Price per Hour: ${teacher.pricePerHour}</p>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
