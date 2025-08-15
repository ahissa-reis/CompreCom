import { Product } from '@services/api';
import colors from '@theme/colors';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
  item: Product;
  onPress?: () => void;
}

export default function ProductCard({ item, onPress }: Props) {
  const discountedPrice = item.price * (1 - item.discountPercentage / 100);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
      android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.thumb} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
        <View style={styles.row}>
          <View style={styles.priceContainer}>
            {item.discountPercentage > 0 && (
              <Text style={styles.oldPrice}>${item.price.toFixed(2)}</Text>
            )}
            <Text style={styles.price}>${discountedPrice.toFixed(2)}</Text>
          </View>
          {item.discountPercentage > 0 && (
            <Text style={styles.discount}>-{item.discountPercentage}%</Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
    // sombra iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    // sombra Android
    elevation: 4,
  },
  thumb: { 
    width: '100%', 
    height: 160, 
    backgroundColor: '#0b1020', 
    borderTopLeftRadius: 12, 
    borderTopRightRadius: 12 
  },
  info: { padding: 12, gap: 6 },
  title: { color: colors.text, fontWeight: '700', fontSize: 16 },
  desc: { color: colors.subtext, fontSize: 12 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  priceContainer: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  price: { color: colors.text, fontWeight: '800', fontSize: 16 },
  oldPrice: { 
    color: colors.subtext, 
    fontSize: 14, 
    textDecorationLine: 'line-through' 
  },
  discount: { 
    color: colors.primary, 
    fontWeight: '700', 
    fontSize: 14 
  },
});
