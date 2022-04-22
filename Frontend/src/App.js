import axios from "axios";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import BlockQuote from "./Components/blockquote";
import Search from "./Components/search";
import Rows from "./Components/Rows"
import Pages from "./Components/paging"
import "./App.css";

const App = () => {

	const [ numOfBooks, setNumOfBooks ] = useState(0)
	const [ searchResults, setSearchResults ] = useState([])
	const [ currentPage, setCurrentPage ] = useState(1)
	const [ numOfPages, setNumOfPages ] = useState(0)

	const resultsPerPage = 5
 
	const getNumOfBooks = async () => {	
		const resp = await axios.get("/book/number_of_books")
		setNumOfBooks(resp.data.BookCount)
	}

	const getSearchResults = (results) => {
		setSearchResults(results.Books)
		setCurrentPage(1)
		setNumOfPages(Math.ceil(results.Books.length / 5))
	}

	useEffect(() => {

		if (numOfBooks === 0) {
			getNumOfBooks()
		}
	}, [])

	const hanldePageChange = (newPage) => {
		setCurrentPage(newPage)
	}

	const pageSearchResults = () => {
		if (searchResults.length === 0){
			return []
		} else {
			return searchResults.slice(currentPage * resultsPerPage - resultsPerPage, currentPage * resultsPerPage)
		}
	}

	if (numOfBooks === 0) {
		return <div></div>

	} else {
		return (
			<div>
				<Container style={{minWidth: "80%"}}>
					<BlockQuote numofbooks={numOfBooks}/>
					<Search searchtype="/book/title_search/" getsearchresults={getSearchResults}/>
					<div style={{padding: "20px"}}>
						<Rows searchresults={pageSearchResults()} />
					</div>
					<Pages currentpage={currentPage} numofpages={numOfPages} setcurrentpage={newPage => hanldePageChange(newPage)} />
					<div className='footer'>
						License for all books sourced from Project Gutenberg: <p style={{fontStyle: "italic"}}>This eBook is for the use of anyone anywhere in the United States and most other parts of the world at no cost and with almost no restrictions whatsoever. You may copy it, give it away or re-use it under the terms of the Project Gutenberg License included with this eBook or online at www.gutenberg.org. If you are not located in the United States, you will have to check the laws of the country where you are located before using this eBook. </p>
					</div>
				</Container>
			</div>
		)
	}


}

export default App;
