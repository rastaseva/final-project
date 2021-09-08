import axios from 'axios';
import React, {useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import CardBox from "../components/CardBox";
import Pagination from "../components/Pagination";

const CardList = () => {
    const useQuery = () => new URLSearchParams(useLocation().search)

    const pageNumber = useQuery().get('page');

    const [pokemons, setPokemon] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(pageNumber);
    const [pokemonsPerPage] = useState(21);

    useEffect(() => {
        const getPokemons = async () => {
            setLoading(true);
            const res = await axios.get('http://localhost:3004/pokemons');
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
        <>
        <CardBox pokemons = {currentPokemon} loading = {loading}/>
        <Pagination
        pokemonsPerPage = {pokemonsPerPage}
        totalPokemons = {pokemons.length}
        paginate = {paginate}/>
        </>
     );
}
 
export default CardList;