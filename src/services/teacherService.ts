import { getDatabase, ref, get, query, orderByChild, startAt, endAt } from "firebase/database";
import { app } from "../../firebaseConfig";
import { setTeachers } from "../redux/teachersSlice";
import { AppDispatch } from "../redux/store";
import FiltersState from "../redux/filtersSlice";

const database = getDatabase(app);

// Функція для отримання вчителів з урахуванням фільтрів і збереження в стані
export async function fetchTeachers(filters: FiltersState, dispatch: AppDispatch) {
    const dbRef = ref(database, "teachers");
    let teachersQuery = query(dbRef);

    // Якщо присутні фільтри, додаємо їх до запиту
    if (filters.language) {
        teachersQuery = query(
            teachersQuery,
            orderByChild("languages"),
            startAt(filters.language),
            endAt(filters.language + "\uf8ff")
        );
    }

    if (filters.priceRange) {
        teachersQuery = query(
            teachersQuery,
            orderByChild("price_per_hour"),
            startAt(filters.priceRange[0]),
            endAt(filters.priceRange[1])
        );
    }

    if (filters.level) {
        teachersQuery = query(
            teachersQuery,
            orderByChild("levels"),
            startAt(filters.level),
            endAt(filters.level + "\uf8ff")
        );
    }

    try {
        const snapshot = await get(teachersQuery);
        if (snapshot.exists()) {
            const teachersData = Object.values(snapshot.val());
            dispatch(setTeachers(teachersData));
            return teachersData;
        } else {
            console.log("No teachers found with the applied filters.");
            dispatch(setTeachers([]));
            return null;
        }
    } catch (error) {
        console.error("Error fetching teachers:", error);
        dispatch(setTeachers([]));
        throw error;
    }
}
