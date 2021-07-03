import React, { useContext, useState } from 'react';
import { userContext } from '../../App';

const Dashboard = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [isDisplay, setIsDisplay] = useState(false);
    const [user, setUser] = useState([]);
    const [updateData, setUpdateData] = useState({
        name: user.name,
        dob: user.dob,
        profession: user.profession
    });

    // handle update button
    const handleUpdate = () => {
        const email = loggedInUser.email;
        if (!isDisplay) {
            fetch(`http://localhost:5000/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: loggedInUser.email})
            })
                .then(res => res.json())
                .then(data => setUser(data[0]))
        }

        setIsDisplay(!isDisplay);
    }

    // handle delete button
    const handleDelete = () => {
        fetch("http://localhost:5000/deleteUser", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setLoggedInUser({});
                }
            })
    }

    // handle logout button
    const handleLogout = () => {
        setLoggedInUser({});
    }

    // handle user input
    const handleBlur = (e) => {
        const newUser = {...user};
        newUser[e.target.name] = e.target.value;
        setUpdateData(newUser);
    }

    // update user information
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:5000/updateUser", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        })
        .then(res => res.json())
        .then(data => {
            if(data) {
                setIsDisplay(!isDisplay);
                alert("Update successful");
            }
        })
    }

    return (
        <>
            <div className="flex justify-center">
                <div className="text-center md:w-1/4">
                    <button onClick={handleUpdate} className="mt-3 w-full bg-green-500 text-white py-2 font-bold">Update Information</button>
                    <button onClick={handleDelete} className="mt-3 w-full bg-green-500 text-white py-2 font-bold">Delete Account</button>
                    <button onClick={handleLogout} className="mt-3 w-full bg-green-500 text-white py-2 font-bold">Log out</button>
                </div>
            </div>
            {
                isDisplay &&
                <div className="flex justify-center">
                    <div className="md:w-1/3 mt-16">
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-wrap -mx-3 mb-4">
                                <div className="w-full px-3">
                                    <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">Name <span className="text-red-600">*</span></label>
                                    <input id="name" name="name" onBlur={handleBlur} type="text" className="form-input w-full text-gray-800" defaultValue={user.name} placeholder="Enter your name" required />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-4">
                                <div className="w-full px-3">
                                    <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="dob">Date of Birth <span className="text-red-600">*</span></label>
                                    <input id="dob" name="dob" onBlur={handleBlur} type="date" className="form-input w-full text-gray-800" defaultValue={user.dob} placeholder="Enter date of birth" required />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-4">
                                <div className="w-full px-3">
                                    <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="profession">Profession <span className="text-red-600">*</span></label>
                                    <input id="profession" onBlur={handleBlur} name="profession" type="text" className="form-input w-full text-gray-800" defaultValue={user.profession} placeholder="Enter your profession" required />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mt-6">
                                <div className="w-full px-3">
                                    <button type="submit" className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    );
};

export default Dashboard;