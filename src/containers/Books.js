import React, { Component } from 'react';
import Book from '../components/Book';
import { connect } from 'react-redux';
import { deleteBook } from '../actions/book.actions';
import './Books.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
            return (<div className="alert alert-danger">{this.props.errors}</div>)
        } else {
            return (            
                <div>
                    <div className="btn-container clearfix">
                        <Link to="/create" className="btn btn-create btn-primary">Add New</Link>
                    </div>
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
                </div>
            );
        }    
    }
}

const mapStateToProps = state => {
    let status = '';
    let message = '';

    if (state.booksData.errors) {
        status = state.booksData.errors.status;
        
        switch (status) {
            case 404:
                message+= '404 Not found.';
                break;
            case 500: 
                message += '500 Server Error.';
                break;
            default:
                message += 'Error';
        }
    } else {

    }


    return {
        errors: message ? message: null,
        books: state.booksData.books,
        isLoading: state.booksData.isLoading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDelete: (id) => {
            dispatch(deleteBook(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Books);