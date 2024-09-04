import React, { useState, useEffect } from 'react'; // <-- Make sure this line is present
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

export const Dashboard = () => {
    const [balance, setBalance] = useState("Loading...");

    useEffect(() => {
        const fetchBalance = async () => {     
            try {
                const response = await axios.get("https://mern-paytm-8wju.onrender.com/api/v1/account/balance", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setBalance(response.data.balance.toLocaleString());
            } catch (error) {
                setBalance("Error fetching balance");
            }
        };
        fetchBalance();
    }, []);

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
