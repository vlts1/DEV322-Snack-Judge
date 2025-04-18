import { Colors } from "@/constants/Colors";
import { View, Text, StyleSheet, useColorScheme } from "react-native";

function NutritionTable(nutriments: any) {
    const colorScheme = useColorScheme();
    const textColor = colorScheme === 'dark' ? Colors.dark.text : Colors.light.text;
    
    return (
        <View style={styles.table}>
            {[
              { label: 'Calories', value: nutriments['energy-kcal'], unit: 'kcal' },
              { label: 'Protein', value: nutriments.proteins, unit: 'g' },
              { label: 'Fat', value: nutriments.fat, unit: 'g' },
              { label: 'Carbohydrates', value: nutriments.carbohydrates, unit: 'g' },
            ].map((row) => (
              <View key={row.label} style={[styles.row, {borderBottomColor: colorScheme === 'dark' ? '#eee' : '#ccc'}]}>
                <Text
                  style={[styles.cellLabel, (row.label === 'Calories' || row.label === 'Protein') && styles.cellValue, { color: textColor }]}
                >
                  {row.label}
                </Text>
                <Text
                  style={[styles.cellValue, (row.label === 'Calories' || row.label === 'Protein') && styles.cellValue, { color: textColor }]}
                >
                  {row.value != null ? `${row.value} ${row.unit}` : 'N/A'}
                </Text>
              </View>
            ))}
        </View> 
    );
}

export default NutritionTable;

const styles = StyleSheet.create({
  table: { borderRadius: 8, marginBottom: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#ccc' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 16, borderBottomWidth: 1 },
  cellLabel: { fontSize: 16, fontWeight: '700' },
  cellValue: { fontSize: 16, fontWeight: '700' },
});
