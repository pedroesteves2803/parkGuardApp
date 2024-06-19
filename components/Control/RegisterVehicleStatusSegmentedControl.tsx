import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

type Props = {
  initialSegment: 'Carregar imagem' | 'Digitar placa';
  onSegmentChange: (segment: 'Carregar imagem' | 'Digitar placa') => void;
};

const RegisterVehicleStatusSegmentedControl: React.FC<Props> = ({ initialSegment, onSegmentChange }) => {
  const [selectedSegment, setSelectedSegment] = React.useState(initialSegment);

  const handleSegmentPress = (segment: 'Carregar imagem' | 'Digitar placa') => {
    setSelectedSegment(segment);
    onSegmentChange(segment);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.segment, selectedSegment === 'Carregar imagem' && styles.selectedSegment]}
        onPress={() => handleSegmentPress('Carregar imagem')}
      >
        <Text style={[styles.segmentText, selectedSegment === 'Carregar imagem' && styles.selectedText]}>Carregar imagem</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.segment, selectedSegment === 'Digitar placa' && styles.selectedSegment]}
        onPress={() => handleSegmentPress('Digitar placa')}
      >
        <Text style={[styles.segmentText, selectedSegment === 'Digitar placa' && styles.selectedText]}>Digitar placa</Text>
      </TouchableOpacity>
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
});

export default RegisterVehicleStatusSegmentedControl;
