import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import ItemList from "../itemList";
import ItemDetails, {Field} from "../itemDetails";
import ErrorMessage from "../errorMessage";
import gotService from "../../services/gotService";
import RowBlock from "../rowBlock";


export default class CharacterPage extends Component {

    gotService = new gotService();

    state = {
        selectedChar: null,
        error: false
    }
    componentDidCatch() {
        this.setState({error: true})
    }

    onItemSelected = (id) => {
        this.setState({
            selectedItem: id
        })
    }

    render() {

        if(this.state.error) {
            return <ErrorMessage />
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllCharacters}
                renderItem={ ({name, gender}) => `${name} (${gender})` }/>
        )

        const charDetails = (
            <ItemDetails
                 itemId={this.state.selectedChar}
                 getData={this.gotService.getCharacterById}>
                <Field field ='gender' label='Gender' />
                <Field field='born' label='Born' />
            </ItemDetails>
        )
        return (
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}