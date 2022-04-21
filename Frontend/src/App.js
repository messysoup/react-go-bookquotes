import axios from "axios";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import BlockQuote from "./Components/blockquote";
import Search from "./Components/search";
import Rows from "./Components/Rows"

const App = () => {

	const [ numOfBooks, setNumOfBooks ] = useState(0)
	const [ searchResults, setSearchResults ] = useState({})

	const getNumOfBooks = async () => {	
		const resp = await axios.get("/book/number_of_books")
		setNumOfBooks(resp.data.BookCount)
	}

	const getSearchResults = (results) => {
		setSearchResults(results)
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
					<Search searchtype="/book/title_search/" getsearchresults={getSearchResults}/>
					<div style={{padding: "20px"}}>
						<Rows searchresults={searchResults} />
					</div>
				</Container>
			</div>
		)
	}


}

export default App;
