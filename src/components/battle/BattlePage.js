import React, {useContext, useEffect, useState} from "react";
import ChatBox from "../lobby/ChatBox";
import OpponentCard from "./OpponentCard";
import GraphicBattle from "./GraphicBattle";
import BattleController from "./BattleController";
import {UserContext} from "../lobby/account/UserContext";
import {connect} from "../../controller/BattleController";


function BattlePage() {

    const testTeam = [
        {name: "pokemon 1", id: 5, hp: 50, types: ["normal", "water"], moves: ["move 1", "move 2", "move 3", "move 4"]},
        {name: "pokemon 1", id: 1, hp: 50, types: ["normal", "water"], moves: ["move 1", "move 2", "move 3", "move 4"]},
        {name: "pokemon 1", id: 8, hp: 50, types: ["normal", "electricity"], moves: ["move 1", "move 2", "move 3", "move 4"]},
        {name: "pokemon 1", id: 10, hp: 50, types: ["normal", "water"], moves: ["move 1", "move 2", "move 3", "move 4"]},
        {name: "pokemon 1", id: 3, hp: 50, types: ["normal", "water"], moves: ["move 1", "move 2", "move 3", "move 4"]},
        {name: "pokemon 1", id: 2, hp: 50, types: ["normal", "water"], moves: ["move 1", "move 2", "move 3", "move 4"]}
    ]; //TODO delete after implementing
    const messageTest = {name: "user", body: "message"}; //TODO delete after implementing



    const userContext = useContext(UserContext);

    let [first, setFirst] = useState(true);

    let [opponent, setOpponent] = useState("Opponent");
    let [opponentRank, setOpponentRank] = useState("15");
    let [chatMessages, setChatMessages] = useState([]);
    let [opponentTeam, setOpponentTeam] = useState([true, true, true, true, true, true]);
    let [teamHp, setTeamHp] = useState(null);
    let [opponentTeamHp, setOpponentTeamHp] = useState(null);
    let [currentPokemonIndex, setCurrentPokemonIndex] = useState(null);
    let [currentPokemon, setCurrentPokemon] = useState(null);
    let [currentOpponentPokemon, setCurrentOpponentPokemon] = useState(null);
    let [currentOpponentPokemonIndex, setCurrentOpponentPokemonIndex] = useState(null);
    let [team, setTeam] = useState(testTeam);
    let [newMessage, setNewMessage] = useState(null);

    if(first) {
        setFirst(false);
        connect(userContext.user.id, setNewMessage, setTeamHp, setOpponentTeamHp, setCurrentPokemonIndex, setCurrentOpponentPokemonIndex)
    }

    useEffect(() => {
        if(newMessage !== null) {
            setChatMessages([...chatMessages, newMessage]);
        }
    // eslint-disable-next-line
    }, [newMessage]);

    useEffect(() => {
        //TODO
    }, [teamHp])

    useEffect(() => {
        //TODO
    }, [opponentTeamHp])

    useEffect(() => {
        //TODO
    }, [currentPokemonIndex])

    useEffect(() => {
        //TODO
    }, [currentOpponentPokemonIndex])

    let handleMessage = () => {
        let field = document.getElementById("battle-new-message")
        let message = field.value;
        if (message.length > 0) {
            field.value = "";
            field.focus();

            setNewMessage({user: userContext.user.username, message: message});
            // const newOpponentTeam = [true, false, true, true, true, true];
            // setOpponentTeam(newOpponentTeam);
            // sendMessage(message);
        }
    }

    let handleEnter = event => {
        if (event.keyCode === 13) {
            handleMessage();
        }
    }

    return (
        <div className={"d-flex container-fluid vh-100 pt-2"} style={{backgroundColor: "slategrey"}}>
            <div className="flex-grow-1 h-100 pt-1 flex-column">
                <div className={"d-flex mr-3 justify-content-end"}>
                    <OpponentCard opponent={opponent} opponentRank={opponentRank} opponentTeam={opponentTeam} />
                </div>
                <div className={"d-flex mr-2 mb-2 mt-3 justify-content-end"}
                    style={{minHeight: "400px", minWidth:"500px", overflow:"auto",
                        // borderStyle:"dotted"
                    }}>
                    <GraphicBattle currentPokemon={currentPokemon}
                                   currentOpponentPokemon={currentOpponentPokemon}
                    />
                </div>
                <div className={"d-flex mr-3"}
                     style={{minHeight: "200px", minWidth:"300px", overflow:"auto"}}>
                    <BattleController team={team} currentPokemon={currentPokemon}
                                        setCurrentPokemon={(pokemon) => setCurrentPokemon(pokemon)}
                    />
                </div>
            </div>
            <div className='pt-1 pl-2 h-100 d-flex flex-column' style={{minWidth: '400px'}}>
                <div className='mr-1 flex-fill border rounded scrollbar-hidden'
                     style={{ overflow:'auto', backgroundColor: "rgba(160, 169, 173, 0.17)" }}>
                    <div id={"battleChatArea"}>
                        <ChatBox messages={chatMessages}/>
                    </div>
                </div>
                <div className="w-100 my-1 mr-1 pb-2">
                    <div className="d-flex w-100">

                        <div className="flex-grow-1 p-1">
                            <input id="battle-new-message"
                                   className="border rounded form-control"
                                   type="text"
                                   name="text"
                                   placeholder="Type a message..."
                                   onKeyUp={event => handleEnter(event)} />
                        </div>
                        <div className="p-1">
                            <button className="btn btn-dark rounded border w-100"
                                    title="Send"
                                    style={{ paddingRight: 16 }}
                                    onClick={handleMessage}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BattlePage;