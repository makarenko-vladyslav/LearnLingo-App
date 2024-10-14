import { getDatabase, ref, get, query, orderByChild, startAt, endAt } from "firebase/database";
import { app } from "../../firebaseConfig";
import { setTeachers, Teacher } from "../redux/teachersSlice";
import { AppDispatch } from "../redux/store";
import { FiltersState } from "../redux/filtersSlice";

const database = getDatabase(app);

export async function fetchTeachersWithFilters(filters: FiltersState, dispatch: AppDispatch) {
    const dbRef = ref(database, "teachers");
    let teachersQuery = query(dbRef);

    if (filters.priceRange) {
        teachersQuery = query(
            teachersQuery,
            orderByChild("price_per_hour"),
            startAt(filters.priceRange[0]),
            endAt(filters.priceRange[1])
        );
    }

    try {
        const snapshot = await get(teachersQuery);
        if (snapshot.exists()) {
            let teachersData = Object.values(snapshot.val()) as Teacher[];

            if (filters.language) {
                teachersData = teachersData.filter((teacher) => teacher.languages.includes(filters.language!));
            }

            if (filters.level) {
                teachersData = teachersData.filter((teacher) => teacher.levels.includes(filters.level!));
            }

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
