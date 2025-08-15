import { useNavigation } from '@react-navigation/native';
import { Product } from '@services/api';
import { useAppDispatch, useAppSelector } from '@store/index';
import { CategoryKey, loadCategory } from '@store/productsSlice';
import colors from '@theme/colors';
import { useEffect } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface Props {
  category: CategoryKey;
}

export default function CategoryListScreen({ category }: Props) {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<{
    navigate: (screen: 'ProductDetails', params: { id: number }) => void;
  }>();
  
  const state = useAppSelector(s => s.products.byCategory[category]);
  const items: Product[] = state?.items ?? [];
  const loading = state?.loading ?? false;

  useEffect(() => {
    if (!state) {
      dispatch(loadCategory(category));
    }
  }, [category, state, dispatch]);

  const handlePress = (productId: number) => {
    navigation.navigate('ProductDetails', { id: productId });
  };

  const renderItem = ({ item: { id, title, price } }: { item: Product }) => (
    <TouchableOpacity 
      style={styles.item} 
      onPress={() => handlePress(id)}
      activeOpacity={0.7}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>R$ {price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {state?.error && (
        <Text style={styles.error}>Erro: {state.error}</Text>
      )}

      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => dispatch(loadCategory(category))}
            tintColor={colors.text}
          />
        }
        contentContainerStyle={items.length === 0 ? styles.emptyList : styles.listContent}
        ListEmptyComponent={
          !loading ? (
            <Text style={styles.empty}>Nenhum produto encontrado</Text>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 12,
  },
  error: {
    color: '#fca5a5',
    marginBottom: 8,
    fontWeight: '600',
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 24,
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 6,
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  price: {
    color: colors.text,
    fontSize: 14,
    marginTop: 4,
  },
  empty: {
    color: colors.text,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
