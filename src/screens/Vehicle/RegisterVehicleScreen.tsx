import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../contexts/AuthContext';
import { AppStackParamList } from '../../navigation/MainStack';
import RegisterVehicleSegmentedControl from '../../components/RegisterVehicle/Controls/RegisterVehicleSegmentedControl';
import { createVehicle } from '../../services/vehicleService';
import { detectPlace } from '../../services/plateDetection';
import AlertErrorModal from '../../components/Shared/Modals/AlertErrorModal';
import AlertSuccessModal from '../../components/Shared/Modals/AlertSuccessModal';
import { LoadingComponent } from '../../components/Shared/Loading/LoadingErrorComponents';
import HeaderComponent from '../../components/Shared/Header/HeaderComponent';


const RegisterVehicleScreen: React.FC = () => {
    const { authData } = useAuth();
    const navigation = useNavigation<StackNavigationProp<AppStackParamList>>();
    const [currentSegment, setCurrentSegment] = useState<'Carregar imagem' | 'Digitar placa'>('Carregar imagem');
    const [place, setPlace] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [image, setImage] = useState<string | null>(null);
    const [cameraStatus, cameraRequestPermission] = ImagePicker.useCameraPermissions();
    const [mediaStatus, mediaRequestPermission] = ImagePicker.useMediaLibraryPermissions();
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const saveVehicleInput = async () => {
        try {
            setLoading(true)
            setImage(null);
            const response = await createVehicle(authData?.token || '', place);
            setSuccess(`Veículo ${response.licensePlate} adicionado!`);
            setLoading(false)
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError('Ocorreu um erro desconhecido.');
          }
          setLoading(false)
        }
    };

    const saveVehicleImage = async () => {
        try {
            setLoading(true)
            const response = await createVehicle(authData?.token || '', place);
            setSuccess(`Veículo ${response.licensePlate} adicionado!`);
            setLoading(false)
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError('Ocorreu um erro desconhecido.');
          }
          setLoading(false)
        }
    };

    const detectPlaceService = async (imageUri: string) => {
        try {
            setLoading(true)
            const detectedPlace = await detectPlace(authData?.token || '', imageUri);
            setPlace(detectedPlace);
            setLoading(false)
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError('Ocorreu um erro desconhecido.');
          }
          setLoading(false)
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

    const handleCloseImage = () => {
        setImage(null);
    };

    return (
        <View style={styles.container}>
            <AlertErrorModal visible={!!error} onClose={() => setError('')} message={error} />
            <AlertSuccessModal visible={!!success} onClose={() => setSuccess('')} message={success} />

            <HeaderComponent
              title="Registro de veículo" 
              subtitle="Capture uma foto ou digite a placa para salvar o registro" 
              onPress={() => navigation.goBack()} 
            />

            <View style={styles.body}>
              <RegisterVehicleSegmentedControl initialSegment={currentSegment} onSegmentChange={handleSegmentChange} />

              {currentSegment === "Carregar imagem" && (
              <View>
                {image && (
                  <View style={styles.imageRenderContainer}>
                    <Image source={{ uri: image }} style={styles.imageRender} />
                    <TouchableOpacity style={styles.closeButton} onPress={handleCloseImage}>
                        <Text style={styles.closeButtonText}>Fechar</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {!image && (
                  <TouchableOpacity onPress={captureImage}> 
                    <View style={styles.section}>
                      <Image source={require("../../../assets/sendImage.png")} style={styles.sendImage} />
                      <Text style={styles.label}>Clique para carregar uma imagem ou tirar uma nova foto da placa do veículo</Text>
                      <Text style={styles.labelTypes}>Suportado: PNG, JPG, JPEG</Text>
                    </View>
                  </TouchableOpacity>
                )}

                {!loading && (
                  <TouchableOpacity style={styles.button} onPress={saveVehicleImage}>
                    <Text style={styles.buttonLabel}>SALVAR</Text>
                  </TouchableOpacity>
                )}

                {loading && (
                  <LoadingComponent />
                )}
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

                  {!loading && (
                    <TouchableOpacity style={styles.button} onPress={saveVehicleInput}>
                      <Text style={styles.buttonLabel}>SALVAR</Text>
                    </TouchableOpacity>
                  )}

                  {loading && (
                    <LoadingComponent />
                  )}
                </View>
              )}
            </View>
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
  imageRenderContainer: {
    marginTop: 16,
    marginBottom: 16,
    alignItems: 'center',
    position: 'relative',
  },
  imageRender: {
      width: 250,
      height: 250,
      borderRadius: 8,
      resizeMode: 'cover',
  },
  closeButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: 20,
      paddingVertical: 5,
      paddingHorizontal: 10,
  },
  closeButtonText: {
      color: '#FFF',
      fontSize: 14,
      fontFamily: 'Roboto-Medium',
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
