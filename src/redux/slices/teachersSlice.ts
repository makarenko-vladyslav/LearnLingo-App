import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchFavoriteTeachers, addFavoriteTeacher, removeFavoriteTeacher } from "../actions/teachersActions";
import { Teacher } from "../teachersTypes";

interface TeachersState {
    teachers: Teacher[];
    favoriteTeachers: Teacher[];
    loading: boolean;
    error: string | null;
}

const initialState: TeachersState = {
    teachers: [],
    favoriteTeachers: [],
    loading: false,
    error: null,
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
        clearFavoriteTeachers: (state) => {
            state.favoriteTeachers = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavoriteTeachers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFavoriteTeachers.fulfilled, (state, action) => {
                state.favoriteTeachers = action.payload;
                state.loading = false;
            })
            .addCase(fetchFavoriteTeachers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addFavoriteTeacher.fulfilled, (state, action) => {
                state.favoriteTeachers.push(action.payload);
            })
            .addCase(addFavoriteTeacher.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(removeFavoriteTeacher.fulfilled, (state, action) => {
                state.favoriteTeachers = state.favoriteTeachers.filter((teacher) => teacher.id !== action.payload);
            })
            .addCase(removeFavoriteTeacher.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const { setTeachers, addTeacher, clearFavoriteTeachers } = teachersSlice.actions;

export default teachersSlice.reducer;
