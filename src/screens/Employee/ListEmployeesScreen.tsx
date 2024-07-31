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
import VehicleStatusSegmentedControl from '../../components/Home/Controls/VehicleStatusSegmentedControl';
import EmployeeStatusSegmentedControl from '../../components/ListEmployee/Controls/VehicleStatusSegmentedControl';

type ListEmployeesScreenProps = NativeStackScreenProps<AppStackParamList, 'ListEmployees'>;

const ListEmployeesScreen: React.FC<ListEmployeesScreenProps> = ({ navigation }) => {
    // const { id, licensePlate } = route.params;
    const { authData } = useAuth();
    const [success, setSuccess] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [currentSegment, setCurrentSegment] = useState<'Atuais' | 'Desligados'>('Atuais');

    const handleSegmentChange = (segment: 'Atuais' | 'Desligados') => {
        setCurrentSegment(segment);
      };


    return (
        <View style={styles.container}>
            <AlertErrorModal visible={!!error} onClose={() => setError('')} message={error} />
            <AlertSuccessModal visible={!!success} onClose={() => setSuccess('')} message={success} />

            <View style={styles.body}>
                <HeaderComponent
                    title="Funcionários"
                    subtitle="Veja a lista de funcionários ativos e desligados do estabelecimento."
                    onPress={() => navigation.navigate('Home')}
                />

                <EmployeeStatusSegmentedControl initialSegment={currentSegment} onSegmentChange={handleSegmentChange} />

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
    body: {
        padding: 25
    },

});

export default ListEmployeesScreen;
