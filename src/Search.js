import React, { Component } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class Search extends Component {
	static propTypes = {
		updateQuery: propTypes.func,
		handleUpdateShelf: propTypes.func,
		clearResults: propTypes.func
	};

	state = {
		query: "",
		books: []
	};

	updateQuery = query => {
		this.setState({ query: query });

		BooksAPI.search(query, 3).then(books => {
			if (query) {
				books = books.map(book => {
					book.shelf = "none";

					this.props.shelvedBooks.forEach(shelvedBook => {
						if (book.id === shelvedBook.id) {
							book.shelf = shelvedBook.shelf;
						}
					});
					return book;
				});

				this.setState({ books });
			} else {
				this.setState({ books: [] });
			}
		});
	};

	handleUpdateShelf = (book, shelf) => {
		let updatedBooks = this.state.books.map(updatedBook => {
			if (book.id === updatedBook.id) {
				updatedBook.shelf = shelf;
			}
			return updatedBook;
		});

		this.setState({ books: updatedBooks });

		this.props.onMoveBook(book, shelf);
	};

	clearResults = () => {
		if (!this.state.query) {
			this.setState({ books: [] });
		}
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
									key={book.id}
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
