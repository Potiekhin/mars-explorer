import React from "react";
import {Button} from "react-bootstrap";

const Pagination = ({dataPerPage, totalData, paginate, setDataPerPage}) => {
    const pageNumbers = []
    console.log(pageNumbers)
    for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            {pageNumbers.map(number => (
                <Button
                    key={number}
                    onClick={() => paginate(number)}
                    className='m-2' variant="outline-primary"
                    size="lg">{number}</Button>
            ))}
            <Button
                onClick={()=>setDataPerPage(dataPerPage*2)}
                className='m-2' variant="outline-primary"
                size="lg">load more...</Button>
        </nav>
    )
}

export default Pagination