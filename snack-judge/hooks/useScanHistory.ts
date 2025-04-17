import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

export interface Item {
  barcode: string;
  name: string;
  imageUrl: string;
  make: string;
}

export const useScanHistory = () => {
  const [history, setHistory] = useState<Item[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchHistory = async () => {
        const history = await _getScanHistory();
        setHistory(history);
      };

      fetchHistory();
    }, [])
  );

  const _getScanHistory = async (): Promise<Item[]> => {
    try {
      const history = await AsyncStorage.getItem('scanned');
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error fetching scan history:', error);
      return [];
    }
  };

  const addToHistory = async (item: Item) => {
    try {
      const history = await AsyncStorage.getItem('scanned');
      const parsedHistory = history ? JSON.parse(history) : [];
      
      if (!parsedHistory.some((i: Item) => i.barcode === item.barcode)) { 
        const updatedHistory = [...parsedHistory, item];
        await AsyncStorage.setItem('scanned', JSON.stringify(updatedHistory));
        setHistory(updatedHistory);
      }
    } catch (error) {
      console.error('Error saving scan history:', error);
    }
  };

  const refreshHistory = async () => {
    const h = await _getScanHistory();
    setHistory(h);
  };

  const forgetItem = async (barcode: string) => {
    try {
      const history = await _getScanHistory();
      const updated = history.filter((i: Item) => i.barcode !== barcode);
      await AsyncStorage.setItem('scanned', JSON.stringify(updated));
      AsyncStorage.removeItem(barcode);
      setHistory(updated);
    } catch (error) {
      console.error('Error removing item from scan history:', error);
    }
  };

  return { addToHistory, history, forgetItem, refreshHistory };
}