import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class Shelf extends Component {

	handleUpdateShelf = (book, shelf) => {
		this.props.onMoveBook(book, shelf)
	}

	render() {
		const {title, bookTitleMap} = this.props;
		let books = this.props.books;
		console.log(books)
		let booksByCategory = books
			.filter((book) => {
				return book.shelf === bookTitleMap[title];
			})
			.map((book) => (
				           <Book book={ book } onShelfUpdate={this.handleUpdateShelf} />
			            ))

		return (
			<div className="bookshelf">
              <h2 className="bookshelf-title">{title}</h2>
              <div className="bookshelf-books">
	              <ol className="books-grid">
	              {booksByCategory}
	              </ol>
              </div>
            </div>
		)
	}
}

export default Shelf;