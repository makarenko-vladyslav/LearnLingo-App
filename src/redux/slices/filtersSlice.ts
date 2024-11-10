import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Teacher } from "../teachersTypes";
import { fetchTeachersWithFilters } from "../actions/filtersActions";

export interface FiltersState {
    language: string | null;
    maxPrice: number | null;
    level: string | null;
    availableLanguages: string[];
    availableLevels: string[];
    availablePriceOptions: number[];
}

const initialState: FiltersState = {
    language: null,
    maxPrice: null,
    level: null,
    availableLanguages: [],
    availableLevels: [],
    availablePriceOptions: [],
};

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setLanguageFilter: (state, action: PayloadAction<string | null>) => {
            state.language = action.payload;
        },
        setPriceFilter: (state, action: PayloadAction<number | null>) => {
            state.maxPrice = action.payload;
        },
        setLevelFilter: (state, action: PayloadAction<string | null>) => {
            state.level = action.payload;
        },
        setAvailableFilters: (state, action: PayloadAction<Teacher[]>) => {
            const uniqueLanguages = new Set<string>();
            const uniqueLevels = new Set<string>();
            let maxPrice = 0;

            action.payload.forEach((teacher) => {
                teacher.languages.forEach((language) => uniqueLanguages.add(language));
                teacher.levels.forEach((level) => uniqueLevels.add(level));
                if (teacher.price_per_hour > maxPrice) maxPrice = teacher.price_per_hour;
            });

            const roundedMaxPrice = Math.ceil(maxPrice / 10) * 10;
            const priceOptions = [];

            for (let price = 10; price <= roundedMaxPrice; price += 10) {
                priceOptions.push(price);
            }

            state.availableLanguages = Array.from(uniqueLanguages);
            state.availableLevels = Array.from(uniqueLevels);
            state.availablePriceOptions = priceOptions;
        },
        clearFilters: (state) => {
            state.language = null;
            state.maxPrice = null;
            state.level = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTeachersWithFilters.rejected, (state, action) => {
            console.error("Failed to fetch teachers with filters:", action.payload);
        });
    },
});

export const { setLanguageFilter, setPriceFilter, setLevelFilter, setAvailableFilters, clearFilters } =
    filtersSlice.actions;

export default filtersSlice.reducer;
