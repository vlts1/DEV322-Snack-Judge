import { StyleSheet, ScrollView, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { InListItem } from '@/components/InListItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyHistory from '@/components/help_components/EmptyHistory';
import ErrorFetching from '@/components/help_components/ErrorFetching';

export default function HistoryScreen() {
  return (
    <ScrollView   
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}
    >
      {/* <InListItem />
      <InListItem />
      <InListItem /> */}

      <EmptyHistory />
      {/* <ErrorFetching onRetry={() => {}} /> */}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    minHeight: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
  },
});
