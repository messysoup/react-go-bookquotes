import axios from "axios";
import { ListGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import BlockQuote from "./Components/blockquote";
import Search from "./Components/search";

const App = () => {

	const [ numOfBooks, setNumOfBooks ] = useState(0)

	const getNumOfBooks = async () => {	
		const resp = await axios.get("/book/number_of_books")
		setNumOfBooks(resp.data.BookCount)
	}

	useEffect(() => {

		if (numOfBooks === 0) {
			getNumOfBooks()
		}
	}, [])

	// const multiple_quotes = () => {

	// 	let arr = [];

	// 	for ( let i = 0; i < 10; i++ ) {
	// 		arr.push(<ListGroup.Item key={i} >
	// 			<BlockQuote numofbooks={numOfBooks} />
	// 		</ListGroup.Item>)
	// 	}

	// 	return <div>
	// 		{arr.map(quote => quote)}
	// 	</div>
	// }

	if (numOfBooks === 0) {
		return <div></div>
	} else {
		return (
		
			<div>
				<BlockQuote numofbooks={numOfBooks}/>
				<Search searchtype="/book/title_search/"/>
				{/* <ListGroup>
					{multiple_quotes()}
				</ListGroup> */}
			</div>
		)
	}


}

export default App;
