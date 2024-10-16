import { getDatabase, ref, set, get, remove } from "firebase/database";
import { auth } from "../../firebaseConfig";
import { setFavoriteTeachers, Teacher } from "../redux/teachersSlice";
import { AppDispatch } from "../redux/store";

const database = getDatabase();

export const addFavoriteTeacher = async (teacher: Teacher) => {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User not authenticated");

    const teacherRef = ref(database, `favorites/${userId}/${teacher.id}`);
    await set(teacherRef, teacher);
};

export const removeFavoriteTeacher = async (teacherId: string) => {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User not authenticated");

    const teacherRef = ref(database, `favorites/${userId}/${teacherId}`);
    await remove(teacherRef);
};

export const fetchFavoriteTeachers = async (): Promise<Teacher[]> => {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User not authenticated");

    const favoriteTeachersRef = ref(database, `favorites/${userId}`);
    const snapshot = await get(favoriteTeachersRef);
    return snapshot.exists() ? (Object.values(snapshot.val()) as Teacher[]) : [];
};

export const loadFavoriteTeachers = async (dispatch: AppDispatch) => {
    try {
        const favoriteTeachers: Teacher[] = await fetchFavoriteTeachers();

        dispatch(setFavoriteTeachers(favoriteTeachers));
    } catch (error) {
        console.error("Failed to load favorite teachers:", error);
    }
};
