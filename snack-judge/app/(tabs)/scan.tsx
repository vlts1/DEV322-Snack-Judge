import { StyleSheet, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import NoCameraPermission from '@/components/help_components/NoCameraPermission';
import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import CameraOverlay from '@/components/CameraOverlay';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const isFocused = useIsFocused();

  useEffect(() => {
    requestPermission();
  }, []);

  if (permission?.granted === false) {
    return <NoCameraPermission />;
  }

  if (permission?.granted && isFocused) {
    return (
      <View style={styles.container}>
        <CameraView
          style={StyleSheet.absoluteFill}
          facing="back"
          barcodeScannerSettings={{ barcodeTypes: ['ean13', 'upc_a'] }}
          onBarcodeScanned={(barcode) => {
            console.log(barcode.data);
          }}
        />
        <CameraOverlay />
      </View>
    );
  }

  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
