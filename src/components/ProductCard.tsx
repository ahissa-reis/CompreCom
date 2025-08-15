import { Product } from '@services/api';
import colors from '@theme/colors';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
  item: Product;
  onPress?: () => void;
}

export default function ProductCard({ item, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && { opacity: 0.8 }]}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumb} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
        <View style={styles.row}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <Text style={styles.discount}>-{item.discountPercentage}%</Text>
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
  },
  thumb: { width: '100%', height: 160, backgroundColor: '#0b1020' },
  info: { padding: 12, gap: 6 },
  title: { color: colors.text, fontWeight: '700', fontSize: 16 },
  desc: { color: colors.subtext, fontSize: 12 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  price: { color: colors.text, fontWeight: '800', fontSize: 16 },
  discount: { color: colors.primary, fontWeight: '700' },
});