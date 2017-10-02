import constants from '../constants'

let initialState = {
    venueList: [],
    center: {},
    bound:[]
}

export default (state = initialState, action) => {
    let newState = Object.assign({}, state)

    switch (action.type) {
        case constants.SEARCH_VENUES:
            const venuesList = action.payload.data.response.venues.slice(0, 8)
            newState['venueList'] = venuesList

            /* calculate average lat and lng */
            
            const averageLat = venuesList.map(function (venue, i, arr) {
                    return venue.location.lat / arr.length
                })
                .reduce(function (a, b) {
                    return a + b
                })
            const averageLng = venuesList.map(function (venue, i, arr) {
                    return venue.location.lng / arr.length
                })
                .reduce(function (a, b) {
                    return a + b
                })
            newState['center'] = {
                lat: averageLat,
                lng: averageLng
            }
            let newBound = [];                        
            for (let i =0; i<venuesList.length; i++) { 
                newBound.push(venuesList[i].location);
            }
            newState['bound'] = newBound

            return newState
            break;
        default:
            return state
    }
}