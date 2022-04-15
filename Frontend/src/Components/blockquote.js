import React from 'react'
import DOMPurify from 'dompurify';

import { Container } from "react-bootstrap";
import axios from 'axios';
import { useState, useEffect } from "react";



const BlockQuote = (props) => {

    const [ quote, setQuote ] = useState({})

    // FIXME: Rendered with dangerouslysethtml currently.  XSS shouldn't be an issue
    // as it is sanitized using DOMPurify directly before rendering.
    const italicized = (q) => {
        let result = "";
        let currentlyItalicized = false;

        console.log("quote", quote.Quote)

        for (const e of q) {
            if (e === "_" && currentlyItalicized === false) {
                result = result + "<i>"
                currentlyItalicized = true
            } else if (e === "_" && currentlyItalicized) {
                result = result + "</i>"
                currentlyItalicized = false
            } else {
                result = result + e
            }
        }

        return result
    }

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