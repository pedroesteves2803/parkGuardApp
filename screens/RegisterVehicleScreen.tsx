import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../stacks/AppStack';
import HeaderInternalComponent from '../components/Header/HeaderInternalComponent';
import RegisterVehicleStatusSegmentedControl from '../components/Control/RegisterVehicleStatusSegmentedControl';
import * as ImagePicker from 'expo-image-picker';
import { createVehicle, detectPlace } from '../services/cartService';


const RegisterVehicleScreen: React.FC = () => {
    const { authData } = useAuth();
    const navigation = useNavigation<StackNavigationProp<AppStackParamList>>();
    const [currentSegment, setCurrentSegment] = useState<'Carregar imagem' | 'Digitar placa'>('Carregar imagem');
    const [place, setPlace] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [cameraStatus, cameraRequestPermission] = ImagePicker.useCameraPermissions();
    const [mediaStatus, mediaRequestPermission] = ImagePicker.useMediaLibraryPermissions();

    const saveVehicleInput = async () => {
        try {
            setImage(null);
            const response = await createVehicle(authData?.token || '', place);
            console.log('teste:', response);
        } catch (error) {
            console.error('Erro ao detectar placa:', error.message);
        }
    };

    const saveVehicleImage = async () => {
        try {
            const response = await createVehicle(authData?.token || '', place);
            console.log('teste:', response);
        } catch (error) {
            console.error('Erro ao detectar placa:', error.message);
        }
    };

    const detectPlaceService = async (imageUri: string) => {
        try {
            const detectedPlace = await detectPlace(imageUri);
            setPlace(detectedPlace);
        } catch (error) {
            console.error('Erro ao detectar placa:', error.message);
        }
    };

    const captureImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
        detectPlaceService(result.assets[0].uri)
      }
    };

    if(cameraStatus === null)
    {
      cameraRequestPermission();
    }

    if(mediaStatus === null)
    {
      mediaRequestPermission();
    }

    const handleSegmentChange = (segment: 'Carregar imagem' | 'Digitar placa') => {
      setCurrentSegment(segment);
    };

    return (
        <View style={styles.container}>
            <HeaderInternalComponent
              title="Registro de veículo" 
              subtitle="Capture uma foto ou digite a placa para salvar o registro" 
              onPress={() => navigation.goBack()} 
            />

            <View style={styles.body}>
              <RegisterVehicleStatusSegmentedControl initialSegment={currentSegment} onSegmentChange={handleSegmentChange} />

              {currentSegment === "Carregar imagem" && (
              <View>
                <TouchableOpacity onPress={captureImage}> 
                  <View style={styles.section}>
                    <Image source={require('../assets/sendImage.png')} style={styles.sendImage} />
                    <Text style={styles.label}>Clique para carregar uma imagem ou tirar uma nova foto da placa do veículo</Text>
                    <Text style={styles.labelTypes}>Suportado: PNG, JPG, JPEG</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={saveVehicleImage}>
                  <Text style={styles.buttonLabel}>SALVAR</Text>
                </TouchableOpacity>
              </View>
             
              )}

              {currentSegment === "Digitar placa" && (
                <View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.labelInput}>Placa</Text>
                    <View style={styles.inputWrapper}>
                      <TextInput 
                        style={styles.input} 
                        placeholder="ABC-1234"
                        placeholderTextColor="rgba(255, 255, 255, 0.6)"
                        onChangeText={setPlace}
                      />
                    </View>
                  </View>

                  <TouchableOpacity style={styles.button} onPress={saveVehicleInput}>
                    <Text style={styles.buttonLabel}>SALVAR</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {place && <Text style={styles.label}> { place } </Text>}
        </View>
    );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  container: {
    backgroundColor: "#1E1E1E",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    flex: 1,
  },
  body: {
    padding: 25
  },
  section: {
    marginTop: 16,
    marginBottom: 16,
    height: 250,
    alignItems: 'center',
    padding: 25,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#9C9C9C",
    borderStyle: 'dashed',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Inter-Regular',
    fontWeight: 400,
    lineHeight: 16,
    textAlign: 'center',
    color: "#BCBCBC"
  },
  labelTypes: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: 'Inter-Regular',
    fontWeight: 400,
    lineHeight: 14,
    textAlign: 'center',
    color: "#838383"
  },
  sendImage: {
    width: 57,
    height: 57,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  button:{
    height: 42,
    borderRadius: 8,
    backgroundColor: "#0393AE",
    justifyContent: 'center', 
  },
  buttonLabel: {
    color: "#FFF",
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 26,
    letterSpacing: 0.46000000834465027,
    textAlign: 'center',
  },
  inputContainer: {
    marginTop: 50,
    marginBottom: 40,
  },
  inputWrapper: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: "rgba(255, 255, 255, 0.6)",
    borderWidth: 1,
    borderRadius: 5,
  },
  labelInput: {
    fontFamily: "Roboto-Regular",
    position: 'absolute',
    top: -10,
    left: 10,
    color: "rgba(255, 255, 255, 0.6)",
    paddingHorizontal: 5,
  },
  input: {
    flex: 1,
    padding: 10,
    color: "rgba(255, 255, 255, 0.6)",
    fontFamily: "Jura-Medium",
  },
  // progressBar: {
  //   width: '100%',
  //   height: 10,
  //   backgroundColor: '#ccc',
  //   borderRadius: 5,
  //   overflow: 'hidden',
  // },
  // progressBarFill: {
  //   height: '100%',
  //   backgroundColor: '#007bff',
  // },
});

export default RegisterVehicleScreen;
