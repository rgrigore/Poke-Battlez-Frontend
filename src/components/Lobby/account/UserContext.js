import React, {useState, createContext} from "react";

export const UserContext = createContext({
    user: {id: -1, username: "Poke Baller"},
    setUser: () => {}
});

export const UserContextProvider = (props) => {
    // const [user, setUser] = useState("Poke Baller");

    const [id, setId] = useState(-1);
    const [username, setUsername] = useState("Poke Baller");

    const setUser = user => {
        console.log(user);
        setId(user.id);
        setUsername(user.username);
    }

    return (
        <UserContext.Provider value={{user: {id, username }, setUser}} >
            {props.children}
        </UserContext.Provider>
    );
}