import { ListGroup } from "react-bootstrap";
import BlockQuote from "./Components/blockquote";

const App = () => {

	const multiple_quotes = () => {

		let arr = [];

		for ( let i = 0; i < 10; i++ ) {
			arr.push(<ListGroup.Item key={i}>
				<BlockQuote />
			</ListGroup.Item>)
		}

		return <div>
			{arr.map(quote => quote)}
		</div>
	}

	return (
		<div>
			<BlockQuote />
			<ListGroup>
				{multiple_quotes()}
			</ListGroup>
		</div>
	)
}

export default App;
