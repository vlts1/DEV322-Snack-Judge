import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import ErrorFetching from '@/components/help_components/ErrorFetching';
import { Colors } from '@/constants/Colors';

export default function ItemScreen() {
  const route = useRoute();
  const { itemId } = route.params as { itemId: string };

  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'dark' ? Colors.dark.text : Colors.light.text;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [item, setItem] = useState<any>(null);
  const [ingredientsExpanded, setIngredientsExpanded] = useState(false);

  const fetchItem = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(`https://world.openfoodfacts.net/api/v0/product/${itemId}.json`);
      const data = await res.json();
      if (!data || data.status !== 1) throw new Error('Not found');
      setItem(data.product);
    } catch (err: any) {
      console.error(err);
      if (err.message === 'Not found') { 
        console.log("ITEM NOT IN THE DB");
        // TODO HANDLE ME
        console.log(err.status);
      }
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  if (error) return <ErrorFetching onRetry={fetchItem} />;
  if (loading || !item) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#9b59b6" />
      </View>
    );
  }

  const nutriments = item.nutriments || {};
  const additives = item.additives_tags || [];
  const servings = item.serving_size || 'Unknown';
  const isBadEco = item.ecoscore_grade === 'e';
  const isUltraProcessed = item.nova_group && item.nova_group === 4;
  const name = item.product_name || item.product_name_fr || item.product_name_en || 'Unknown';
  const make = item.brands || item.brands_fr || item.brands_en || 'Unknown';

  const novaExplanations: Record<number, string> = {
    1: 'Unprocessed or minimally processed foods',
    2: 'Processed culinary ingredients (e.g. oils, sugar)',
    3: 'Processed foods (e.g. cheese, canned vegetables)',
    4: 'Ultra-processed foods — often linked to health risks when consumed regularly',
  };

  const ingredientText = item.ingredients_text || 'N/A';
  const ingredientShouldCollapse = ingredientText.length > 150;
  const displayedIngredients = ingredientsExpanded || !ingredientShouldCollapse
    ? ingredientText
    : ingredientText.slice(0, 150) + '...';

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.prodBrand, { color: textColor }]}>{make}</Text>
      <Text style={[styles.prodName, { color: textColor }]}>{name}</Text>
      <View style={styles.divider} />
      <Text style={[styles.sectionTitle, { color: textColor }]}>Nutrition Facts</Text>
      <Text style={[styles.paragraph, { color: textColor }]}>Serving Size: {servings}</Text>
      <View style={styles.table}>
        {[
          { label: 'Calories', value: nutriments['energy-kcal'], unit: 'kcal' },
          { label: 'Protein', value: nutriments.proteins, unit: 'g' },
          { label: 'Fat', value: nutriments.fat, unit: 'g' },
          { label: 'Carbohydrates', value: nutriments.carbohydrates, unit: 'g' },
        ].map((row) => (
          <View key={row.label} style={styles.row}>
            <Text
              style={[styles.cellLabel, (row.label === 'Calories' || row.label === 'Protein') && styles.highlight, { color: textColor }]}
            >
              {row.label}
            </Text>
            <Text
              style={[styles.cellValue, (row.label === 'Calories' || row.label === 'Protein') && styles.highlight, { color: textColor }]}
            >
              {row.value != null ? `${row.value} ${row.unit}` : 'N/A'}
            </Text>
          </View>
        ))}
      </View>

      <Text style={[styles.sectionTitle, { color: textColor }]}>Ingredients</Text>
      <Text style={[styles.paragraph, { color: textColor }]}>{displayedIngredients}</Text>
      {ingredientShouldCollapse && (
        <TouchableOpacity onPress={() => setIngredientsExpanded(!ingredientsExpanded)}>
          <Text style={[styles.expandToggle, { color: "gray" }]}>Show {ingredientsExpanded ? 'less' : 'more'}</Text>
        </TouchableOpacity>
      )}

      <Text style={[styles.sectionTitle, { color: textColor }]}>Health Info</Text>
      <View style={styles.badgeContainer}>
        {item.nutriscore_grade && (
          <Text style={[styles.badge, { backgroundColor: '#e67e22' }]}>Nutri-Score: {item.nutriscore_grade.toUpperCase()}</Text>
        )}
        {item.nova_group && (
          <>
            <Text style={[styles.badge, { backgroundColor: isUltraProcessed ? 'orangered' : '#2980b9' }]}>Nova Group: {item.nova_group}</Text>
            <Text style={[styles.novaExplanation, { color: textColor }]}> {novaExplanations[item.nova_group] || 'Unknown classification'} </Text>
          </>
        )}
        <View style={{ height: 15 }}></View>
        {additives.length > 0 &&
          additives.map((a: any) => (
            <Text key={a} style={[styles.badge, { backgroundColor: '#c0392b' }]}>Additive: {a.replace('en:', '').toUpperCase()}</Text>
          ))}
      </View>

      <Text style={[styles.sectionTitle, { color: textColor }]}>Packaging & Environment</Text>
      <View style={styles.badgeContainer}>
        {item.ecoscore_grade && (
          <Text style={[styles.badge, { backgroundColor: isBadEco ? '#c0392b' : '#27ae60' }]}>Eco Score: {item.ecoscore_grade.toUpperCase()}</Text>
        )}
      </View>
      <Text style={[styles.paragraph, { color: textColor }]}>Packaging: {item.packaging || 'N/A'}</Text>
      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  prodName: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  prodBrand: { fontSize: 20, fontWeight: '600', marginBottom: 8 },
  divider: { height: 1, backgroundColor: '#ccc', marginVertical: 16, marginTop: 30, opacity: 0.6 },
  container: { flex: 1, padding: 20, paddingTop: 60 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  sectionTitle: { fontSize: 20, fontWeight: '600', marginTop: 24, marginBottom: 8 },
  subTitle: { fontSize: 17, fontWeight: '600', marginTop: 12 },
  paragraph: { fontSize: 16, marginBottom: 12, lineHeight: 22 },
  table: { borderRadius: 8, marginBottom: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#ccc' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  cellLabel: { fontSize: 16, fontWeight: '500' },
  cellValue: { fontSize: 16 },
  highlight: { fontWeight: '700', color: '#9b59b6' },
  badgeContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12, marginTop: 4 },
  badge: { color: 'white', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, fontSize: 14, fontWeight: '600' },
  novaExplanation: { fontSize: 14, marginTop: 6, marginBottom: 10, maxWidth: '100%', lineHeight: 20 },
  expandToggle: { fontSize: 14, fontWeight: '500', marginBottom: 12 },
});
