export default class GotService {
    constructor () {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResource = async url => {
        const res = await fetch ( `${ this._apiBase }${ url }` );

        if (!res.ok) {
            throw new Error ( `could not fetch ${ url }, status: ${ res.status }` );
        }
        return await res.json ();
    };

    getAllCharacters = async () => {
        const res = await this.getResource ( `/characters?page=4&pageSize=10` );
        return res.map ( this._transformChar );
    };

    getCharacterById = async ( id ) => {
        const char = await this.getResource ( `/characters/${ id }` );
        return this._transformChar ( char );
    }

    getAllBooks = async () => {
        const res = await this.getResource ( '/books/' );
        return res.map ( this._transformBook );
    };

    getBookById = async ( id ) => {
        const book = await this.getResource ( `/books/${ id }` );
        return this._transformBook ( book );
    }

    getAllHouses = async () => {
        const res = await this.getResource ( '/houses/?page=2&pageSize=10' );
        return res.map(this._transformHouse);
    };

    getHouseById = async ( id ) => {
        const house = await this.getResource ( `/houses/${ id }` );
        return this._transformHouse ( house ) ;
    }

    isSet ( data ) {
        if (data) {
            return data
        } else {
            return 'no data..'
        }
    }

    _extractId = (item) => {
        const idRegExp = /\/(\d*)$/;
        return item.url.match(idRegExp)[1];
    }

    _transformChar = ( char ) => {
        return {
            id: this._extractId(char),
            name: this.isSet ( char.name ) ,
            gender: this.isSet ( char.gender ) ,
            born: this.isSet ( char.born ) ,
            died: this.isSet ( char.died ) ,
            culture: this.isSet ( char.culture ) ,
        }
    }

    _transformHouse = ( house ) => {
        return {
            id: this._extractId(house),

            name: this.isSet ( house.name ) ,
            region: this.isSet ( house.region ) ,
            coatOfArms: this.isSet ( house.coatOfArms ) ,
            words: this.isSet ( house.words ) ,
            overlord: this.isSet ( house.overlord ) ,
            founded: this.isSet ( house.founded ) ,
            founder: this.isSet ( house.founder ) ,
            diedOut: this.isSet ( house.diedOut ) ,
            ancestralWeapons: this.isSet ( house.ancestralWeapons ) ,
            swornMembers: this.isSet ( house.swornMembers ) ,
        }
    }

    _transformBook = ( book ) => {
        return {
            id: this._extractId(book),

            name: this.isSet ( book.name ) ,
            isbn: this.isSet ( book.isbn ) ,
            authors: this.isSet ( book.authors ) ,
            numberOfPages: this.isSet ( book.numberOfPages ) ,
            publiser: this.isSet ( book.publiser ) ,
            country: this.isSet ( book.country ) ,
            mediaType: this.isSet ( book.mediaType ) ,
            released: this.isSet ( book.released ) ,
            characters: this.isSet ( book.characters ) ,
            povCharacters: this.isSet ( book.povCharacters ) ,
        }
    }
}

