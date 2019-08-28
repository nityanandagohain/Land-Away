import * as Types from '../actions/types';

const init = {
    data: [],
    error: {},
}

const propertyReducer = (state = init, action) => {
    switch (action.type) {
        case Types.LOAD_PROPERTIES:
            {
                return action.payload.properties;
            }
        case Types.CREATE_PROPERTY:
            {
                let properties = [...state.data]
                properties.unshift(action.payload.property);
                return properties
            }
        case Types.REMOVE_PROPERTY:
            {
                let properties = [...state.data];
                return properties.filter(trans => {
                    return trans._id !== action.payload.id
                })
            }
        case Types.UPDATE_PROPERTY:
            {
                let properties = [...state.data];
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