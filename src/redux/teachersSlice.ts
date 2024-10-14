import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface Review {
    reviewer_name: string;
    reviewer_rating: number;
    comment: string;
}

export interface Teacher {
    id: string;
    name: string;
    surname: string;
    languages: string[];
    rating: number;
    price_per_hour: number;
    lessons_done: number;
    avatar_url: string;
    lesson_info: string;
    conditions: string[];
    experience: string;
    reviews: Review[];
    levels: string[];
}

interface TeachersState {
    teachers: Teacher[];
    favoriteTeachers: Teacher[];
}

const initialState: TeachersState = {
    teachers: [],
    favoriteTeachers: [],
};

const teachersSlice = createSlice({
    name: "teachers",
    initialState,
    reducers: {
        setTeachers: (state, action: PayloadAction<Teacher[]>) => {
            state.teachers = action.payload;
        },
        addTeacher: (state, action: PayloadAction<Teacher>) => {
            state.teachers.push(action.payload);
        },
        toggleFavoriteTeacher: (state, action: PayloadAction<string>) => {
            const teacherId = action.payload;
            const isFavorite = state.favoriteTeachers.some((teacher) => teacher.id === teacherId);

            if (isFavorite) {
                state.favoriteTeachers = state.favoriteTeachers.filter((teacher) => teacher.id !== teacherId);
            } else {
                const teacher = state.teachers.find((teacher) => teacher.id === teacherId);
                if (teacher) {
                    state.favoriteTeachers.push(teacher);
                }
            }
        },
    },
});

export const selectAllTeachers = (state: RootState) => state.teachers.teachers;
export const selectFavoriteTeachers = (state: RootState) => state.teachers.favoriteTeachers;
export const selectTeacherById = (state: RootState, teacherId: string) =>
    state.teachers.teachers.find((teacher) => teacher.id === teacherId);

export const { setTeachers, addTeacher, toggleFavoriteTeacher } = teachersSlice.actions;

export default teachersSlice.reducer;
