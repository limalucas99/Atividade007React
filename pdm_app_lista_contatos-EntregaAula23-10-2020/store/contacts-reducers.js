import { ADD_CONTACT, GET_CONTACTS, REMOVE_CONTACT } from './contacts-actions';
import Contact from '../modelos/Contact'

const initialState = {
  contacts: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case ADD_CONTACT:
      const contact = new Contact(
        action.contact.id.toString(),
        action.contact.name,
        action.contact.number,
        action.contact.imageURI
      );
      return {
        contacts: state.contacts.concat(contact)
      }
    case GET_CONTACTS:
    case REMOVE_CONTACT:
      return {
        contacts: action.contacts.map(contact => new Contact(contact.id.toString(), contact.name, contact.number, contact.imageURI))
      }
    default:
      return initialState;
  }
}