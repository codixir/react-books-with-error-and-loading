import React from 'react';
import './Book.css'

const Book = ({book, onDelete, onEdit}) => {
    return (
        <tr key={book.id}>
        <td>{book.id}</td>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.year}</td>
        <td>
            <button className="btn btn-warning"
                    onClick={() => onEdit(book)}>Edit</button>
            <button className="btn btn-danger"
                    onClick={() => onDelete(book.id)}>
            Delete</button>
        </td>
    </tr>
    );
}

export default Book;