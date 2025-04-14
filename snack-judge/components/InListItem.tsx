import { Image, View, Text, StyleSheet} from 'react-native';
import { ThemedText } from './ThemedText';

export function InListItem() {
    return (
        <View style={styles.layout}>
            <Image
                source={require('@/assets/images/icon.png')}
                style={{ width: 75, height: 75 }}
            />
            <View style={styles.textLayout}>
                <ThemedText style={styles.title}>Refreshe Water 0.5</ThemedText>
                <ThemedText>Description</ThemedText>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 10,
  },
  title: {

  },
  textLayout: {
    flexDirection: 'column',
  }
});
