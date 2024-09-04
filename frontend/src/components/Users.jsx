import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    
    useEffect(() => {
        // Decode token to get the logged-in user's ID
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            setLoggedInUserId(decodedToken.userId); // Assuming the token has the userId field
        }
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => {
            axios.get("https://mern-paytm-8wju.onrender.com/api/v1/user/bulk?filter=" + filter, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
                .then(response => {
                    // Filter out the logged-in user from the list
                    const filteredUsers = response.data.user.filter(user => user._id !== loggedInUserId);
                    setUsers(filteredUsers);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        }, 1000);
        // Cleanup the timeout if the effect is called again before the delay
        return () => {
            clearTimeout(handler);
        };
    }, [filter, loggedInUserId]);
    

    return (
        <>
            <div className="font-bold mt-6 text-lg">Users</div>
            <div className="my-2">
                <input 
                    onChange={(e) => setFilter(e.target.value)}
                    type="text" 
                    placeholder="Search users..." 
                    className="w-full px-2 py-1 border rounded border-slate-200"
                />
            </div>
            <div>
                {users.map(user => <User key={user._id} user={user} />)}
            </div>
        </>
    );
}

function User({ user }) {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstname[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div>{user.firstname} {user.lastname}</div>
                </div>
            </div>

            <div className="flex flex-col justify-center h-full">
                <Button 
                    onClick={() => navigate("/send?id=" + user._id + "&name=" + user.firstname)} 
                    label={"Send Money"} 
                />
            </div>
        </div>
    );
}
