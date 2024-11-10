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
