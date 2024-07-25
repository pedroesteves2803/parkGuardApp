import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { useAuth } from '../../contexts/AuthContext';
import { AppStackParamList } from '../../navigation/MainStack';
import AlertErrorModal from '../../components/Shared/Modals/AlertErrorModal';
import AlertSuccessModal from '../../components/Shared/Modals/AlertSuccessModal';
import HeaderComponent from '../../components/Shared/Header/HeaderComponent';
import { createPayment, finalizePayment } from '../../services/paymentService';
import { LoadingComponent } from '../../components/Shared/Loading/LoadingErrorComponents';
import { CartData, getVehicleById } from '../../services/vehicleService';

type ReleasePaymentScreenProps = NativeStackScreenProps<AppStackParamList, 'ReleasePayment'>;

const ReleasePaymentScreen: React.FC<ReleasePaymentScreenProps> = ({ navigation, route }) => {
    const { paymentData, licensePlate } = route.params;
    const { authData } = useAuth();
    const [success, setSuccess] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const [value, setValue] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [vehicle, setVehicle] = useState<CartData>();


    const formatPaymentMethod = (method: number) => {
        switch (method) {
            case 1:
                return 'Débito';
            case 2:
                return 'Crédito';
            case 3:
                return 'Pix';
            default:
                return 'Desconhecido';
        }
    };

    const getVehivleById = async (token: string, id: number) => {
        try {
            const vehicleData = await getVehicleById(token, id);

            setVehicle(vehicleData);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError('Ocorreu um erro desconhecido.');
          }
        }
      };

    useEffect(() => {
        if (paymentData) {
            setValue(`${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(paymentData.value_in_reais)}`);
            setPaymentMethod(formatPaymentMethod(paymentData.paymentMethod));
            getVehivleById(authData?.token || '', paymentData.vehicle_id)
        }
    }, [paymentData]);

    const handleFinalizePayment = async () => {
        try {  
            setLoading(true);
            await finalizePayment(authData?.token || '', paymentData.id);
            setSuccess('Veiculo liberado!');
            setLoading(false);
            navigation.navigate('Home');
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
                subtitle="Verifique o valor a ser pago e libere o veículo após a confirmação do pagamento."
                onPress={() => navigation.navigate('Home')}
            />

            <View style={styles.dataContainer}>
                <View style={styles.row}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.labelInput}>Placa</Text>
                        <TextInput
                            style={styles.input}
                            value={licensePlate}
                            placeholderTextColor="rgba(255, 255, 255, 0.6)"
                            editable={false}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.labelInput}>Tipo de pagamento</Text>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="rgba(255, 255, 255, 0.6)"
                            value={paymentMethod}
                            editable={false}
                        />
                    </View>
                </View>

                <View style={styles.fullWidthInputContainer}>
                    <Text style={styles.labelInput}>Valor</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="rgba(255, 255, 255, 0.6)"
                        value={value}
                        editable={false}
                    />
                </View>

                <View style={styles.fullWidthInputContainer}>
                    <Text style={styles.labelInput}>Entrada</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Horário de entrada"
                        placeholderTextColor="rgba(255, 255, 255, 0.6)"
                        value={vehicle?.entryTimes}
                        editable={false}
                    />
                </View>

                <View style={styles.fullWidthInputContainer}>
                    <Text style={styles.labelInput}>Saída</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Horário de saída"
                        placeholderTextColor="rgba(255, 255, 255, 0.6)"
                        value={vehicle?.departureTimes}
                        editable={false}
                    />
                </View>




                {loading && (
                  <LoadingComponent />
                )}

                {!loading && (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button]} onPress={handleFinalizePayment}>
                            <Text style={styles.buttonLabel}>Liberar veículo</Text>
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
});

export default ReleasePaymentScreen;
