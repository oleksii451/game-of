import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import ItemList from "../itemList";
import ItemDetails, {Field} from "../itemDetails";
import ErrorMessage from "../errorMessage";
import gotService from "../../services/gotService";
import RowBlock from "../rowBlock";

export default class BooksPage extends Component {

    gotService = new gotService();

    state = {
        selectedBook: null,
        error: false
    }

    componentDidCatch() {
        this.setState({error: true})
    }

    onBookSelected = (id) => {
        this.setState({
            selectedBook: id
        })
    }

    render() {

        if(this.state.error) {
            return <ErrorMessage />
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onBookSelected}
                getData={this.gotService.getAllBooks}
                renderItem={ (item) => item.name}/>
        )

        const bookDetails = (
            <ItemDetails itemId={this.state.selectedBook}
                getData={this.gotService.getBookById}>
                <Field field ='isbn' label='ISBN' />
                <Field field='authors' label='authors' />
            </ItemDetails>
        )
        return (
            <RowBlock left={itemList} right={bookDetails}/>
        )
    }
}