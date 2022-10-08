class Card {
    _value = {
        '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8,
        '9': 9, '10': 10, 'A': 1, 'J': 10, 'K': 10, 'Q': 10
    };
    _color;
    _name;
    constructor(color, name) {
        this._color = color;
        this._name = name;
    }

    /**
     * Get the value of the given card
     * @param {*} name card name
     * @returns card value
     */
    convertNametoValue(name) {
        return this._value[name];
    }
}