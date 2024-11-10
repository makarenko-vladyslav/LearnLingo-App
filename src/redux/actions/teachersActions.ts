import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase, ref, set, get, remove } from "firebase/database";
import { auth } from "@/../firebaseConfig";
import { Teacher } from "@/redux/teachersTypes";

const database = getDatabase();

export const fetchFavoriteTeachers = createAsyncThunk<Teacher[], void, { rejectValue: string }>(
    "teachers/fetchFavoriteTeachers",
    async (_, { rejectWithValue }) => {
        const userId = auth.currentUser?.uid;
        if (!userId) return rejectWithValue("User not authenticated");

        const favoriteTeachersRef = ref(database, `favorites/${userId}`);
        try {
            const snapshot = await get(favoriteTeachersRef);
            return snapshot.exists() ? (Object.values(snapshot.val()) as Teacher[]) : [];
        } catch {
            return rejectWithValue("Failed to fetch favorite teachers");
        }
    }
);

export const addFavoriteTeacher = createAsyncThunk<Teacher, Teacher, { rejectValue: string }>(
    "teachers/addFavoriteTeacher",
    async (teacher, { rejectWithValue }) => {
        const userId = auth.currentUser?.uid;
        if (!userId) return rejectWithValue("User not authenticated");

        const teacherRef = ref(database, `favorites/${userId}/${teacher.id}`);
        try {
            await set(teacherRef, teacher);
            return teacher;
        } catch {
            return rejectWithValue("Failed to add favorite teacher");
        }
    }
);

export const removeFavoriteTeacher = createAsyncThunk<string, string, { rejectValue: string }>(
    "teachers/removeFavoriteTeacher",
    async (teacherId, { rejectWithValue }) => {
        const userId = auth.currentUser?.uid;
        if (!userId) return rejectWithValue("User not authenticated");

        const teacherRef = ref(database, `favorites/${userId}/${teacherId}`);
        try {
            await remove(teacherRef);
            return teacherId;
        } catch {
            return rejectWithValue("Failed to remove favorite teacher");
        }
    }
);
