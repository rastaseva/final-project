import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Pagination = ({ pokemonsPerPage, totalPokemons, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i);
    }


    return (
        <div>
            <ul className="d-flex justify-content-between flex-wrap m-0 p-4">
                {pageNumbers.map(num => (
                    <li className="page-item" key={num}>
                        <Button variant='dark'>
                            <Link to={`?page=${num}`} className="pagelink" onClick={() => paginate(num)}>
                                {num}
                            </Link>
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Pagination;
<div>

</div>