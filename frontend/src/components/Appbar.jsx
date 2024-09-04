import { useNavigate } from "react-router-dom";

export const Appbar = () => {
    const navigate = useNavigate();

    const handleSignout = () => {
        // Remove the token from localStorage
        localStorage.removeItem("token");

        // Redirect to the login page
        navigate("/signin");
    };

    return (
        <div className="shadow h-14 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-4">
                PayTM App
            </div>
            <div className="flex items-center">
                <div className="mr-4">
                    Hello
                </div>
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center text-xl mr-4">
                    U
                </div>
                <button
                    onClick={handleSignout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-4"
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
};
