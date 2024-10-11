import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Teacher {
    id: string;
    name: string;
    surname: string;
    languages: string[];
    rating: number;
    pricePerHour: number;
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
        addFavoriteTeacher: (state, action: PayloadAction<Teacher>) => {
            state.favoriteTeachers.push(action.payload);
        },
        removeFavoriteTeacher: (state, action: PayloadAction<string>) => {
            state.favoriteTeachers = state.favoriteTeachers.filter((teacher) => teacher.id !== action.payload);
        },
    },
});

export const { setTeachers, addTeacher, addFavoriteTeacher, removeFavoriteTeacher } = teachersSlice.actions;

export default teachersSlice.reducer;
