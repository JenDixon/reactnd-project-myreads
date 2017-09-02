import React, { Component } from "react";
import propTypes from "prop-types";

class Book extends Component {
	static propTypes = {
		moveToShelf: propTypes.func.isRequired
	};

	moveToShelf(event) {
		this.props.onShelfUpdate(this.props.book, event.target.value);
	}

	render() {
		const { book } = this.props;

		return (
			<li key={book.id}>
				<div className="book">
					<div className="book-top">
						<div
							className="book-cover"
							style={{
								backgroundImage: `url(${book.imageLinks
									.thumbnail})`
							}}
						/>
						<div className="book-shelf-changer">
							<select
								onChange={event => this.moveToShelf(event)}
								value={book.shelf}
							>
								<option value="none" disabled>
									Move to...
								</option>
								<option value="currentlyReading">
									Currently Reading
								</option>
								<option value="wantToRead">Want to Read</option>
								<option value="read">Read</option>
								<option value="none">None</option>
							</select>
						</div>
					</div>
					<div className="book-title">{book.title}</div>

					<div className="book-authors">
						{book.authors ? book.authors.join(", ") : ""}
					</div>
				</div>
			</li>
		);
	}
}

export default Book;
