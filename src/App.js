import React, {Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Books from './containers/Books';
import CreateBook from './containers/CreateBook';

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
  }

  render() {
      return (
        <Router >      
          <div className="App">
   
              <Link to="/create/" className="btn btn-primary">Create</Link>

              <Route path="/" exact component={Books} />
              <Route path="/create/" component={CreateBook} />


            {/* <div className="create-form-container">
              <CreateBook 
                book={this.state.book}
              />
            </div>
            <div className="books-table-container">
              <Books 
                onEdit={this.onEdit}    
              />
            </div> */}
          </div>
        </Router>
      );
  }
}

export default App;
