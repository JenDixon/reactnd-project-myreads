import React, { Component } from "react";
import propTypes from "prop-types";
import Book from "./Book";

class Shelf extends Component {
	static propTypes = {
		handleUpdateShelf: propTypes.func
	};

	handleUpdateShelf = (book, shelf) => {
		this.props.onMoveBook(book, shelf);
	};

	render() {
		const { title, bookTitleMap, books } = this.props;
		let booksByCategory = books
			.filter(book => {
				return book.shelf === bookTitleMap[title];
			})
			.map(book => (
				<Book
					key={book.id}
					book={book}
					onShelfUpdate={this.handleUpdateShelf}
				/>
			));

		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{title}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">{booksByCategory}</ol>
				</div>
			</div>
		);
	}
}

export default Shelf;
