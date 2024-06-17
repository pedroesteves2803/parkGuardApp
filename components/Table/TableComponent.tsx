import React from 'react';
import { StyleSheet, View, TextStyle, ScrollView } from 'react-native';
import { Table, Row } from 'react-native-table-component';

interface TableProps {
  tableData: (string | JSX.Element)[][];
}

const TableComponent: React.FC<TableProps> = ({tableData}) => {
  return (
    <ScrollView 
      contentContainerStyle={styles.scrollView}
      showsVerticalScrollIndicator={false}
    >
      <Table style={styles.table}>
        {
          tableData.map((rowData, index) => (
            <Row key={index} data={rowData} style={styles.row} textStyle={styles.text}/>
          ))
        }
      </Table>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    scrollView: {
      flexGrow: 1,
      height: 900
    },
    table: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: { 
        margin: 6,
        color: 'rgba(198, 198, 198, 1)',
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 20.02,
        letterSpacing: 0.17,
    } as TextStyle,
    statusParked: { 
        borderWidth: 0.3,
        backgroundColor: 'rgba(100, 100, 100, 0.23)',
        borderRadius: 10,
        borderColor: '#5A5A5A',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 107,
        height: 92,
    } as TextStyle,
    statusReleased: { 
        color: 'green' 
    } as TextStyle,
    statusPending: { 
        color: 'red' 
    } as TextStyle,
    row: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(80, 80, 80, 1)',
        width: "100%",
    },
});

export default TableComponent;
