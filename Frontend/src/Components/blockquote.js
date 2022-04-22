import React from 'react'
import DOMPurify from 'dompurify';

import { Container } from "react-bootstrap";
import axios from 'axios';
import { useState, useEffect } from "react";
import italicized from '../Helpers/Italicize';



const BlockQuote = (props) => {

    const [ quote, setQuote ] = useState({})


    const getBookData = async () => {
        const r = Math.floor(Math.random() * (props.numofbooks)).toString()

        let resp = await axios.get("/book/id/" + r)

        resp.data.Quote = italicized(resp.data.Quote)

        setQuote(resp.data)
    }

    useEffect(() => {

        getBookData()

    }, [])

    return (
        
        Object.keys(quote).length === 0  ? <div></div> :
        <div className="App">
            <Container>
                <blockquote className="blockquote text-center">
                    <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(quote.Quote)}} />
                    <footer className="blockquote-footer">{quote.Author}: <cite>{quote.Title}</cite> </footer>
                </blockquote>
            </Container>
        </div>
        
    );
}

export default BlockQuote;