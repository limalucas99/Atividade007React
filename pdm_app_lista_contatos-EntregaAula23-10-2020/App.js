import React from 'react';
import { AppLoading } from 'expo';
import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import contactsReducer from './store/contacts-reducers'
import ContactsNavigator from './navigation/ContactsNavigator';
import { init } from './helpers/db';

export default function App() {
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold
  });

  init()
    .then(() => console.log('Banco criado com sucesso'))
    .catch((err) => console.log(`Erro ao criar o banco: ${err}`))

  const rootReducer = combineReducers({
    contacts: contactsReducer
  });

  const store = createStore(rootReducer, applyMiddleware(reduxThunk));

  return !fontsLoaded 
  ? <AppLoading /> 
  : (
    <Provider store={store}>
      <ContactsNavigator />
    </Provider>
  );
}
