import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Platform } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { useAuth } from '../../contexts/AuthContext';
import { AppStackParamList } from '../../navigation/MainStack';
import AlertErrorModal from '../../components/Shared/Modals/AlertErrorModal';
import AlertSuccessModal from '../../components/Shared/Modals/AlertSuccessModal';
import HeaderComponent from '../../components/Shared/Header/HeaderComponent';
import { createPayment } from '../../services/paymentService';
import EmployeeStatusSegmentedControl from '../../components/ListEmployee/Controls/VehicleStatusSegmentedControl';
import EmployeeListComponent from '../../components/ListEmployee/Table/EmployeeListComponent';
import useFetchEmployees from '../../hooks/useFetchEmployees';
import { LoadingComponent } from '../../components/Shared/Loading/LoadingErrorComponents';

type ListEmployeesScreenProps = NativeStackScreenProps<AppStackParamList, 'ListEmployees'>;

const ListEmployeesScreen: React.FC<ListEmployeesScreenProps> = ({ navigation }) => {
    const { authData } = useAuth();
    const [success, setSuccess] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [refreshKey, setRefreshKey] = useState<number>(0);
    const [currentSegment, setCurrentSegment] = useState<'Administrador' | 'Normal'>('Administrador');
    const { employees, loading, refetch } = useFetchEmployees(
        authData?.token || ""
    );

    useEffect(() => {
        refetch();
      }, [refreshKey]);
    
      useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          setRefreshKey(prevKey => prevKey + 1);
        });
    
        return unsubscribe;
    }, [navigation]);
    
    if (loading) {
        return <LoadingComponent />;
    }

    const handleSegmentChange = (segment: 'Administrador' | 'Normal') => {
        setCurrentSegment(segment);
    };

    const filteredEmployees = currentSegment === 'Administrador'
        ? employees.filter(employee => employee.type === 1)
        : employees.filter(employee => employee.type === 2);

    return (
        <View style={styles.container}>
            <AlertErrorModal visible={!!error} onClose={() => setError('')} message={error} />
            <AlertSuccessModal visible={!!success} onClose={() => setSuccess('')} message={success} />
            
            <HeaderComponent
                    title="Cadastro de funcionário"
                    subtitle="Preencha as informações abaixo para adicionar um novo funcionário ao sistema."
                    onPress={() => navigation.navigate('Home')}
            />

            <View style={styles.body}>
                <EmployeeStatusSegmentedControl initialSegment={currentSegment} onSegmentChange={handleSegmentChange} navigation={navigation}/>

                {!error && (
                    <EmployeeListComponent employees={filteredEmployees} navigation={navigation} />
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
    body: {
        padding: 25
    },

});

export default ListEmployeesScreen;
