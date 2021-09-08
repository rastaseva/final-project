import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const cardInfo = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    width: '10rem',
    padding: '2rem 1rem',
    background: '#7ebeda',
    border: '3px solid #ccc',
    borderRadius: '4px',
    margin: '1rem'
}

const cardImg = {
    width: '7rem',
    height: '7rem',
}

const Card = (props) => {

    let [isCaught, setCaught] = useState(false);

    const catchPokemon = () => {
        setCaught(true);
        const caughtDate = new Date().toUTCString();
        axios.post('http://localhost:3004/caughtPokemons', { id: props.id, name: props.name, caughtDate, isCaught: true, })
        alert('Pokemon caught!')
    }

    return (
        <div style={cardInfo} className={`${props.name}_info`}>
            <Link to={`/pokemons/${props.id}`} >
                <img style={cardImg} src={process.env.PUBLIC_URL + `/pokemons/${props.id}.png`} alt={props.name}
                    onError={(e) => { e.target.onerror = null; e.target.src = process.env.PUBLIC_URL + '/unknown.png' }} />
            </Link>
            <p className='text-capitalize'>{props.name}</p>
            <Button variant="dark" onClick={catchPokemon} disabled={isCaught}>Catch!</Button>
        </div>
    )
};

export default Card;