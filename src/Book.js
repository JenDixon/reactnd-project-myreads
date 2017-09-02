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
		return (
			<li key={this.props.book.id}>
				<div className="book">
					<div className="book-top">
						<div
							className="book-cover"
							style={{
								width: 128,
								height: 193,
								backgroundImage: `url(${this.props.book
									.imageLinks.thumbnail})`
							}}
						/>
						<div className="book-shelf-changer">
							<select
								onChange={event => this.moveToShelf(event)}
								value={this.props.book.shelf}
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
					<div className="book-title">{this.props.book.title}</div>

					<div className="book-authors">
						{this.props.book.authors.map(author => {
							return <p>{author}</p>;
						})}
					</div>
				</div>
			</li>
		);
	}
}

export default Book;
