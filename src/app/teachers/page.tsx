import TeacherList from "../../components/TeacherList";
import Filter from "../../components/Filters/Filter";

export default function Page() {
    return (
        <section className="container px-32 py-16 bg-backgroundSection rounded-xl ">
            <Filter />
            <TeacherList />
        </section>
    );
}
