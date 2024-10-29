import TeacherList from "../../components/Teachers/TeacherList";

export default function FavoritesPage() {
    return (
        <section className="container px-4 py-8 xl:px-32 xl:py-16 bg-backgroundSection rounded-xl min-h-dvh">
            <TeacherList favorites={true} />
        </section>
    );
}
