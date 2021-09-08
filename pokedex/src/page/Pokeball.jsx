import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Pagination from "../components/Pagination";
import CardBox from '../components/CardBox';

const Pokeball = (props) => {
    const [pokemons, setPokemon] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(21);

    useEffect(() => {
        const getPokemons = async () => {
            setLoading(true);
            const res = await axios.get('http://localhost:3004/caughtPokemons');
            setPokemon(res.data)
            setLoading(false)
        }
        getPokemons();
    }, []);

    const lastPokemonIndex = currentPage * pokemonsPerPage;
    const firstPokemonIndex = lastPokemonIndex - pokemonsPerPage;
    const currentPokemon = pokemons.slice(firstPokemonIndex, lastPokemonIndex);

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div className ='d-flex p-2 justify-content-center align-items-end m-auto'>
            {(pokemons.length !== 0) ? <CardBox pokemons={currentPokemon} loading={loading} /> : 
            <p className='font-size-1.5rem'>You didn't catch any pokemon, loser!</p>}
            <Pagination
                pokemonsPerPage={pokemonsPerPage}
                totalPokemons={pokemons.length}
                paginate={paginate} />
        </div>
    );
}

export default Pokeball;