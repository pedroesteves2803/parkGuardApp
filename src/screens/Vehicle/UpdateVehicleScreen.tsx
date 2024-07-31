import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import useFetchVehicleById from "../../hooks/useFetchVehicleById";
import { useAuth } from "../../contexts/AuthContext";
import { LoadingComponent } from "../../components/Shared/Loading/LoadingErrorComponents";
import { AppStackParamList } from "../../navigation/MainStack";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { exitVehicle, updateVehicle } from "../../services/vehicleService";
import AlertSuccessModal from "../../components/Shared/Modals/AlertSuccessModal";
import AlertErrorModal from "../../components/Shared/Modals/AlertErrorModal";
import HeaderComponent from "../../components/Shared/Header/HeaderComponent";

type UpdateVehicleScreenProps = NativeStackScreenProps<
  AppStackParamList,
  "UpdateVehicle"
>;

const UpdateVehicleScreen: React.FC<UpdateVehicleScreenProps> = ({
  navigation,
  route,
}) => {
  const { id } = route.params;
  const { authData } = useAuth();
  const [licensePlate, setLicensePlate] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [color, setColor] = useState("");
  const [model, setModel] = useState("");
  const [entryTimes, setEntryTimes] = useState("");
  const [departureTimes, setDepartureTimes] = useState("");
  const { vehicle, loading, refetch } = useFetchVehicleById(
    authData?.token || "",
    id
  );
  const [isEditable, setIsEditable] = useState(false);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  const [exitUpdate, setExitUpdate] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  useEffect(() => {
    refetch();
  }, [refreshKey]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setRefreshKey((prevKey) => prevKey + 1);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (vehicle) {
      setLicensePlate(vehicle.licensePlate);
      setManufacturer(vehicle.manufacturer);
      setColor(vehicle.color);
      setModel(vehicle.model);
      setEntryTimes(vehicle.entryTimes);
      setDepartureTimes(vehicle.departureTimes);
    }
  }, [vehicle]);

  const handleEditPress = () => {
    setIsEditable(true);

  };

  const handleSavePress = async () => {
    try {
      setLoadingUpdate(true);
      const response = await updateVehicle(
        authData?.token || "",
        id,
        manufacturer,
        color,
        model,
        licensePlate
      );
      setSuccess(`Veículo ${response.licensePlate} atualizado!`);
      setIsEditable(false);
      setLoadingUpdate(false);
      refetch();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Ocorreu um erro desconhecido.");
      }
      setLoadingUpdate(false);
    }
  };

  const handleExitPress = async () => {
    try {
      setExitUpdate(true);
      await exitVehicle(authData?.token || "", licensePlate);
      setSuccess("Veículo retirado!");
      setExitUpdate(false);
      refetch();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Ocorreu um erro desconhecido.");
      }
      setExitUpdate(false);
    }
  };

  const handleReleasePress = async (id: number, licensePlate: string) => {
    navigation.navigate("RegisterPayment", { id, licensePlate });
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <View style={styles.container}>
      <AlertErrorModal
        visible={!!error}
        onClose={() => setError("")}
        message={error}
      />
      <AlertSuccessModal
        visible={!!success}
        onClose={() => setSuccess("")}
        message={success}
      />
      {(loadingUpdate || exitUpdate) && <LoadingComponent />}

      {!loadingUpdate && !exitUpdate && (
        <>
          <HeaderComponent
            title="Veículo Cadastrado"
            subtitle="Visualize, edite, libere ou exclua as informações do veículo selecionado."
            onPress={() => navigation.goBack()}
          />
          {!departureTimes && (
            <>
              {!isEditable ? (
                <TouchableOpacity
                  style={styles.buttonUpdate}
                  onPress={handleEditPress}
                >
                  <Text style={styles.buttonLabelUpdate}>Editar</Text>
                  <Image
                    source={require("../../../assets/update.svg")}
                    style={styles.imageButtonUpdate}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.buttonSave}
                  onPress={handleSavePress}
                >
                  <Text style={styles.buttonLabelUpdate}>Salvar</Text>
                  <Image
                    source={require("../../../assets/save.png")}
                    style={styles.imageButtonSave}
                  />
                </TouchableOpacity>
              )}
            </>
          )}
          <View style={styles.dataContainer}>
            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <Text style={isEditable ? styles.labelInputEditable : styles.labelInput}>Placa</Text>
                <TextInput
                  style={isEditable ? styles.inputEditable : styles.input}
                  value={licensePlate}
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  onChangeText={setLicensePlate}
                  editable={isEditable}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={isEditable ? styles.labelInputEditable : styles.labelInput}>Fabricante</Text>
                <TextInput
                  style={isEditable ? styles.inputEditable : styles.input}
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  value={manufacturer}
                  onChangeText={setManufacturer}
                  editable={isEditable}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <Text style={isEditable ? styles.labelInputEditable : styles.labelInput}>Cor</Text>
                <TextInput
                  style={isEditable ? styles.inputEditable : styles.input}
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  value={color}
                  onChangeText={setColor}
                  editable={isEditable}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={isEditable ? styles.labelInputEditable : styles.labelInput}>Modelo</Text>
                <TextInput
                  style={isEditable ? styles.inputEditable : styles.input}
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  value={model}
                  onChangeText={setModel}
                  editable={isEditable}
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
                editable={false}
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
                editable={false}
              />
            </View>
            <View style={styles.buttonContainer}>
              {!departureTimes && (
                <>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonDelete]}
                    onPress={handleExitPress}
                  >
                    <Text style={styles.buttonLabel}>Retirar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.button, styles.buttonLiberar]}
                    onPress={() => handleReleasePress(id, licensePlate)}
                  >
                    <Text style={styles.buttonLabel}>Liberar</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </>
      )}
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainer: {
    flex: 1,
    marginTop: 25,
    marginBottom: 25,
    marginHorizontal: 8,
  },
  labelInput: {
    fontFamily: "Roboto-Regular",
    position: "absolute",
    top: -10,
    color: "rgba(255, 255, 255, 0.6)",
  },
  labelInputEditable: {
    fontFamily: "Roboto-Regular",
    position: "absolute",
    top: -10,
    color: "#fff",
  },
  input: {
    paddingVertical: 10,
    color: "rgba(255, 255, 255, 0.6)",
    fontFamily: "Jura-Medium",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.6)",
  },
  inputEditable: {
    paddingVertical: 10,
    color: "#FFF",
    fontFamily: "Jura-Medium",
    borderBottomWidth: 1,
    borderBottomColor: "#FFF",
  },
  fullWidthInputContainer: {
    width: "100%",
    marginTop: 25,
    marginBottom: 25,
  },
  dataContainer: {
    margin: 41,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    height: 42,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    justifyContent: "center",
  },
  buttonLabel: {
    color: "#FFF",
    fontFamily: "Roboto-Medium",
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 26,
    letterSpacing: 0.46,
    textAlign: "center",
  },
  buttonLiberar: {
    backgroundColor: "#0393AE",
  },
  buttonDelete: {
    backgroundColor: "#F44336",
  },
  buttonUpdate: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    left: 47,
    width: 100,
    height: 37,
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: "#5F5F5F",
  },
  buttonSave: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    left: 47,
    width: 100,
    height: 37,
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: "#4CAF50",
  },
  buttonLabelUpdate: {
    color: "#FFF",
    fontFamily: "Roboto-Medium",
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 26,
    letterSpacing: 0.46,
    textAlign: "center",
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
