"use client";

import TeacherList from "../../components/TeacherList";
import Filter from "../../components/Filters/Filter";
import { useSelector } from "react-redux";
import { selectAllTeachers } from "../../redux/teachersSlice";

export default function Page() {
    const allTeachers = useSelector(selectAllTeachers);

    return (
        <section className="container px-4 py-8 xl:px-32 xl:py-16 bg-backgroundSection rounded-xl min-h-dvh">
            <Filter />
            <TeacherList teachers={allTeachers} />
        </section>
    );
}
