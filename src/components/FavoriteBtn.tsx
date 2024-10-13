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
            className="flex justify-center items-center gap-2 px-2 py-3 font-bold hover:text-buttonHover transition-colors duration-200"
            onClick={handleClick}>
            {teacherId ? (
                isFavorited ? (
                    <FaHeart className="text-primary text-2xl" />
                ) : (
                    <FaRegHeart className="text-text text-2xl" />
                )
            ) : favoriteTeachers.length > 0 ? (
                <FaHeart className="text-primary text-2xl mr-4" />
            ) : (
                <FaRegHeart className="text-black text-2xl mr-4" />
            )}
        </button>
    );
}
