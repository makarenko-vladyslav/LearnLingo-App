import TeacherList from "../../components/TeacherList";
import Filter from "../../components/Filters/Filter";

export default function Page() {
    return (
        <section className="bg-backgroundSection py-24 px-[7rem] rounded-xl">
            <Filter />
            <TeacherList />
        </section>
    );
}
