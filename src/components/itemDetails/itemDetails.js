import React, {Component} from 'react';
import './charDetails.css';
import ErrorMessage from "../errorMessage";

const Field = ({item, field, label}) => {
    return(
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{ label }</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {Field};

export default class ItemDetails extends Component {

    state = {
        itemId : null,
        item: null,
        error: false
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.itemId !== this.props.itemId) {
            this.updateItem();
        }
    }

    updateItem () {
        const {itemId, getData} = this.props;
        if (!itemId) {
            return;
        }
        getData(itemId)
            .then ( ( item ) => {
                this.setState ( {item} )
            } )
    }

    render() {

        if(this.state.error) {
            return <ErrorMessage />
        }

        if(!this.state.item) {
            return (
                <span className = 'select-error'>Please choose the character</span>
                )
        }

        const {item} = this.state;
        const {name} = item;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </div>
        )
    }
}