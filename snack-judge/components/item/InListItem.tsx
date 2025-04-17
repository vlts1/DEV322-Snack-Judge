import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '../ThemedText';
import { useRouter } from 'expo-router';

interface InListItemProps {
  name: string;
  imageUrl: string;
  make: string;
  barcode: string;
}

export function InListItem({ name, imageUrl, make, barcode }: InListItemProps) {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push(`/item/${barcode}`)}>
      <View style={styles.layout}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
        />
        <View style={styles.textLayout}>
          <ThemedText style={styles.title}>{name}</ThemedText>
          <ThemedText style={styles.subtitle}>{make}</ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 6,
    marginTop: 6,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
  },
  textLayout: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 19,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
