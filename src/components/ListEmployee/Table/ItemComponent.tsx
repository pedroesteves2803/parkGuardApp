import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface StatusItemProps {
  name: string;
  email: string;
  type: 'ADMINISTRADOR' | 'NORMAL';
}

const ItemComponent: React.FC<StatusItemProps> = ({ name, email, type }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.itemPrimary}>{name}</Text>
      <Text style={styles.itemSecondary}>{email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 4,
    margin: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.6)"
  },
  itemPrimary: {
    padding: 2,
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 20.02,
    letterSpacing: 0.17000000178813934,
    textAlign: 'left',
  },
  itemSecondary: {
    padding: 2,
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 10,
    fontWeight: 400,
    lineHeight: 14.3,
    letterSpacing: 0.17000000178813934,
    textAlign: 'left',
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
});

export default ItemComponent;
