import React, { useEffect } from 'react';
import { 
  View,
  Text,
  FlatList,
  StyleSheet, 
  Platform, 
  Alert 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as contactsActions from '../store/contacts-actions';
import ContactItem from '../components/ContactItem';
import ButtonHeader from '../components/ButtonHeader';
import Colors from '../constantes/Colors';

const ContactListScreen = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(contactsActions.getContacts());
  }, [])

  const removeContact = (id) => {
    Alert.alert(
      'Confirmação',
      `Tem certeza que deseja excluir o contato ${contacts.find(contact => contact.id === id)?.name}?`,
      [
        {
          text: 'Sim',
          onPress: () => {
            dispatch(contactsActions.removeContact(id));
          }
        },
        {
          text: 'Cancelar'
        }
      ],
      {cancelable: false}
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Contatos</Text>
      <View style={styles.contactListContainer}>
        {!contacts.length && <Text style={styles.contactListEmpty}>Nenhum contato salvo</Text>}
        <FlatList
          data={contacts}
          keyExtractor={contact => contact.id}
          renderItem={
            (contact) => (
              <ContactItem
                contact={contact.item}
                onDelete={removeContact}
              />
            )
          }
        />
      </View>
    </View>
  );
}

ContactListScreen.navigationOptions = options => {
  return {
    headerTitle: 'Contatos',
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={ButtonHeader}>
          <Item 
            title="Adicionar"
            iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
            onPress={() => {
              options.navigation.navigate('NewContact');
            }}
          />
        </HeaderButtons>
      );
    }
  }
}

export default ContactListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.background
  },
  title: {
    fontFamily: 'Archivo_700Bold',
    fontSize: 38,
    color: Colors.titlePrimary,
    marginBottom: 24,
    textAlign: 'center'
  },
  contactListContainer: {
    flex: 1
  },
  contactListEmpty: {
    fontFamily: 'Archivo_400Regular',
    fontSize: 18,
    color: '#6A6180',
    textAlign: 'center'
  }
}); 

