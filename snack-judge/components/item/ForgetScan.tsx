import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useScanHistory } from '@/hooks/useScanHistory';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface ForgetScanProps {
  barcode: string;
}

export default function ForgetScan({ barcode }: ForgetScanProps) {
  const { forgetItem } = useScanHistory();
  const router = useRouter();

  const handleForget = () => {
    forgetItem(barcode);
    router.dismissAll();
  };

  return (
    <TouchableOpacity onPress={handleForget} style={styles.button}>
      <View style={styles.content}>
        <Text style={styles.buttonText}>Forget Scan</Text>
        <FontAwesome name="trash" size={16} color="#fff" style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  content: {
    minWidth: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: '#e74c3c',
    marginRight: 8,
    marginLeft: 8,
    fontSize: 18,
  },
  buttonText: {
    color: '#e74c3c',
    fontWeight: '600',
    fontSize: 18,
  },
});
