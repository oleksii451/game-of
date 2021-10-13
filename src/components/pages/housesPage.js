import React, {Component} from 'react';
//import {Col, Row, Container} from 'reactstrap';
import ItemList from "../itemList";
import ItemDetails, {Field} from "../itemDetails";
import ErrorMessage from "../errorMessage";
import GotService from "../../services/gotService";
import RowBlock from "../rowBlock";

export default class HousesPage extends Component {

    gotService = new GotService();

    state = {
        selectedHouse: null,
        error: false
    }

    componentDidCatch() {
        this.setState({error: true})
    }

    onHouseSelected = (id) => {
        this.setState({
            selectedHouse: id
        })
    }

    render() {

        if(this.state.error) {
            return <ErrorMessage />
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onHouseSelected}
                getData={this.gotService.getAllHouses}
                renderItem={ (item) => item.name}
            />
        )

        const houseDetails = (
            <ItemDetails itemId={this.state.selectedHouse}
                         getData={this.gotService.getHouseById}>
                <Field field ='region' label='region' />
                <Field field='founded' label='founded' />
            </ItemDetails>
        )
        return (
            <RowBlock left={itemList} right={houseDetails}/>
        )
    }
}

