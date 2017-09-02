import React, { Component } from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import Shelf from "./Shelf";

class BookList extends Component {
	static propTypes = {
		bookTitleMap: propTypes.object.isRequired,
		books: propTypes.array.isRequired,
		updateShelf: propTypes.func.isRequired
	};

	render() {
		const { bookTitleMap, books, updateShelf } = this.props;

		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>
						<Shelf
							books={books}
							title="Currently Reading"
							bookTitleMap={bookTitleMap}
							onMoveBook={updateShelf}
						/>

						<Shelf
							books={books}
							title="Want to Read"
							bookTitleMap={bookTitleMap}
							onMoveBook={updateShelf}
						/>

						<Shelf
							books={books}
							title="Read"
							bookTitleMap={bookTitleMap}
							onMoveBook={updateShelf}
						/>
					</div>
				</div>
				<div className="open-search">
					<Link to="/search">Add a book</Link>
				</div>
			</div>
		);
	}
}

export default BookList;
