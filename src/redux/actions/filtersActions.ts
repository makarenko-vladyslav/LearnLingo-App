import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getDatabase, ref, get, query } from "firebase/database";
import { app } from "@/../firebaseConfig";
import { setTeachers } from "../slices/teachersSlice";
import { Teacher } from "../teachersTypes";

const database = getDatabase(app);

export const fetchTeachersWithFilters = createAsyncThunk<Teacher[], void, { state: RootState; rejectValue: string }>(
    "filters/fetchTeachersWithFilters",
    async (_, { getState, dispatch, rejectWithValue }) => {
        const { language, maxPrice, level } = getState().filters;
        const dbRef = ref(database, "teachers");
        const teachersQuery = query(dbRef);

        try {
            const snapshot = await get(teachersQuery);
            if (snapshot.exists()) {
                let teachersData = Object.values(snapshot.val()) as Teacher[];

                if (language) {
                    teachersData = teachersData.filter((teacher) => teacher.languages.includes(language));
                }
                if (level) {
                    teachersData = teachersData.filter((teacher) => teacher.levels.includes(level));
                }
                if (maxPrice !== null) {
                    teachersData = teachersData.filter((teacher) => teacher.price_per_hour <= maxPrice);
                }

                dispatch(setTeachers(teachersData));
                return teachersData;
            } else {
                dispatch(setTeachers([]));
                return [];
            }
        } catch (error) {
            console.error("Error fetching teachers:", error);
            dispatch(setTeachers([]));
            return rejectWithValue("Failed to fetch teachers with filters.");
        }
    }
);
