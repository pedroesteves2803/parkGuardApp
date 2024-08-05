import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Platform } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { useAuth } from '../../contexts/AuthContext';
import { AppStackParamList } from '../../navigation/MainStack';
import AlertErrorModal from '../../components/Shared/Modals/AlertErrorModal';
import AlertSuccessModal from '../../components/Shared/Modals/AlertSuccessModal';
import HeaderComponent from '../../components/Shared/Header/HeaderComponent';
import EmployeeStatusSegmentedControl from '../../components/ListEmployee/Controls/VehicleStatusSegmentedControl';
import EmployeeListComponent from '../../components/ListEmployee/Table/EmployeeListComponent';
import useFetchEmployees from '../../hooks/useFetchEmployees';
import InputComponent from '../../components/Shared/Forms/InputComponent';
import ButtonComponent from '../../components/Shared/Forms/ButtonComponent';
import { LoadingComponent } from '../../components/Shared/Loading/LoadingErrorComponents';
import { Picker } from '@react-native-picker/picker';
import {updateEmployee } from '../../services/employeeService';
import useFetchEmployeeById from '../../hooks/useFetchEmployeeById';

type UpdateEmployeeScreenProps = NativeStackScreenProps<AppStackParamList, 'UpdateEmployee'>;

const UpdateEmployeeScreen: React.FC<UpdateEmployeeScreenProps> = ({ 
    navigation,
    route,
}) => {
    const { id } = route.params;
    const { authData } = useAuth();
    const [success, setSuccess] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [type, setType] = useState<number>(0);
    const [isEditable, setIsEditable] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { employee, refetch } = useFetchEmployeeById(
        authData?.token || "",
        id
    );

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEditPress = () => {
        setIsEditable(true);
    };

    const handleSavePress = async () => {
        setLoading(true);

        if (name === '' || email === '') {
            setError('Preencha os campos para continuar.');
            setLoading(false);  
            return;
        }

        if (!validateEmail(email)) {
            setError('Por favor, insira um email válido.');
            setLoading(false);  
            return;
        }

        await updateEmployee(authData?.token || '', id,  name, email, Number(type));

        setLoading(false);
        setSuccess('Funcionário atualizado com sucesso.');
        navigation.navigate('ListEmployees');
    };
    
    useEffect(() => {
        if (employee) {
            setName(employee.name);
            setEmail(employee.email);
            setType(employee.type);
        }
    }, [employee]);

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

            <HeaderComponent
                title="Funcionários"
                subtitle="Veja a lista de funcionários ativos e desligados do estabelecimento."
                onPress={() => navigation.navigate('ListEmployees')}
            />
            
            <View style={styles.dataContainer}>
                <View style={styles.fullWidthInputContainer}>
                    <Text style={styles.labelInput}>Nome</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu nome"
                        placeholderTextColor="rgba(255, 255, 255, 0.6)"
                        value={name}
                        onChangeText={setName}
                        editable={isEditable}
                    />
                </View>

                <View style={styles.fullWidthInputContainer}>
                    <Text style={styles.labelInput}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu email"
                        placeholderTextColor="rgba(255, 255, 255, 0.6)"
                        value={email}
                        onChangeText={setEmail}
                        editable={isEditable}
                    />
                </View>

                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={type}
                        onValueChange={(itemValue) => setType(itemValue)}
                        style={styles.picker}
                        prompt="Selecione o tipo de funcionário"
                    >
                        <Picker.Item color={Platform.select({ ios: '#fff', android: '#000' })} label="Administrador" value={1} />
                        <Picker.Item color={Platform.select({ ios: '#fff', android: '#000' })} label="Normal" value={2} />
                    </Picker>
                </View>

                <View style={styles.buttonContainer}>

                    {Number(authData?.type) === 1 && (
                        <TouchableOpacity
                            style={[styles.button, styles.buttonDelete]}
                            onPress={() => {}}
                        >
                            <Text style={styles.buttonLabel}>Excluir</Text>
                        </TouchableOpacity>
                    )}

                    {!isEditable ? (
                        <TouchableOpacity
                            style={[styles.button, styles.buttonEdit]}
                            onPress={() => handleEditPress()}
                        >
                            <Text style={styles.buttonLabel}>Editar</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={[styles.button, styles.buttonSave]}
                            onPress={handleSavePress}
                        >
                            <Text style={styles.buttonLabel}>Salvar</Text>
                        </TouchableOpacity>
                    )}
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
        marginTop: 15,
        marginBottom: 15,
    },
    fullWidthInputContainerFinal: {
        width: "100%",
        marginTop: 25,
    },
    dataContainer: {
        marginHorizontal: 41,
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
    buttonEdit: {
        backgroundColor: "#0393AE",
    },
    buttonSave: {
        backgroundColor: "#4CAF50",
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
    imageButtonUpdate: {
        width: 20,
        height: 20,
    },
    imageButtonSave: {
        width: 20,
        height: 20,
    },
    pickerContainer: {
        marginTop: 25,
        marginBottom: 25,
    },
    picker: {
        color: "rgba(255, 255, 255, 0.6)",
    },
});

export default UpdateEmployeeScreen;
