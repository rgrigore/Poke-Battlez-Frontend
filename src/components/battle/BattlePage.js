import React, {useState} from "react";
import ChatBox from "../lobby/ChatBox";
import OpponentCard from "./OpponentCard";
import GraphicBattle from "./GraphicBattle";

function BattlePage(props) {

    const messageTest = {name: "user", body: "message"}; //TODO delete after implementing

    let [opponent, setOpponent] = useState("Username");
    let [opponentRank, setOpponentrank] = useState("15");
    let [chatMessages, setChatMessages] = useState([]);
    let [opponentTeam, setOpponentTeam] = useState([true, true, true, true, true, true]);
    let [currentPokemon, setCurrentPokemon] = useState(6);
    let [currentOpponentPokemon, setCurrentOpponentPokemon] = useState(8);
    let [turn, setTurn] = useState(true);
    // let [newMessage, setNewMessage] = useState(null);

    let handleMessage = () => {
        let field = document.getElementById("battle-new-message")
        let message = field.value;
        if (message.length > 0) {
            field.value = "";
            field.focus();

            setChatMessages([...chatMessages, messageTest]);
            const newOpponentTeam = [true, false, true, true, true, true];
            setOpponentTeam(newOpponentTeam);
            setTurn(false);
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
                <div className={"d-flex mr-3 mb-2 mt-3"}
                    style={{minHeight: "400px", minWidth:"500px", overflow:"auto", borderStyle:"dotted"}}>
                    <GraphicBattle currentPokemon={currentPokemon}
                                   currentOpponentPokemon={currentOpponentPokemon}
                                   turn={turn}  />
                </div>
                <div className={"d-flex mr-3"}
                     style={{minHeight: "200px", minWidth:"300px", overflow:"auto", borderStyle:"dotted"}}>
                    BattleController
                </div>
            </div>
            <div className='pt-1 h-100 d-flex flex-column'>
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