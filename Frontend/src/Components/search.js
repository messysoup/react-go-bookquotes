import { Form, FormGroup, ListGroup } from "react-bootstrap";
import { useEffect, useState } from 'react';
import axios from "axios";



const Search = (props) => {

    const [ searchValue, setSearchValue ] = useState("")
    const [ bookData, setBookData ] = useState({Books: []})


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


    const results = bookData.Books.map((value, index) => {
        return <ListGroup.Item key={index}>{value.Title}</ListGroup.Item>
    })

    return <div>
        <FormGroup>
            <Form.Control 
                type="text" 
                placeholder="Search by title"
                onChange={e => handleChange(e)} 
                value={searchValue}/>
        </FormGroup>
        <ListGroup>
            {results}
        </ListGroup>
    </div>
}

export default Search