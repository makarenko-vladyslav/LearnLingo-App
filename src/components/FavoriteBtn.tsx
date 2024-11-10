"use client";

import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AppDispatch } from "../redux/store";
import { Teacher } from "../redux/teachersTypes";
import { addFavoriteTeacher, removeFavoriteTeacher } from "../redux/actions/teachersActions";
import { selectFavoriteTeachers, selectIsAuthenticated } from "../redux/selectors";

interface FavoriteBtnProps {
    teacher?: Teacher;
}

export default function FavoriteBtn({ teacher }: FavoriteBtnProps) {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const favoriteTeachers = useSelector(selectFavoriteTeachers);

    const isFavorited = teacher ? favoriteTeachers.some((favTeacher) => favTeacher.id === teacher.id) : false;

    const handleClick = () => {
        if (!isAuthenticated) {
            toast.warning("Please log in to save teacher to your favorites", {
                position: "top-center",
                autoClose: 4000,
            });
            return;
        }

        if (teacher) {
            if (isFavorited) {
                dispatch(removeFavoriteTeacher(teacher.id));
            } else {
                dispatch(addFavoriteTeacher(teacher));
            }
        } else {
            router.push("/favorites");
        }
    };

    return (
        <button
            className={`flex justify-center items-center gap-2 p-2 font-medium ${
                teacher ? "absolute top-4 right-4" : ""
            }`}
            onClick={handleClick}>
            {teacher ? (
                isFavorited ? (
                    <FaHeart className="text-buttonHover text-2xl hover:text-primary transition-colors duration-150" />
                ) : (
                    <FaRegHeart className="text-text text-2xl hover:text-buttonHover transition-colors duration-150" />
                )
            ) : favoriteTeachers.length > 0 ? (
                <FaHeart className="text-buttonHover text-2xl hover:text-primary transition-colors duration-150" />
            ) : (
                <FaRegHeart className="text-text text-2xl hover:text-buttonHover transition-colors duration-150" />
            )}
        </button>
    );
}
