import * as Types from '../actions/types';

const init = []

const propertyReducer = (state = init, action) => {
    switch (action.type) {
        case Types.LOAD_PROPERTIES:
            {
                return action.payload.properties;
            }
        case Types.CREATE_PROPERTY:
            {
                let properties = [...state]
                properties.unshift(action.payload.property);
                return properties
            }
        case Types.REMOVE_PROPERTY:
            {
                let properties = [...state];
                return properties.filter(trans => {
                    return trans._id !== action.payload.id
                })
            }
        case Types.UPDATE_PROPERTY:
            {
                let properties = [...state];
                return properties.map(property => {
                    if (property._id == action.payload.property.id) {
                        return action.payload.property
                    }
                    return property;
                })
            }
        default:
            return state;
    }
}

export default propertyReducer;