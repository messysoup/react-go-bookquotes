import React from 'react'

import { Container } from "react-bootstrap";
import axios from 'axios';
import { useState, useEffect } from "react";



const BlockQuote = () => {

    const [ quote, set_quote ] = useState({})

    useEffect(() =>{

        const r = Math.floor(Math.random() * (8) + 1).toString()
        
        axios.get("/book/id/" + r).then( res => {
            set_quote(res.data)
        })
    }, [])

    return (
        
        Object.keys(quote).length === 0  ? <div></div> :
        <div className="App">
            <Container>
                <blockquote className="blockquote text-center">
                    <p>{quote.Quote}</p>
                    <footer className="blockquote-footer">{quote.Author}: <cite>{quote.Title}</cite> </footer>
                </blockquote>
            </Container>
        </div>
        
    );
}

export default BlockQuote;