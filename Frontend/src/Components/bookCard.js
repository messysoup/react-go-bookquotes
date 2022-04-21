import { Card, Col, Row } from "react-bootstrap";

const BookCard = (props) => {

    console.log(props.books)

    const filename = props.books.BookFile.replace(".txt", "")

    return (
    <Card className="mb-3 h-100" >
        <Row className="g-0" >
            <Col className="md-4"  >
                <img src={require(`/public/CoverArt/${filename}.png`)} className="img-fluid rounded-start" alt={`Cover Art for ${filename}`} style={{margin: "7px"}} />
            </Col>
            <Col className="md-8">
                <div className="card-body">
                    <h5 className="card-title">{props.books.Title}</h5>
                    <h6 className="card-subtitle">{props.books.Author}</h6>
                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </Col>
        </Row>
    </Card>
  )
}

export default BookCard;