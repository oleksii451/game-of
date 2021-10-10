import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from "../errorMessage";
import {CharacterPage, BooksPage, HousesPage}   from "../pages";

import './app.css';

export default class App extends Component {

    state = {
        showRandomChar: false,
        error: false,
        selectedBook: 1,
        selectedHouse: 1,

    };

    componentDidCatch() {
        console.log( 'error' );
        this.setState({error: true})
    }

    toggleRandomChar = () => {
        this.setState( (state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    }

    render() {
        if(this.state.error) {
            return <ErrorMessage />
        }
        const char = this.state.showRandomChar ? <RandomChar/> : null;

        if (this.state.error) {
            return ErrorMessage;
        }
        return (
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                            <button
                                className='toggle-btn' onClick={this.toggleRandomChar}>Random Character
                            </button>
                        </Col>
                    </Row>
                    {<CharacterPage/>}
                    {<BooksPage/>}
                    {<HousesPage/>}
                </Container>
            </>
        );
    }
};
