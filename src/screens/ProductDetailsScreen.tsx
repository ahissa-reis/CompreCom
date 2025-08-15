import { useRoute } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '@store/index';
import { loadProduct } from '@store/productsSlice';
import colors from '@theme/colors';
import { useEffect } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ProductDetailsScreen() {
  const route = useRoute<any>();
  const id = Number(route.params?.id);
  const dispatch = useAppDispatch();
  const itemState = useAppSelector(s => s.products.byId[id]);

  useEffect(() => {
    if (!itemState?.item) dispatch(loadProduct(id));
  }, [id]);

  const loading = itemState?.loading;
  const item = itemState?.item;

  if (loading || !item) {
    return (
      <View style={styles.center}>
        {itemState?.error ? (
          <Text style={styles.error}>Erro: {itemState.error}</Text>
        ) : (
          <ActivityIndicator size="large" color={colors.primary} />
        )}
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Image
        source={{ uri: item.images?.[0] ?? item.thumbnail }}
        style={styles.banner}
        resizeMode="cover"
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.brand}>{item.brand} • {item.category}</Text>
      <Text style={styles.desc}>{item.description}</Text>

      <View style={styles.row}>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        {item.discountPercentage > 0 && (
          <Text style={styles.discount}>-{item.discountPercentage}%</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 16,
  },
  center: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: '#fca5a5',
    fontWeight: '600',
  },
  banner: {
    width: '100%',
    height: 260,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#6b5c09ff',
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
  },
  brand: {
    color: colors.subtext,
    marginBottom: 12,
  },
  desc: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
  },
  discount: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '800',
  },
});
