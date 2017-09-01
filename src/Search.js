import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";
import Shelf from "./Shelf";

class Search extends Component {
	state = {
		query: "",
		books: []
	};

	updateQuery = query => {
		this.setState({ query: query.trim() });

		BooksAPI.search(query, 3).then(books => {
			this.setState({ books });
		});
	};

	handleUpdateShelf = (book, shelf) => {
		this.props.onMoveBook(book, shelf);
	};

	render() {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to="/" className="close-search">
						Close
					</Link>
					<div className="search-books-input-wrapper">
						<input
							type="text"
							placeholder="Search by title or author"
							value={this.state.query}
							onChange={event => {
								this.updateQuery(event.target.value);
							}}
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{this.state.books.map(book => {
							return (
								<Book
									book={book}
									onShelfUpdate={this.handleUpdateShelf}
								/>
							);
						})}
					</ol>
				</div>
			</div>
		);
	}
}

export default Search;
