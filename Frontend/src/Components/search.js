import { Button, Col, Form, FormGroup, ListGroup, Row } from "react-bootstrap";
import { useEffect, useState } from 'react';
import axios from "axios";



const Search = (props) => {

    const [ searchValue, setSearchValue ] = useState("")
    const [ bookData, setBookData ] = useState({Books: []})

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            getSearchResults()
        }
    }

    const handleChange = (e) => {
       if (e.target.value.length > 0) {
            setSearchValue(e.target.value)
        } else {
            setSearchValue("")
        }
    }

    // Perform API reqest after rendering input change.
    // Abort API request if state is changed prior to returning the API result.
    useEffect(() => {
        const controller = new AbortController()

        if (searchValue.length > 0) {
            axios.get(props.searchtype + searchValue, {signal: controller.signal}).then((res) => {
                if (res.data.Books !== null) {
                    setBookData(res.data)
                } else {
                    setBookData({Books: []})
                }
            }).catch(e => {})
        }
        
        if (searchValue.length === 0) {
            setBookData({Books: []})
        }

        // Cleanup to prevent results from populating between local state update and api results.
        return () => {
            controller.abort()
        }
    }, [searchValue, props.searchtype])

    const getSearchResults = () => {

        if (searchValue !== "") {
            axios.get(props.searchtype + searchValue).then(res => {
                if (res.data.Books != null) {
                    props.getsearchresults(res.data)
                }
            }).catch(e => {})
        } else {
            axios.get('book/title_search/blank_search').then(res => {
                props.getsearchresults(res.data).catch(e => {})
            })
        }


        setSearchValue("")
        setBookData({Books: []})
    }


    const results = bookData.Books.map((value, index) => {
        return <ListGroup.Item key={index}>{value.Title}</ListGroup.Item>
    })

    return <div>
        <Row style={{margin: "15px 25px"}}>
            <FormGroup>
                <Row className="justify-content-md-center">
                    <Col style={{maxWidth: "600px"}}>
                        <Form.Control 
                            onChange={e => handleChange(e)}
                            onKeyDown={e => handleEnter(e)}
                            placeholder="Search by title"
                            type="text" 
                            value={searchValue}/>
                        <ListGroup style={{margin: "10px", maxWidth: "550px"}}>
                            {results}
                        </ListGroup>
                    </Col>
                    <Col md='auto'>
                        <Button onClick={getSearchResults}>Search</Button>                    
                    </Col>
                </Row>
            </FormGroup>
        </Row>
    </div>

}

export default Search