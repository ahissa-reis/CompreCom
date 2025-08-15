import { useNavigation } from '@react-navigation/native';
import { Product } from '@services/api';
import { useAppDispatch, useAppSelector } from '@store/index';
import { CategoryKey, loadCategory } from '@store/productsSlice';
import colors from '@theme/colors';
import { useEffect } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';

interface Props {
  category: CategoryKey;
}

export default function CategoryListScreen({ category }: Props) {
  const dispatch = useAppDispatch();
  const nav = useNavigation();
  const state = useAppSelector(s => s.products.byCategory[category]);
  const items: Product[] = state?.items ?? [];
  const loading = state?.loading ?? false;

  useEffect(() => {
    if (!state) dispatch(loadCategory(category));
  }, [category]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 12 }}>
      {state?.error ? (
        <Text style={{ color: '#fca5a5', marginBottom: 8 }}>
          Erro: {state.error}
        </Text>
      ) : null}

      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Text style={{ color: colors.text, paddingVertical: 8 }}>
            {item.title}
          </Text>
        )}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => dispatch(loadCategory(category))}
            tintColor={colors.text}
          />
        }
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}
