import React from 'react';
import { StyleSheet, View } from 'react-native';

const CameraOverlay = () => {
  return (
    <View style={styles.overlay}>
      <View style={styles.shadowTop} />
      <View style={styles.middleRow}>
        <View style={styles.shadowSide} />
        <View style={styles.transparentCenter} />
        <View style={styles.shadowSide} />
      </View>
      <View style={styles.shadowBottom} />
    </View>
  );
};

export default CameraOverlay;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  shadowTop: {
    flex: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  middleRow: {
    height: '40%',
    flexDirection: 'row',
  },
  shadowSide: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  transparentCenter: {
    flex: 6,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 6,
  },
  shadowBottom: {
    flex: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
