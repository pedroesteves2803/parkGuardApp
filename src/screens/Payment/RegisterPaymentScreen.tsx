import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Platform } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { useAuth } from '../../contexts/AuthContext';
import { AppStackParamList } from '../../navigation/MainStack';
import AlertErrorModal from '../../components/Shared/Modals/AlertErrorModal';
import AlertSuccessModal from '../../components/Shared/Modals/AlertSuccessModal';
import HeaderComponent from '../../components/Shared/Header/HeaderComponent';
import { createPayment } from '../../services/paymentService';
import { LoadingComponent } from '../../components/Shared/Loading/LoadingErrorComponents';
import { Picker } from '@react-native-picker/picker';

type RegisterPaymentScreenProps = NativeStackScreenProps<AppStackParamList, 'RegisterPayment'>;

const RegisterPaymentScreen: React.FC<RegisterPaymentScreenProps> = ({ navigation, route }) => {
    const { id, licensePlate } = route.params;
    const { authData } = useAuth();
    const [success, setSuccess] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleCreatePayment = async () => {
        try {
            if (paymentMethod === '') {
                setError('Preencha os campos para continuar.');
                return;
            }
            setLoading(true);
            const response = await createPayment(authData?.token || '', id, paymentMethod);
            setSuccess(`Pagamento criado!`);
            setLoading(false);
            navigation.navigate('ReleasePayment', { paymentData: response, licensePlate });
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Ocorreu um erro desconhecido.');
            }
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <AlertErrorModal visible={!!error} onClose={() => setError('')} message={error} />
            <AlertSuccessModal visible={!!success} onClose={() => setSuccess('')} message={success} />

            <HeaderComponent
                title="Liberação do Veículo"
                subtitle="Selecione a forma de pagamento para liberar o veículo."
                onPress={() => navigation.navigate('Home')}
            />

            <View style={styles.dataContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.labelInput}>Tipo de Pagamento</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={paymentMethod}
                            onValueChange={(itemValue) => setPaymentMethod(itemValue)}
                            style={styles.picker}
                            prompt="Selecione um método de pagamento"
                        >
                            <Picker.Item color={Platform.select({ ios: '#fff', android: '#000' })} label="Cartão de Débito" value="1" />
                            <Picker.Item color={Platform.select({ ios: '#fff', android: '#000' })} label="Cartão de Crédito" value="2" />
                            <Picker.Item color={Platform.select({ ios: '#fff', android: '#000' })} label="Pix" value="3" />
                        </Picker>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labelInput}>Placa</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="rgba(255, 255, 255, 0.6)"
                        value={licensePlate}
                        editable={false}
                    />
                </View>

                {loading && (
                  <LoadingComponent />
                )}

                {!loading && (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleCreatePayment}>
                            <Text style={styles.buttonLabel}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                )}
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
    dataContainer: {
        margin: 41,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputContainer: {
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
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255, 255, 255, 0.6)",
        width: '100%', 
    },
    picker: {
        height: Platform.select({ ios: 190, android: 50 }),
        color: "rgba(255, 255, 255, 0.6)",
    },
});

export default RegisterPaymentScreen;
