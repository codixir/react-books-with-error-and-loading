import React, { Component } from 'react';
import Book from '../components/Book';
import { connect } from 'react-redux';
import { deleteBook } from '../actions/book.actions';

class Books extends Component {
    constructor(props) {
        super(props);

        this.handleEdit = this.handleEdit.bind(this);
    }

    handleEdit(book) {
        this.props.onEdit(book);
    }

    render() {      
        if (this.props.isLoading) {
            return (<div className="spinner-border" role="status">
                <span className="sr-only">Data is loading...</span>
          </div>)
        } else if (this.props.errors) {
            return (<div className="alert alert-danger">{this.props.errors.message}</div>)
        } else {
            return (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Title</td>
                            <td>Author</td>
                            <td>Year</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.books.map((book) => {
                                return (
                                    <Book key={book.id} 
                                          book={book} 
                                          onEdit={this.handleEdit}
                                          onDelete={this.props.onDelete}
                                         />
                                );
                            })
                        }    
                    </tbody>
                </table>
            );
        }    
    }
}

const mapStateToProps = state => {
    const scope = state.booksData.errors ? state.booksData.errors.scope : '';
    return {
        errors: (scope === 'get-books' || scope === 'delete-book') ? state.booksData.errors: null,
        books: state.booksData.books,
        isLoading: state.booksData.isLoading,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onDelete: (id) => {
            dispatch(deleteBook(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Books);