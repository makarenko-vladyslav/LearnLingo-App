import React from "react";
import { FaStar } from "react-icons/fa6";
import { Review } from "../../redux/teachersTypes";

interface TeacherReviewsProps {
    reviews: Review[];
}

const TeacherReviews: React.FC<TeacherReviewsProps> = ({ reviews }) => (
    <>
        {reviews.length > 0 ? (
            <ul className="flex flex-col gap-8 mb-8">
                {reviews.map((review, index) => (
                    <li
                        key={index}
                        className="flex flex-col">
                        <div className="flex gap-3">
                            <span className="w-12 h-12 rounded-full bg-secondary flex self-start justify-center items-center text-xl text-text">
                                {review.reviewer_name[0].toUpperCase()}
                            </span>
                            <div className="name_rating flex self-end">
                                <div className="flex flex-col justify-center mb-4">
                                    <p className="mb-0.5 text-textGray leading-normal">{review.reviewer_name}</p>
                                    <span className="flex items-center gap-2">
                                        <FaStar className="text-primary" />
                                        {review.reviewer_rating.toFixed(1)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <p className="leading-normal">{review.comment}</p>
                    </li>
                ))}
            </ul>
        ) : (
            <p>Teacher doesn&apos;t have any reviews.</p>
        )}
    </>
);

export default TeacherReviews;
