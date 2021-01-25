import React, {createContext, useState} from "react";

export const UserContext = createContext(undefined);

export const UserContextProvider = (props) => {
    const [user, setUser] = useState("Poke Baller");

    return (
        <UserContext.Provider value={[user, setUser]} >
            {props.children}
        </UserContext.Provider>
    );
}