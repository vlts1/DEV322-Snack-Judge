import { StyleSheet, ScrollView } from 'react-native';
import EmptyHistory from '@/components/help_components/EmptyHistory';

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
