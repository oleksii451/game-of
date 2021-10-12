import React, {Component} from 'react';
import GotService from "../../services/gotService";
import ItemDetails , {Field} from "../itemDetails";

export default class BooksItem extends Component {
    gotService = new GotService();

    render () {
        return (
            <ItemDetails itemId={this.props.bookId}
                         getData={this.gotService.getBookById}>
                <Field field ='isbn' label='ISBN' />
                <Field field='authors' label='authors' />
                <Field field='released' label='Released' />
            </ItemDetails>
        );
    }
}