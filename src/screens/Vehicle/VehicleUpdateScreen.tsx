import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import RegisterVehicleHeaderComponent from '../../components/RegisterVehicle/Header/RegisterVehicleHeaderComponent';
import { Image } from 'expo-image';
import useFetchVehicleById from '../../hooks/useFetchVehicleById';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingComponent } from '../../components/Shared/Loading/LoadingErrorComponents';
import { AppStackParamList } from '../../navigation/MainStack';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';

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
  const { vehicle, loading, error, refetch } = useFetchVehicleById(authData?.token || '', id);

  useEffect(() => {
    if (vehicle) {
      setPlace(vehicle.licensePlate);
      setManufacturer(vehicle.manufacturer  || '');
      setColor(vehicle.color  || '');
      setModel(vehicle.model  || '');
      setEntryTimes(vehicle.entryTimes  || '');
      setDepartureTimes(vehicle.departureTimes || '');
    }
  }, [vehicle]);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <View style={styles.container}>
      <RegisterVehicleHeaderComponent
        title="Veículo Cadastrado"
        subtitle="Visualize, edite, libere ou exclua as informações do veículo selecionado."
        onPress={() => navigation.goBack()}
      />

      <TouchableOpacity style={styles.buttonUpdate}>
        <Text style={styles.buttonLabelUpdate}>Editar</Text> 
        <Image source={require("../../../assets/update.svg")} style={styles.imageButtonUpdate} />
      </TouchableOpacity>

      <View style={styles.dataContainer}>
        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <Text style={styles.labelInput}>Placa</Text>
            <TextInput
              style={styles.input}
              value={place}
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              onChangeText={setPlace}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelInput}>Fabricante</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              value={manufacturer}
              onChangeText={setManufacturer}
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
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelInput}>Modelo</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              value={model}
              onChangeText={setModel}
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
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.buttonDelete]}>
            <Text style={styles.buttonLabel}>Excluir</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.buttonSave]}>
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
    flex: 1,
    paddingVertical: 20,
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
  buttonSave: {
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
});

export default UpdateVehicleScreen;
