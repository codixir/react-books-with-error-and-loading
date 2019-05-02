import React, { Component } from 'react';
import { createBook } from '../actions/book.actions';
import { connect } from 'react-redux';

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

    componentWillReceiveProps(nextProps) {        
        if (nextProps.book) {
            this.setState({
                id: nextProps.book.id,
                title: nextProps.book.title,
                author: nextProps.book.author,
                year: nextProps.book.year,
            })
        }
                         
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors,
            });
        }
    }

    render() {
        return (
            <div>
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
    const scope = state.booksData.errors ? state.booksData.errors.scope : '';
    return {
        errors: (scope === 'create-book') ? state.booksData.errors: null,
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