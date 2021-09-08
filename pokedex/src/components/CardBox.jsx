import React from 'react';
import Card from './Card';

const CardBox = ({pokemons, loading}) => {   

    if(loading) return <h2>Loading...</h2>
    
    return (
        <div className='card_Box'>
            {pokemons.map((pokemon) => (
                <Card
                    key={pokemon.id}
                    id={pokemon.id}
                    name={pokemon.name}
                />
            ))}
            
        </div>
        ) 
}

export default CardBox;