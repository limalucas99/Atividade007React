import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { launchImageLibraryAsync } from 'expo-image-picker';
import Colors from '../constantes/Colors';

const CaptureImage = (props) => {
  const [imageURI, setImageURI] = useState();

  const handleSelectImage = async () => {
    const image = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [40, 40],
      quality: 1
    });
    
    setImageURI(image.uri);
    props.onCaptureImage(image.uri);
  }

  return (
    <View style={styles.container}>
      <View style={styles.imagePreview}>
        {
          imageURI ?
            <Image
              source={{uri: imageURI}}
              style={styles.image}
            />
            :
            <Text style={styles.imageEmpty}>Nenhuma foto</Text>
        }
      </View>
      <RectButton onPress={handleSelectImage} style={styles.selectImageButton}>
        <Text style={styles.selectImageButtonText}>Selecionar imagem</Text>
      </RectButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 16
  },
  imagePreview: {
    width: 200,
    height: 190,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#CCC',
    borderWidth: 1
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100
  },
  imageEmpty: {
    fontFamily: 'Archivo_400Regular',
    fontSize: 17
  },
  selectImageButton: {
    backgroundColor: Colors.primary,
    height: 50,
    width: 200,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectImageButtonText: {
    color: Colors.white,
    fontFamily: 'Archivo_400Regular',
    fontSize: 16
  }
});

export default CaptureImage;