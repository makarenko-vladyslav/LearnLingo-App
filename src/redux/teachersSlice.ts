import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { addFavoriteTeacher, removeFavoriteTeacher } from "../services/favoritesService";

export interface Review {
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

        setFavoriteTeachers: (state, action: PayloadAction<Teacher[]>) => {
            state.favoriteTeachers = action.payload;
        },

        clearFavoriteTeachers: (state) => {
            state.favoriteTeachers = [];
        },

        toggleFavoriteTeacher: (state, action: PayloadAction<Teacher>) => {
            const teacher = action.payload;
            const isFavorite = state.favoriteTeachers.some((favTeacher) => favTeacher.id === teacher.id);

            if (isFavorite) {
                state.favoriteTeachers = state.favoriteTeachers.filter((favTeacher) => favTeacher.id !== teacher.id);
                removeFavoriteTeacher(teacher.id);
            } else {
                state.favoriteTeachers.push(teacher);
                addFavoriteTeacher(teacher);
            }
        },
    },
});

export const selectAllTeachers = (state: RootState) => state.teachers.teachers;
export const selectFavoriteTeachers = (state: RootState) => state.teachers.favoriteTeachers;
export const selectTeacherById = (state: RootState, teacherId: string) =>
    state.teachers.teachers.find((teacher) => teacher.id === teacherId);

export const { setTeachers, addTeacher, toggleFavoriteTeacher, setFavoriteTeachers, clearFavoriteTeachers } =
    teachersSlice.actions;

export default teachersSlice.reducer;
