import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

type Props = {
  initialSegment: 'Atuais' | 'Histórico';
  onSegmentChange: (segment: 'Atuais' | 'Histórico') => void;
};

const VehicleStatusSegmentedControl: React.FC<Props> = ({ initialSegment, onSegmentChange }) => {
  const [selectedSegment, setSelectedSegment] = React.useState(initialSegment);

  useEffect(() => {
    setSelectedSegment(initialSegment);
  }, [initialSegment]);

  const handleSegmentPress = (segment: 'Atuais' | 'Histórico') => {
    if (segment !== selectedSegment) {
      setSelectedSegment(segment);
      onSegmentChange(segment);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.segment, selectedSegment === 'Atuais' && styles.selectedSegment]}
        onPress={() => handleSegmentPress('Atuais')}
      >
        <Text style={[styles.segmentText, selectedSegment === 'Atuais' && styles.selectedText]}>Atuais</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.segment, selectedSegment === 'Histórico' && styles.selectedSegment]}
        onPress={() => handleSegmentPress('Histórico')}
      >
        <Text style={[styles.segmentText, selectedSegment === 'Histórico' && styles.selectedText]}>Histórico</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.filters} onPress={() => handleSegmentPress('Atuais')}>
        <Image source={require("../../../../assets/filter.png")} style={styles.filterImage} />
      </TouchableOpacity> */}
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
  filterImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default VehicleStatusSegmentedControl;
