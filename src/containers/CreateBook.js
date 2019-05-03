import React, { Component } from 'react';
import { createBook } from '../actions/book.actions';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './CreateBook.css';

class CreateBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            title: '',
            author: '',
            year: '',
            errors: null,
        }; 
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onAdd(this.state);
        this.handleReset(e);        
    }

    handleValueChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleReset(e) {
        e.preventDefault();
        this.setState({
            id: 0,
            title: '',
            author: '',
            year: '',
            errors: null,
        });
    }

    componentWillMount() {
        if (this.props.location && this.props.location.state && this.props.location.state.book) {
            const book = this.props.location.state.book;

            this.setState({
                id: book.id,
                title: book.title,
                author: book.author,
                year: book.year,
                errors: null,
            });    
        }         
    }

    render() {
        return (
            <div>
                <div className="btn-container clearfix">
                     <Link to="/" className="btn btn-home btn-primary">Home</Link>
                </div>
                
                {this.props.errors && this.props.errors.message ? <div className="alert alert-danger">{this.props.errors.message}</div> : ''}
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                        <input type="text" 
                                name="title"
                                className="form-control"    
                                placeholder="Enter Title"     
                                value={this.state.title}    
                                onChange={this.handleValueChange.bind(this)}                                           
                        />
                    </div>
                    <div className="form-group">
                        <input type="text" 
                                name="author"
                                className="form-control"    
                                placeholder="Enter Author"  
                                value={this.state.author}  
                                onChange={this.handleValueChange.bind(this)}                     
                        />
                    </div>
                    <div className="form-group">
                        <input type="text" 
                                name="year"
                                className="form-control"   
                                placeholder="Enter Year Published" 
                                value={this.state.year}  
                                onChange={this.handleValueChange.bind(this)}                       
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" 
                                className="btn btn-success">
                                {this.state.id ? 'Update': 'Add'}  
                        </button>
                        <button type="button" 
                                className="btn btn-default" 
                                onClick={this.handleReset.bind(this)}>Clear</button>
                    </div>                
                </form>
            </div>
        )
    }
}


const mapStateToProps = (state) => {        
    return {
        errors: state.booksData.errors,
        books: state.booksData.books,
        isLoading: state.booksData.isLoading,
    }
};


const mapDispatchToProps = dispatch => {
    return {
      onAdd: (book) => {
        dispatch(createBook(book));
      }
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(CreateBook);