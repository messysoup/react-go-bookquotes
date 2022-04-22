import { Col } from "react-bootstrap"
import BookCard from "./bookCard"

const Rows = (props) => {

    let results = <div></div>

    if (props.searchresults.length !== 0) {
        results = props.searchresults.map((value, index) => {
            return <Col style={{maxWidth: "400px"}}>
                <BookCard books={value} />
            </Col> 
        })
    }

    
    if (props.searchresults.length === 0) {
        return <div></div>
    } else {
        return <div className="row row-cols-1 rows-cols-md-3 g-4">
            {results}
        </div>
    }
}

export default Rows;