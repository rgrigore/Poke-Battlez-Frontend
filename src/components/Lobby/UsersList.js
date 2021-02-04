import React from "react";
import PropTypes from "prop-types";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Badge} from "react-bootstrap";

function UsersList(props) {

	return (
		<ul className="list-group list-group-flush w-100">
			{props.users.map((user, index) => (
				<li key={index+1} className={`list-group-item`} style={{backgroundColor: "rgba(0,0,0,0.3)"}}
					onClick={() => {props.openUser(); props.selectUser(user);}} >
					<img alt={"icon"} src="https://img.icons8.com/bubbles/35/000000/checked-2.png" />
					<Badge variant={"primary"}>{user.name}</Badge>
				</li>
			))}
		</ul>
	);
}

UsersList.propTypes = {
	users: PropTypes.array.isRequired
}

export default UsersList;