import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const infoBoxStyle = {
    background: '#7ebeda',
    border: '3px solid #ccc',
    borderRadius: '4px',
    fontSize: '1.5rem',
}


const PokemonDetails = (props) => {
    const { id } = useParams();

    const [pokemon, setPokemon] = useState([])

    useEffect(() => {
        const getPokemon = async () => {
            const info = await axios.get(`http://localhost:3004/pokemons/${id}`);
            setPokemon(info.data);
        }

        getPokemon();
    }, []);


    useEffect(() => {
        const getPokemon = async () => {
            const info = await axios.get(`http://localhost:3004/caughtPokemons/${id}`);
            setPokemon(info.data);
        }

        getPokemon();
    }, []);

    const catchCheck = () => {
        if (pokemon.hasOwnProperty('caughtDate')) {
            return <p>Catch date: {pokemon.caughtDate}</p>
        } return <p>Pokemon is not caught yet!</p>
    }

    let [isReleased, setReleased] = useState(false);

    const releasePokemon = () => {
        setReleased(true);
        axios.delete(`http://localhost:3004/caughtPokemons/${id}`, { id: props.id, name: props.name, 'caughtDate': pokemon.caughtDate, 'isCaught': pokemon.isCaught })
        alert('Pokemon released!')
    }

    const releaseCheck = () => {
        if (pokemon.isCaught) {
            return (
                <Button variant="dark" onClick={releasePokemon} disabled={isReleased}>
                    Release!
                </Button>
            )
        }
    }

    return (
        <div className={`${pokemon.name}_info d-flex p-2 justify-content-around align-items-center m-auto`}>
            <div className='d-flex p-2'>
                <img className='float-left' src={process.env.PUBLIC_URL + `/pokemons/${pokemon.id}.png`} alt={pokemon.name}
                    onError={(e) => { e.target.onerror = null; e.target.src = process.env.PUBLIC_URL + '/unknown.png' }} />
            </div>
            <div style={infoBoxStyle} className='d-flex flex-column justify-content-center p-3 m-3 h-50'>
            Pokemon name: <p className='text-capitalize'>{pokemon.name}</p>
                <p>Pokemon id: {pokemon.id}</p>
                {catchCheck()}
                {releaseCheck()}
            </div>
        </div>
    )
};

export default PokemonDetails;