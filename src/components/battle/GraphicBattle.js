import React, {useState} from "react";
import background1 from '../img/battle_background_1.png';
import background2 from '../img/battle_background_2.png';
import background3 from '../img/battle_background_3.png';
import background4 from '../img/battle_background_4.jpg';
import background5 from '../img/battle_background_5.jpg';

import "../../css/PokemonAnimation.css";
import "../../css/HiddenScrollbar.css";


function GraphicBattle({ currentPokemon, currentOpponentPokemon }) {

    const backgrounds = [background1, background2, background3, background4, background5 ]
    const [background, setBackground] = useState(backgrounds[Math.floor(Math.random() * Math.floor(backgrounds.length))]);

    return(
        <div className={"ml-3 mr-2 border rounded scrollbar-hidden"} style={{backgroundImage: `url(${background})`,
            minWidth: '800px'}}>
            { currentOpponentPokemon !== null ?
                <img alt="" className={"pokemon"}
                     src={currentOpponentPokemon.frontSprite}
                     style={{
                         position: 'absolute',
                         top: '150px',
                         right: '500px',
                         width: '250px',
                         height: '250px',
                         overflow: 'hidden',
                         borderRadius: '70%',
                         transform: 'translatey(0px)',
                         animation: 'float 4s ease-in-out infinite'
                     }}/>
                : <></>
            }
            <br />
            { currentPokemon !== null ?
                <img alt="" className={"pokemon"}
                     src={currentPokemon.backSprite}
                     style={{
                         position: 'relative',
                         top: '150px',
                         right: '0px',
                         width: '250px',
                         height: '250px',
                         overflow: 'hidden',
                         borderRadius: '70%',
                         transform: 'translatey(0px)',
                         animation: 'float 4s ease-in-out infinite'
                     }}/>
                : <></>
            }
        </div>
    );
}

export default GraphicBattle;