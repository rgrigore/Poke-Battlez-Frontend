import React, {useContext, useEffect, useState} from "react";
import ChatBox from "../lobby/ChatBox";
import OpponentCard from "./OpponentCard";
import GraphicBattle from "./GraphicBattle";
import BattleController from "./BattleController";
import {UserContext} from "../lobby/account/UserContext";
import {connect, sendMove, sendSwitch} from "../../controller/BattleController";


function BattlePage() {

    const testTeam = [
        {name: "pokemon 1", id: 5, currentHp: 45, hp: 50, position: 0, types: ["normal", "water"], moves: ["move 1", "move 2", "move 3", "move 4"], frontSprite: "", backSprite: ""},
        {name: "pokemon 2", id: 1, currentHp: 50, hp: 50, position: 1, types: ["normal", "water"], moves: ["move 1", "move 2", "move 3", "move 4"], frontSprite: "", backSprite: ""},
        {name: "pokemon 3", id: 8, currentHp: 50, hp: 50, position: 2, types: ["normal", "electric"], moves: ["move 1", "move 2", "move 3", "move 4"], frontSprite: "", backSprite: ""},
        {name: "pokemon 4", id: 10, currentHp: 50, hp: 50, position: 3, types: ["normal", "water"], moves: ["move 1", "move 2", "move 3", "move 4"], frontSprite: "", backSprite: ""},
        {name: "pokemon 5", id: 3, currentHp: 50, hp: 50, position: 4, types: ["normal", "water"], moves: ["move 1", "move 2", "move 3", "move 4"], frontSprite: "", backSprite: ""},
        {name: "pokemon 6", id: 2, currentHp: 50, hp: 50, position: 5, types: ["normal", "water"], moves: ["move 1", "move 2", "move 3", "move 4"], frontSprite: "", backSprite: ""}
    ]; //TODO delete after implementing
    const messageTest = {name: "user", body: "message"}; //TODO delete after implementing



    const userContext = useContext(UserContext);

    let [first, setFirst] = useState(true);

    let [acted, setActed] = useState(false);

    let [chatMessages, setChatMessages] = useState([]);
    let [newMessage, setNewMessage] = useState(null);

    let [team, setTeam] = useState(testTeam);
    let [teamHp, setTeamHp] = useState(null);
    let [currentPokemon, setCurrentPokemon] = useState(null);
    let [currentPokemonIndex, setCurrentPokemonIndex] = useState(null);

    let [opponent, setOpponent] = useState("Opponent");
    let [opponentRank, setOpponentRank] = useState("15");
    let [opponentTeam, setOpponentTeam] = useState([true, true, true, true, true, true]);
    let [currentOpponentPokemon, setCurrentOpponentPokemon] = useState(null);



    if(first) {
        setFirst(false);
        connect(userContext.user.id, setTeam, setNewMessage, setTeamHp, setCurrentPokemonIndex, setOpponentTeam, setCurrentOpponentPokemon, setActed)
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
        for (const pokemon of team) {
            if (pokemon.position === currentPokemonIndex) {
                setCurrentPokemon(pokemon);
                break;
            }
        }
        // eslint-disable-next-line
    }, [currentPokemonIndex])

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

    const sendPokemonMove = move => {
        sendMove(userContext.user.id, move, currentOpponentPokemon.id);
        setActed(true);
    }

    const sendSwitchPokemon = pokemon => {
        sendSwitch(userContext.user.id, pokemon);
        setActed(true);
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
                                      acted={acted} sendMove={sendPokemonMove} sendSwitch={sendSwitchPokemon}
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