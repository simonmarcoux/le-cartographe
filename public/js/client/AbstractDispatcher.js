/**
 * Abstract class to create a class as a dispatcher
 * (c) lg2fabrique 2016
 */

export default class AbstractDispatcher {
    //dictionary events list
    constructor() {
        this._listeners = {};

    }

    /**
     * Add event listener to object
     * @param {string} type - Event's type
     * @param {Function} listener - Function
     */
    addListener(type, listener) {
        if (this._listeners[type] === undefined) this._listeners[type] = [];
        if (this._listeners[type].indexOf(listener) === -1) {
            this._listeners[type].push(listener);
        }
    };

    /**
     * Validate event listener
     * @param {string} type - Event's type
     * @param {Function} listener - Function
     */
    hasListener(type, listener) {
        if (this._listeners[type] !== undefined) {
            if(this._listeners[type].indexOf(listener) !== -1){
                return true;
            }
        }
        return false;
    };

    /**
     * Remove event listener
     * @param {string} type - Event's type
     * @param {Function} listener - Function
     */
    removeListener(type, listener) {
        let listenersList = this._listeners[type];
        if (listenersList !== undefined) {
            let index = listenersList.indexOf(listener);
            if (index !== - 1) listenersList.splice(index, 1);
        }
    };

    /**
     * Remove all events listener
     */
    removeAllListener() {
        this._listeners = {};
    };

    /**
     * Dispatch a event
     * @param {any} event - Event to dispatch
     */
    dispatch(event) {

        let listenersList = this._listeners[event.type];

        if (listenersList !== undefined) {
            event.target = this;

            let array = [];
            let length = listenersList.length;

            for ( let i = 0; i < length; i ++ ) {
                array[i] = listenersList[i];
            }

            for ( let j = 0; j < length; j ++ ) {
                array[j].call(this, event);
            }
        }
    };

}
