import axios from "axios";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import BlockQuote from "./Components/blockquote";
import Search from "./Components/search";
import Rows from "./Components/Rows"
import Pages from "./Components/paging"

const App = () => {

	const [ numOfBooks, setNumOfBooks ] = useState(0)
	const [ searchResults, setSearchResults ] = useState([])
	const [ currentPage, setCurrentPage ] = useState(1)

	const resultsPerPage = 5
 
	const getNumOfBooks = async () => {	
		const resp = await axios.get("/book/number_of_books")
		setNumOfBooks(resp.data.BookCount)
	}

	const getSearchResults = (results) => {
		setSearchResults(results.Books)
		setCurrentPage(1)
	}

	useEffect(() => {

		if (numOfBooks === 0) {
			getNumOfBooks()
		}
	}, [])

	const numOfPages = () => {
		return Math.ceil(searchResults.length / 5)
	}

	const hanldePageChange = (newPage) => {
		console.log("from app",newPage)
		setCurrentPage(newPage)
	}

	const pageSearchResults = () => {
		if (searchResults.length === 0){
			return []
		} else {
			console.log(searchResults.slice(currentPage * resultsPerPage - resultsPerPage, currentPage * resultsPerPage))
			return searchResults.slice(currentPage * resultsPerPage - resultsPerPage, currentPage * resultsPerPage)
		}
	}

	if (numOfBooks === 0) {
		return <div></div>

	} else {
		return (
			<div>
				<Container>
					<BlockQuote numofbooks={numOfBooks}/>
					<Search searchtype="/book/title_search/" getsearchresults={getSearchResults}/>
					<div style={{padding: "20px"}}>
						<Rows searchresults={pageSearchResults()} />
					</div>
					<Pages currentpage={currentPage} numofpages={numOfPages()} setcurrentpage={newPage => hanldePageChange(newPage)} />
				</Container>
			</div>
		)
	}


}

export default App;
