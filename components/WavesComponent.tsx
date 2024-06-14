import React from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const WavesComponent: React.FC = () => {
    return (
        <Image
            style={styles.wavesFooter}
            resizeMode="cover"
            source={require("../assets/waves.png")}
        />
    );
};

const styles = StyleSheet.create({
    wavesFooter: {
        width: windowWidth,
        height: windowHeight * 0.2,
        position: "absolute",
        bottom: 0,
    },
});

export default WavesComponent;
