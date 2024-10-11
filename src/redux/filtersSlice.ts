import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
    language: string | null;
    priceRange: [number, number] | null;
    level: string | null;
}

const initialState: FiltersState = {
    language: null,
    priceRange: null,
    level: null,
};

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setLanguageFilter: (state, action: PayloadAction<string | null>) => {
            state.language = action.payload;
        },
        setPriceRangeFilter: (state, action: PayloadAction<[number, number] | null>) => {
            state.priceRange = action.payload;
        },
        setLevelFilter: (state, action: PayloadAction<string | null>) => {
            state.level = action.payload;
        },
        clearFilters: (state) => {
            state.language = null;
            state.priceRange = null;
        },
    },
});

export const { setLanguageFilter, setPriceRangeFilter, clearFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
