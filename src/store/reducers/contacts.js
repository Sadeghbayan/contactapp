import {
    FETCH_CONTACTS,
    FETCH_CONTACTS_SUCCESS,
    FETCH_CONTACTS_FAILED
} from '../actions/names';
import {CONFIG} from '../../Config'



const cantacts = (state = [], action) => {
    switch (action.type) {
        case FETCH_CONTACTS:
            return {
                ...state,
                loading: true,
                error: false
            }
        case FETCH_CONTACTS_SUCCESS:
            // to create a array of element based on default CONFIG
            let contacts = []
            let contactArray = {};
            const users = action.data.results;
            var tabs = CONFIG.tabs
            const contactList = tabs.map(item => {
                return contactArray[item] = ''
            })
            const removeUnnecessaryList = users.filter(item => tabs.includes(item.name.last.charAt(0).toLowerCase()))
                                                .map((item,index) => {
                                                    const firstCharOfLastName = item.name.last.charAt(0).toLowerCase();
                                                    if(contactArray[firstCharOfLastName]){
                                                        contactArray[firstCharOfLastName].push(item)
                                                    }else {
                                                        contactArray[firstCharOfLastName] = [item]
                                                    }
                                                    return contactArray
                                                })
            contacts["tabs"] = tabs
            contacts["contactArray"] = contactArray
            return {
                ...state,
                contacts: contacts,
                loading: false,
                error: false
            }
        case FETCH_CONTACTS_FAILED:
            return {
                ...state,
                loading: false,
                error: true
            }
        default:
            return state
    }
}

export default cantacts;
