import React, {Component} from 'react';
//import {Col, Row, Container} from 'reactstrap';
import ItemList from "../itemList";

import ErrorMessage from "../errorMessage";
import GotService from "../../services/gotService";
import {withRouter} from 'react-router-dom';
import booksItem from "./booksItem";

class BooksPage extends Component {

    gotService = new GotService();

    state = {
        error: false
    }

    componentDidCatch() {
        this.setState({error: true})
    }

    render() {

        if(this.state.error) {
            return <ErrorMessage />
        }

        return (
            <ItemList
                onItemSelected={(itemId) => {
                    this.props.history.push(itemId)
                } }
                getData={this.gotService.getAllBooks}
                renderItem={ (item) => item.name}/>
        )
    }
}

export default withRouter(BooksPage);