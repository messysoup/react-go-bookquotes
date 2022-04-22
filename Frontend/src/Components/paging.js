import { useEffect, useState } from 'react'
import { Pagination } from 'react-bootstrap'

const Paging = (props) => {

    const [ pages, setPages ] = useState([])
    const [ firstEllipses, setFirstEllipses ] = useState(false)
    const [ lastEllipses, setLastEllipses ] = useState(false)

    const pagesToDisplay = 5;

    useEffect(() => {
        let pages_local = []

        for (let i = 0; i < props.numofpages ; i++) {
            pages_local.push(i + 1)
        }

        setPages(pages_local)
    },[props.numofpages])


    const handlePageValue = (e) => {
        const value = parseInt(e.target.text)
        console.log(value)

        props.setcurrentpage(value)
    }

    const handleBackEllipses = () => {
        if (props.currentPage - 10 <= 1) {
            props.setcurrentpage(1)
        } else {
            props.setcurrentpage(props.currentPage - 10)
        }
    }

    const handleForwardEllipses = () => {
        if (props.currentPage + 10 >= props.numofpages) {
            props.setcurrentpage(props.numofpages)
        } else {
            props.setcurrentpage(props.currentpage + 10)
        }
    }


    const handleFirstPage = () => {
        if (props.currentpage !== 1) {
            props.setcurrentpage(1)
        }
    }

    const handleLastPage = () => {
        if (props.currentpage !== props.numofpages) {
            props.setcurrentpage(props.numofpages)
        }
    }

    const handleNextPage = () => {
        if (props.currentpage < props.numofpages) {
            props.setcurrentpage(props.currentpage + 1)
        }
    }

    const handlePrevPage = () => {
        if (props.currentpage > 1) {
            props.setcurrentpage(props.currentpage - 1)
        }
    }


    const numberedPagination = pages.map((value, _) => {
        value = parseInt(value)
        const isActive = props.currentpage === value ? true : false

        if (value === 1 ) {
            return <Pagination.Item active={isActive} onClick={e => handlePageValue(e)}>{value}</Pagination.Item>

        } else if (value >= props.currentpage - pagesToDisplay && value <= props.currentpage + pagesToDisplay) {
            return <Pagination.Item active={isActive} onClick={e => handlePageValue(e)}>{value}</Pagination.Item>

        } else if (value === props.numofpages) {
            return <Pagination.Item active={isActive} onClick={e => handlePageValue(e)}>{value}</Pagination.Item>

        } else if (value <props.currentpage - pagesToDisplay && firstEllipses === false) {
            setFirstEllipses(true)
            return <Pagination.Ellipsis onClick={handleBackEllipses} />

        } else if (value <props.currentpage + pagesToDisplay && lastEllipses === false) {
            setLastEllipses(true)
            return <Pagination.Ellipsis onClick={handleForwardEllipses} />

        } 
    })

    const firstPrev = () =>{
        //enter logic for showing first and prev on one page results
        //don't show when it can't be used

        if (props.currentpage !== 1) {
            return <Pagination>
                    <Pagination.First onClick={handleFirstPage} />
                    <Pagination.Prev onClick={handlePrevPage} />    
                </Pagination>
        } 
    }

    
    const nextLast = () =>{
        //enter logic for showing next and last on one page results
        //don't show when it can't be used
        if (props.currentpage !== props.numofpages) {
            return <Pagination>
                <Pagination.Next onClick={handleNextPage} />
                <Pagination.Last onClick={handleLastPage} />
            </Pagination>
        } 
    }


    if (props.numofpages === 0) {
        return <h2 style={{textAlign: "center"}}>Search for a book title or click 'Search' to get started</h2>
    }
    return <div>
        <Pagination>
            {firstPrev()}
            {numberedPagination}
            {nextLast()}
        </Pagination>
    </div>
}

export default Paging;