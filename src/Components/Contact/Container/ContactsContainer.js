import { connect } from 'react-redux';
import contactsComponent from '../Contact'
import { fetchContactsRequest } from '../../../store/actions/contacts'

const mapDispatchToProps = (dispatch) => {
    return {
        fetchContactsRequest:() => dispatch(fetchContactsRequest()),
    }
}
const mapStateToProps = (state) => {
    return {
        contacts : state.contacts,
    }
}

const ContactsContainer = connect(mapStateToProps, mapDispatchToProps)(contactsComponent)
export default ContactsContainer;
