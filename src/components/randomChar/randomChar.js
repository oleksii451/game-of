import React, {Component} from 'react';
import './randomChar.css';
import gotService from "../../services/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";
import PropTypes from 'prop-types';

export default class RandomChar extends Component {

    gotService = new gotService();
    state = {
        char:{},
        loading: true,
        error: false
    }

    static defaultProps = {
        interval: 15000
    }
    static propTypes = {
        interval: PropTypes.number
        }


    componentDidMount() {
        console.log( 'mounting' );
        this.updateChar();
        this.timerId = setInterval(this.updateChar, this.props.interval);
    }

    componentWillUnmount() {
        console.log( 'unmounting' );
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            error: false
        })
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        });
    }

    updateChar = () => {
        console.log( 'update' );
        const id = Math.floor(Math.random() * 140 + 25);

        this.gotService.getCharacterById(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render() {

        console.log( 'render' );

        const {char, loading, error } = this.state;

        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}



const View = ({char :{name, gender, born, died, culture} }) => {
    return (
    <>
        <h4>Random Character: {name}</h4>
        <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between">
                <span className="term">Gender </span>
                <span>{gender}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
                <span className="term">Born </span>
                <span>{born}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
                <span className="term">Died </span>
                <span>{died}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
                <span className="term">Culture </span>
                <span>{culture}</span>
            </li>
        </ul>
    </>
    )
}