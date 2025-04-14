import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import ErrorFetching from '@/components/help_components/ErrorFetching';

export default function ItemScreen() {
  const route = useRoute();
  const { itemId } = route.params as { itemId: string };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [item, setItem] = useState<any>(null);

  const fetchItem = async () => {
    try {
      setLoading(true);
      setError(false);

      const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${itemId}.json`);
      const data = await res.json();

      if (!data || data.status !== 1) {
        throw new Error('Not found');
      }

      setItem(data.product);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  if (error) {
    return <ErrorFetching onRetry={fetchItem} />;
  }

  if (loading || !item) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#9b59b6" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{item.product_name || 'N/A'}</Text>

        <Text style={styles.label}>Brand:</Text>
        <Text style={styles.value}>{item.brands || 'N/A'}</Text>

        <Text style={styles.label}>Quantity:</Text>
        <Text style={styles.value}>{item.quantity || 'N/A'}</Text>

        <Text style={styles.label}>Nutri-Score:</Text>
        <Text style={styles.value}>{item.nutriscore_grade?.toUpperCase() || 'N/A'}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#9b59b6',
  },
  info: {
    gap: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  value: {
    fontSize: 16,
    color: '#111',
    marginBottom: 12,
  },
});
