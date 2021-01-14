import React from "react";
import PropTypes from "prop-types";
import 'bootstrap/dist/css/bootstrap.min.css';

function UsersList(props) {
    const users = ["Marius", "Razvan", "Dani"];

    return (
        <ul className="list-group list-group-flush w-100">
            {props.users.map((user, index) => (
                <li key={index+1} className={`list-group-item`}>
                    {user}
                </li>
            ))}
        </ul>
    );
}

UsersList.propTypes = {
    users: PropTypes.array.isRequired
}

export default UsersList;