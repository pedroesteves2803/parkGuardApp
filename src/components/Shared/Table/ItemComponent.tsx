import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface StatusItemProps {
  plate: string;
  date: string;
  status: 'ESTACIONADO' | 'LIBERADO' | 'PENDENTE';
}

const ItemComponent: React.FC<StatusItemProps> = ({ plate, date, status }) => {
  const statusStyles = {
    ESTACIONADO: styles.statusParked,
    LIBERADO: styles.statusReleased,
    PENDENTE: styles.statusPending,
  };

  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>{plate}</Text>
      <Text style={styles.itemText}>{date}</Text>
      <View style={styles.item}>
        <View style={[styles.status, statusStyles[status]]}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 4,
  },
  itemText: {
    color: "#FFF",
  },
  status: { 
    display: 'flex',
    width: 71,
    height: 22,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    borderRadius: 4,
  },  
  statusText: { 
    fontFamily: 'Roboto-Medium',
    fontSize: 8,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 26,
    letterSpacing: 0.46,
    textTransform: 'uppercase',
    color: "#FFF",
  },  
  statusParked: { 
    backgroundColor: 'rgba(33, 150, 243, 1)',
  },
  statusReleased: { 
    backgroundColor: 'rgba(46, 125, 50, 1)',
  },
  statusPending: { 
    backgroundColor: 'rgba(211, 47, 47, 1)',
  },
});

export default ItemComponent;
