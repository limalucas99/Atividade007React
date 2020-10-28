import { Alert } from 'react-native';
import { documentDirectory, moveAsync } from 'expo-file-system';
import { getAllContacts, insertContact, deleteContact } from '../helpers/db';

export const ADD_CONTACT = 'ADD_CONTACT';
export const REMOVE_CONTACT = 'REMOVE_CONTACT';
export const GET_CONTACTS = 'GET_CONTACTS';

export const getContacts = () => {
  return async dispatch => {
    try {
      const result = await getAllContacts();
      dispatch({type: GET_CONTACTS, contacts: result.rows._array || []})
    } 
    catch(err) {
      Alert.alert('Erro', 'Ocorreu um erro ao buscar os contatos.');
      throw err;
    }
  }
}

export const addContact = (name, number, imageURI, location) => {
  return async dispatch => {
    let imagePath;
    
    try {
      if(imageURI) {
        const fileName = imageURI.split('/').pop();
        imagePath = documentDirectory + fileName;

        await moveAsync({
          from: imageURI,
          to: imagePath
        });
      } 
      const result = await insertContact(name, number, imagePath, location);

      dispatch({type: ADD_CONTACT, contact: {id: result.insertId, name: name, number: number, imageURI: imagePath}});
    }
    catch(err) {
      Alert.alert('Erro', 'Ocorreu um erro ao inserir o usuário.');
      throw err;
    }
  }
}

export const removeContact = (id) => {
  return async dispatch => {
    try {
      await deleteContact(id);
      const result = await getAllContacts();
      
      dispatch({type: GET_CONTACTS, contacts: result.rows._array || []})
    }
    catch(err) {
      Alert.alert('Erro', 'Ocorreu um erro ao excluir o usuário.');
      throw err;
    }
  }
}