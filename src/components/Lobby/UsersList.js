import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function UsersList() {
    const users = ["Marius", "Razvan", "Dani"];

    return (
        <ul className="list-group list-group-flush w-100">
            {users.map((user, index) => (
                <li key={index+1} className={`list-group-item`}>
                    {user}
                </li>
            ))}
        </ul>
    );
}

export default UsersList;