import React, {Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Books from './containers/Books';
import CreateBook from './containers/CreateBook';
import { history } from './index';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      book: null,
    };

    this.onEdit = this.onEdit.bind(this);
  }

  onEdit(book) {
    this.setState({book: book});
    history.push({
      pathname: `/edit/${book.id}`,
      state: { 
        book: book
       }
    });    
  }

  render() {
      return (
        <Router >      
          <div className="App">              
              <Route path="/" 
                  exact 
                  render={ (props) => <Books { ...props } 
                  onEdit={this.onEdit}  />} 
                />
              <Route path="/create/"                   
                  render={ (props) => <CreateBook { ...props } 
                    book={this.state.book}                        
                  />} 
              />
              <Route path="/edit/:id"                   
                  render={ (props) => <CreateBook { ...props } 
                    book={this.state.book}                        
                  />} 
                />
          </div>
        </Router>
      );
  }
}

export default App;
