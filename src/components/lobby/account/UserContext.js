import React, {createContext, useState} from "react";

export const UserContext = createContext({
    user: {id: -1, username: "Poke Baller"},
    setUser: () => {}
});

export const UserContextProvider = (props) => {

    const [id, setId] = useState(-1);
    const [username, setUsername] = useState("Poke Baller");

    const setUser = user => {
        setId(user.id);
        setUsername(user.username);
    }

    return (
        <UserContext.Provider value={{user: {id, username }, setUser}} >
            {props.children}
        </UserContext.Provider>
    );
}