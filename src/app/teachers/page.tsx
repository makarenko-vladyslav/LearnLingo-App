"use client";

import TeacherList from "../../components/TeacherList";
import Filter from "../../components/Filters/Filter";
import { useSelector } from "react-redux";
import { selectAllTeachers } from "../../redux/teachersSlice";

export default function Page() {
    const allTeachers = useSelector(selectAllTeachers);

    return (
        <section className="container px-32 py-16 bg-backgroundSection rounded-xl min-h-dvh">
            <Filter />
            <TeacherList teachers={allTeachers} />
        </section>
    );
}
