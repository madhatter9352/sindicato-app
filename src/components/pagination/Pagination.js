import React from 'react'
import { Pagination } from 'react-bootstrap'

export const PaginationComponent = ({totalItems, itemsPerPage, currPage, setCurrentPage, previous, next}) => {
    console.log(currPage)
    const pages = [];
    for(let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pages.push(
            <Pagination.Item key={i} active={i === currPage} onClick={() => setCurrentPage(i)} activeLabel={false} >
                {i}
            </Pagination.Item>
        )
    }


    return (
        <Pagination>
            <Pagination.First disabled={currPage === 1} />
            <Pagination.Prev disabled={!previous} />
            {pages}
            <Pagination.Next disabled={!next} />
            <Pagination.Last disabled={currPage === Math.ceil(totalItems / itemsPerPage)} />
        </Pagination>
    )
}
