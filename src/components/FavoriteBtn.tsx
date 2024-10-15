import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { selectFavoriteTeachers, toggleFavoriteTeacher } from "../redux/teachersSlice";

interface FavoriteBtnProps {
    teacherId?: string;
}

export default function FavoriteBtn({ teacherId }: FavoriteBtnProps) {
    const dispatch = useDispatch();
    const router = useRouter();

    const favoriteTeachers = useSelector(selectFavoriteTeachers);

    const isFavorited = teacherId ? favoriteTeachers.some((favTeacher) => favTeacher.id === teacherId) : false;

    const handleClick = () => {
        if (teacherId) {
            dispatch(toggleFavoriteTeacher(teacherId));
        } else {
            router.push("/favorites");
        }
    };

    return (
        <button
            className="flex justify-center items-center gap-2 font-bold"
            onClick={handleClick}>
            {teacherId ? (
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
