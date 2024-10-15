import TeacherList from "../../components/TeacherList";
import Filter from "../../components/Filters/Filter";

export default function Page() {
    return (
        <section className="bg-backgroundSection p-16 rounded-xl">
            <Filter />
            <TeacherList />
        </section>
    );
}
