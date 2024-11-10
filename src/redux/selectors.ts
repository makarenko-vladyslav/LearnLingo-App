import { RootState } from "./store";

// Teachers selectors
export const selectAllTeachers = (state: RootState) => state.teachers.teachers;
export const selectFavoriteTeachers = (state: RootState) => state.teachers.favoriteTeachers;
export const selectTeacherById = (state: RootState, teacherId: string) =>
    state.teachers.teachers.find((teacher) => teacher.id === teacherId);

// Filters selectors
export const selectLevel = (state: RootState) => state.filters.level;
export const selectFilters = (state: RootState) => state.filters;
export const selectAvailableLanguages = (state: RootState) => state.filters.availableLanguages;
export const selectAvailableLevels = (state: RootState) => state.filters.availableLevels;
export const selectAvailablePriceOptions = (state: RootState) => state.filters.availablePriceOptions;

// Auth selectors
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectUser = (state: RootState) => state.auth.user;
