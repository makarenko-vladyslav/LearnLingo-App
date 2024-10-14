import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Teacher } from "./teachersSlice";

export interface FiltersState {
    language: string | null;
    priceRange: [number, number] | null;
    level: string | null;
    availableLanguages: string[];
    availableLevels: string[];
    availablePriceRange: [number, number];
}

const initialState: FiltersState = {
    language: null,
    priceRange: null,
    level: null,
    availableLanguages: [],
    availableLevels: [],
    availablePriceRange: [0, 500],
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
        setAvailableFilters: (state, action: PayloadAction<Teacher[]>) => {
            const uniqueLanguages = new Set<string>();
            const uniqueLevels = new Set<string>();
            let minPrice = Infinity;
            let maxPrice = 0;

            action.payload.forEach((teacher) => {
                teacher.languages.forEach((language) => uniqueLanguages.add(language));
                teacher.levels.forEach((level) => uniqueLevels.add(level));
                if (teacher.price_per_hour < minPrice) minPrice = teacher.price_per_hour;
                if (teacher.price_per_hour > maxPrice) maxPrice = teacher.price_per_hour;
            });

            state.availableLanguages = Array.from(uniqueLanguages);
            state.availableLevels = Array.from(uniqueLevels);
            state.availablePriceRange = [minPrice, maxPrice];
        },
        clearFilters: (state) => {
            state.language = null;
            state.priceRange = null;
            state.level = null;
        },
    },
});

export const selectAvailablePriceRange = (state: RootState) => state.filters.availablePriceRange;

export const { setLanguageFilter, setPriceRangeFilter, setLevelFilter, setAvailableFilters, clearFilters } =
    filtersSlice.actions;

export default filtersSlice.reducer;
