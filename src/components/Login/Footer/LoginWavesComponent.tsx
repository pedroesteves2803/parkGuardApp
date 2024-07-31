import React from 'react';
import { StyleSheet, Image, Dimensions, Platform } from 'react-native';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window') || { width: 0, height: 0 };

const topPosition = windowHeight * (Platform.OS === 'ios' ? 0.78 : 0.83);

const LoginWavesComponent: React.FC = () => {
    return (
        <Image
            style={[styles.wavesFooter, { top: topPosition }]}
            resizeMode="cover"
            source={require("../../../../assets/waves.png")}
        />
    );
};

const styles = StyleSheet.create({
    wavesFooter: {
        width: windowWidth,
        height: windowHeight * 0.2,
        position: "absolute",
    },
});

export default LoginWavesComponent;
