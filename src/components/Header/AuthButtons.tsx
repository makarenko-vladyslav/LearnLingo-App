import { FiLogIn } from "react-icons/fi";
import FavoriteBtn from "../FavoriteBtn";

interface AuthButtonsProps {
    isAuthenticated: boolean;
    handleOpenModal: (mode: "login" | "register") => void;
    handleOnLogout: () => void;
    burger?: boolean;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({
    isAuthenticated,
    handleOpenModal,
    handleOnLogout,
    burger = false,
}) => (
    <div className={`${burger ? "flex flex-col gap-4 mt-4" : "lg:flex hidden"}`}>
        {isAuthenticated ? (
            <>
                {!burger && <FavoriteBtn />}

                <button
                    onClick={handleOnLogout}
                    className={`${
                        burger
                            ? "px-6 py-3 bg-primary text-background font-medium rounded-lg shadow-md"
                            : "ml-4 bg-text text-background font-medium px-10 py-3.5 rounded-xl hover:text-text hover:bg-buttonHover transition-all duration-200 shadow-lg"
                    }`}>
                    Log out
                </button>
            </>
        ) : (
            <>
                <button
                    onClick={() => handleOpenModal("login")}
                    className={`${
                        burger
                            ? "flex justify-center items-center gap-2 px-6 py-3 rounded-xl text-background font-medium bg-primary hover:bg-text hover:text-primary transition-colors duration-200"
                            : "flex items-center gap-2 px-2 pr-4 py-3 font-medium hover:text-buttonHover transition-colors duration-200"
                    }`}>
                    <FiLogIn className={`text-xl ${burger ? "text-inherit" : "text-primary"}`} />
                    Log in
                </button>
                <button
                    onClick={() => handleOpenModal("register")}
                    className={`${
                        burger
                            ? "px-6 py-3 bg-text text-background font-medium rounded-xl shadow-md hover:bg-primary hover:text-text"
                            : "bg-text text-background font-medium px-10 py-3.5 rounded-xl hover:text-text hover:bg-buttonHover transition-all duration-200 shadow-lg"
                    }`}>
                    Registration
                </button>
            </>
        )}
    </div>
);

export default AuthButtons;
