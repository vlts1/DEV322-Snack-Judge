import { StyleSheet, ScrollView, View, useColorScheme } from 'react-native';
import EmptyHistory from '@/components/help_components/EmptyHistory';
import { useScanHistory } from '@/hooks/useScanHistory';
import { InListItem } from '@/components/item/InListItem';
import { Colors } from '@/constants/Colors';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

export default function HistoryScreen() {
  const { history, refreshHistory } = useScanHistory();
  const colorScheme = useColorScheme();

  const dividerColor =
    colorScheme === 'dark' ? Colors.dark.border : Colors.light.border;

    useFocusEffect(
      useCallback(() => {
        const timeout = setTimeout(() => { refreshHistory(); }, 1000);
        return () => clearTimeout(timeout); // cleanup on blur
      }, [])
    );

  if (history.length === 0) return <EmptyHistory />;
    
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}
    >
      {history.map((item, index) => (
        <View key={item.barcode}>
          <InListItem
            barcode={item.barcode}
            name={item.name}
            imageUrl={item.imageUrl}
            make={item.make}
          />

          {index < history.length - 1 && (
            <View style={[styles.divider, { backgroundColor: dividerColor }]} />
          )}
        </View>
      ))}

      <View style={{paddingBottom: 60 }}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    minHeight: '100%',
    paddingTop: 16,
  },
  divider: {
    height: 1,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
