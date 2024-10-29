import TeacherList from "../../components/Teachers/TeacherList";
import Filter from "../../components/Filters/Filter";

export default function Page() {
    return (
        <section className="container px-4 py-8 xl:px-32 xl:py-16 bg-backgroundSection rounded-xl min-h-dvh">
            <Filter />
            <TeacherList />
        </section>
    );
}
