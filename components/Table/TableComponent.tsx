import React from 'react';
import { StyleSheet, View, TextStyle, ScrollView } from 'react-native';
import { Table, Row } from 'react-native-table-component';

interface TableProps {
  tableData: (string | JSX.Element)[][];
}

const TableComponent: React.FC<TableProps> = ({ tableData }) => {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      showsVerticalScrollIndicator={false}
    >
      <Table style={styles.table}>
        {tableData.map((rowData, index) => (
          <Row
            key={index}
            data={rowData}
            style={styles.row}
            textStyle={styles.text} // Certifique-se que textStyle é um objeto
          />
        ))}
      </Table>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    height: 900
  },
  table: {
    flex: 1,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    height: 40,
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
});

export default TableComponent;
