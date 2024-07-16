import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import RegisterVehicleHeaderComponent from '../../components/RegisterVehicle/Header/RegisterVehicleHeaderComponent';
import { Image } from 'expo-image';
import useFetchVehicleById from '../../hooks/useFetchVehicleById';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingComponent } from '../../components/Shared/Loading/LoadingErrorComponents';
import { AppStackParamList } from '../../navigation/MainStack';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { updateVehicle } from '../../services/vehicleService';
import AlertSuccessModal from '../../components/Shared/Modals/AlertSuccessModal';
import AlertErrorModal from '../../components/Shared/Modals/AlertErrorModal';

type UpdateVehicleScreenProps = NativeStackScreenProps<AppStackParamList, 'UpdateVehicle'>;

const UpdateVehicleScreen: React.FC<UpdateVehicleScreenProps> = ({ navigation, route }) => {
  const { id } = route.params;
  const { authData } = useAuth();
  const [place, setPlace] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [color, setColor] = useState('');
  const [model, setModel] = useState('');
  const [entryTimes, setEntryTimes] = useState('');
  const [departureTimes, setDepartureTimes] = useState('');
  const { vehicle, loading, refetch } = useFetchVehicleById(authData?.token || '', id);
  const [isEditable, setIsEditable] = useState(false); // Estado para controlar se os campos estão editáveis
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (vehicle) {
      setPlace(vehicle.licensePlate);
      setManufacturer(vehicle.manufacturer);
      setColor(vehicle.color);
      setModel(vehicle.model);
      setEntryTimes(vehicle.entryTimes);
      setDepartureTimes(vehicle.departureTimes);
    }
  }, [vehicle]);

  const handleEditPress = () => {
    setIsEditable(!isEditable);
  };

  const handleSavePress = async () => {
    try {
        const response = await updateVehicle(authData?.token || '', id, manufacturer, color, model, place, entryTimes, departureTimes);
        setSuccess(`Veículo ${response.licensePlate} atualizado!`);
        setIsEditable(!isEditable);               
    } catch (error) {
      setError(error.message);
    }
};

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <View style={styles.container}>
            <AlertErrorModal visible={!!error} onClose={() => setError('')} message={error} />
            <AlertSuccessModal visible={!!success} onClose={() => setSuccess('')} message={success} />

      <RegisterVehicleHeaderComponent
        title="Veículo Cadastrado"
        subtitle="Visualize, edite, libere ou exclua as informações do veículo selecionado."
        onPress={() => navigation.goBack()}
      />
      
      {!isEditable && (
        <TouchableOpacity
          style={[styles.buttonUpdate]}
          onPress={handleEditPress}
        >
          <Text style={styles.buttonLabelUpdate}>Editar</Text>
          <Image source={require("../../../assets/update.svg")} style={styles.imageButtonUpdate} />
        </TouchableOpacity>
      )}

      {isEditable && (
        <TouchableOpacity
          style={[styles.buttonSave]}
          onPress={handleSavePress}
        >
          <Text style={styles.buttonLabelUpdate}>Salvar</Text>
          <Image source={require("../../../assets/save.png")} style={styles.imageButtonSave} />
        </TouchableOpacity>
      )}

      <View style={styles.dataContainer}>
        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <Text style={styles.labelInput}>Placa</Text>
            <TextInput
              style={styles.input}
              value={place}
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              onChangeText={setPlace}
              editable={isEditable} // Controla se o campo está editável
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelInput}>Fabricante</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              value={manufacturer}
              onChangeText={setManufacturer}
              editable={isEditable} // Controla se o campo está editável
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <Text style={styles.labelInput}>Cor</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              value={color}
              onChangeText={setColor}
              editable={isEditable} // Controla se o campo está editável
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelInput}>Modelo</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              value={model}
              onChangeText={setModel}
              editable={isEditable} // Controla se o campo está editável
            />
          </View>
        </View>

        <View style={styles.fullWidthInputContainer}>
          <Text style={styles.labelInput}>Entrada</Text>
          <TextInput
            style={styles.input}
            placeholder="Horário de entrada"
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            value={entryTimes}
            onChangeText={setEntryTimes}
            editable={isEditable} // Controla se o campo está editável
          />
        </View>

        <View style={styles.fullWidthInputContainer}>
          <Text style={styles.labelInput}>Saída</Text>
          <TextInput
            style={styles.input}
            placeholder="Horário de saída"
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            value={departureTimes}
            onChangeText={setDepartureTimes}
            editable={isEditable} // Controla se o campo está editável
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.buttonDelete]}>
            <Text style={styles.buttonLabel}>Excluir</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.buttonLiberar]}>
            <Text style={styles.buttonLabel}>Liberar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E1E1E",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flex: 1,
    marginTop: 25,
    marginBottom: 25,
    marginHorizontal: 8,
  },
  labelInput: {
    fontFamily: "Roboto-Regular",
    position: 'absolute',
    top: -10,
    color: "rgba(255, 255, 255, 0.6)",
    paddingHorizontal: 5,
  },
  input: {
    paddingVertical: 10,
    color: "rgba(255, 255, 255, 0.6)",
    fontFamily: "Jura-Medium",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.6)",
  },
  fullWidthInputContainer: {
    width: '100%',
    marginTop: 25,
    marginBottom: 25,
  },
  dataContainer: {
    margin: 41,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    height: 42,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  buttonLabel: {
    color: "#FFF",
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 26,
    letterSpacing: 0.46,
    textAlign: 'center',
  },
  buttonLiberar: {
    backgroundColor: "#0393AE",
  },
  buttonDelete: {
    backgroundColor: "#F44336",
  },
  buttonUpdate: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    left: 47,
    width: 100,
    height: 37,
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: "#5F5F5F",
  },
  buttonSave: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    left: 47,
    width: 100,
    height: 37,
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: "#4CAF50",
  },
  buttonLabelUpdate: {
    color: "#FFF",
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 26,
    letterSpacing: 0.46,
    textAlign: 'center',
  },
  imageButtonUpdate: {
    width: 20,
    height: 20,
  },
  imageButtonSave: {
    width: 20,
    height: 20,
  },
});

export default UpdateVehicleScreen;
