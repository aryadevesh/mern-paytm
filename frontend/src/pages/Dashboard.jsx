import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

export const Dashboard = () => {
    const [balance, setBalance] = useState("Loading...");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            // If no token is found, redirect to signin page
            navigate("/signin");
            return;
        }

        const fetchBalance = async () => {     
            try {
                const response = await axios.get("https://mern-paytm-8wju.onrender.com/api/v1/account/balance", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setBalance(response.data.balance.toLocaleString());
            } catch (error) {
                setBalance("Error fetching balance");
            }
        };
        fetchBalance();
    }, [navigate]);

    return (
        <div>
            <Appbar />
            <div className="m-8">
                <Balance value={balance} />
                <Users />
            </div>
        </div>
    );
};
