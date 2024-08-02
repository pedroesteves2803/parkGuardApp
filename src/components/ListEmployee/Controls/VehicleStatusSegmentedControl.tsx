import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useAuth } from '../../../contexts/AuthContext';

type Props = {
  initialSegment: 'Administrador' | 'Normal';
  onSegmentChange: (segment: 'Administrador' | 'Normal') => void;
  navigation: any;
};

const EmployeeStatusSegmentedControl: React.FC<Props> = ({ initialSegment, onSegmentChange, navigation }) => {
  const [selectedSegment, setSelectedSegment] = React.useState(initialSegment);
  const { authData } = useAuth();

  useEffect(() => {
    setSelectedSegment(initialSegment);
  }, [initialSegment]);

  const handleSegmentPress = (segment: 'Administrador' | 'Normal') => {
    if (segment !== selectedSegment) {
      setSelectedSegment(segment);
      onSegmentChange(segment);
    }
  };

  const handleCreateEmployee = () => {
    navigation.navigate('CreateEmployee');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.segment, selectedSegment === 'Administrador' && styles.selectedSegment]}
        onPress={() => handleSegmentPress('Administrador')}
      >
        <Text style={[styles.segmentText, selectedSegment === 'Administrador' && styles.selectedText]}>Administrador</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.segment, selectedSegment === 'Normal' && styles.selectedSegment]}
        onPress={() => handleSegmentPress('Normal')}
      >
        <Text style={[styles.segmentText, selectedSegment === 'Normal' && styles.selectedText]}>Normal</Text>
      </TouchableOpacity>

      {Number(authData?.type) === 1 && (
        <TouchableOpacity style={styles.filters} onPress={() => handleCreateEmployee()}>
          <Image source={require("../../../../assets/user-add.png")} style={styles.AddEmployeeImage} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 14,
  },
  segment: {
    padding: 10,
  },
  selectedSegment: {
    borderBottomWidth: 1,
    borderBottomColor: '#2196F3',
  },
  segmentText: {
    fontWeight: 'bold',
    color: '#C6C6C6',
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 23.34,
  },
  selectedText: {
    color: '#fff',
  },
  filters: {
    marginLeft: 'auto',
  },
  AddEmployeeImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default EmployeeStatusSegmentedControl;
