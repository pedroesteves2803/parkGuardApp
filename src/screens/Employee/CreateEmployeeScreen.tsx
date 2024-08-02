import React, { useState } from 'react';
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
import { createEmployee } from '../../services/employeeService';

type CreateEmployeeScreenProps = NativeStackScreenProps<AppStackParamList, 'CreateEmployee'>;

const CreateEmployeeScreen: React.FC<CreateEmployeeScreenProps> = ({ navigation }) => {
    const { authData} = useAuth();
    const [success, setSuccess] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [type, setType] = useState('');
    const [loading, setLoading] = useState<boolean>(false);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
    };

    const handleCreateEmployee = async () => {
        setLoading(true);

        if (name === ''|| email === '' || password === '' || passwordConfirmation === '' || type === '') {
            setError('Preencha os campos para continuar.');
            setLoading(false);  
            return;
        }

        if(password !== passwordConfirmation) {
            setError('Senhas não identicas.')
            setLoading(false);  
            return;
        }
    
        if (!validateEmail(email)) {
            setError('Por favor, insira um email válido.');
            setLoading(false);  
            return;
        }

        await createEmployee(authData?.token || '', name, email, password, Number(type));

        setLoading(false);
        setSuccess('Funcionário salvo com sucesso.');
        navigation.navigate('ListEmployees');
    };

    return (
        <View style={styles.body}>
            <AlertErrorModal visible={!!error} onClose={() => setError('')} message={error} />
            <AlertSuccessModal visible={!!success} onClose={() => setSuccess('')} message={success} />
            
            <HeaderComponent
                    title="Funcionário"
                    subtitle="Visualize, edite ou exclua as informações do funcionário selecionado."
                    onPress={() => navigation.navigate('ListEmployees')}
            />
            
            <View style={styles.container}>

                <View style={styles.inputContainer}>
                    <InputComponent 
                        label="Nome" 
                        placeholder="Insira o nome" 
                        onValueChange={setName}
                    />
                    <InputComponent 
                        label="E-mail" 
                        placeholder="Insira o e-mail" 
                        onValueChange={setEmail}
                    />
                    <InputComponent 
                        label="Senha" 
                        placeholder="Insira sua senha" 
                        onValueChange={setPassword}
                        isPassword={true} 
                    />            
                    <InputComponent 
                        label="Confirmação de senha" 
                        placeholder="Confirmar senha" 
                        onValueChange={setPasswordConfirmation}
                        isPassword={true} 
                    />

                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={type}
                            onValueChange={(itemValue) => setType(itemValue)}
                            style={styles.picker}
                            prompt="Selecione o tipo de funcionário"
                        >
                            <Picker.Item color={Platform.select({ ios: '#fff', android: '#000' })} label="Administrador" value="1" />
                            <Picker.Item color={Platform.select({ ios: '#fff', android: '#000' })} label="Normal" value="2" />
                        </Picker>
                    </View>
                </View>

                {loading && (
                  <LoadingComponent />
                )}

                {!loading && (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleCreateEmployee}>
                            <Text style={styles.buttonLabel}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        backgroundColor: "#1E1E1E",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        flex: 1,
    },
    container: {
        padding: 25,
    },
    inputContainer: {
        marginTop: 50,
        marginBottom: 0,
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
        backgroundColor: "#0393AE",
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
    pickerContainer: {
        width: '100%', 
    },
    picker: {
        // height: Platform.select({ ios: 100, android: 50 }),
        color: "rgba(255, 255, 255, 0.6)",
    },
});

export default CreateEmployeeScreen;
