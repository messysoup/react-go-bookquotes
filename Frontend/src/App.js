import axios from "axios";
import { Container } from "react-bootstrap";
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


	if (numOfBooks === 0) {
		return <div></div>

	} else {
		return (
			<div>
				<Container>
					<BlockQuote numofbooks={numOfBooks}/>
					<Search searchtype="/book/title_search/"/>
				</Container>
			</div>
		)
	}


}

export default App;
