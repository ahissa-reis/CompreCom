import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CategoryKey } from '@store/productsSlice';
import colors from '@theme/colors';
import { StyleSheet, Text, View } from 'react-native';
import CategoryListScreen from './CategoryListScreen';

const Tab = createMaterialTopTabNavigator();
const GroupTab = createMaterialTopTabNavigator();

const CATEGORY_TITLES: Record<CategoryKey, string> = {
  'mens-shirts': 'Camisas',
  'mens-shoes': 'Sapatos',
  'mens-watches': 'Relógios',
  'womens-bags': 'Bolsas',
  'womens-dresses': 'Vestidos',
  'womens-jewellery': 'Joias',
  'womens-shoes': 'Sapatos',
  'womens-watches': 'Relógios'
};

function CategoryScreenWithTitle({ category }: { category: CategoryKey }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{CATEGORY_TITLES[category]}</Text>
      </View>
      <CategoryListScreen category={category} />
    </View>
  );
}

function MensShirtsScreen() { return <CategoryScreenWithTitle category="mens-shirts" />; }
function MensShoesScreen() { return <CategoryScreenWithTitle category="mens-shoes" />; }
function MensWatchesScreen() { return <CategoryScreenWithTitle category="mens-watches" />; }

function WomensBagsScreen() { return <CategoryScreenWithTitle category="womens-bags" />; }
function WomensDressesScreen() { return <CategoryScreenWithTitle category="womens-dresses" />; }
function WomensJewelleryScreen() { return <CategoryScreenWithTitle category="womens-jewellery" />; }
function WomensShoesScreen() { return <CategoryScreenWithTitle category="womens-shoes" />; }
function WomensWatchesScreen() { return <CategoryScreenWithTitle category="womens-watches" />; }

function MenGroupTabs() {
  return (
    <GroupTab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: { backgroundColor: colors.primary },
        tabBarStyle: { backgroundColor: '#cf9312ff' },
        tabBarLabelStyle: {
          color: colors.text,
          textTransform: 'none',
          fontWeight: '700',
        },
      }}
    >
      <GroupTab.Screen name="mens-shirts" component={MensShirtsScreen} options={{ tabBarLabel: CATEGORY_TITLES['mens-shirts'] }} />
      <GroupTab.Screen name="mens-shoes" component={MensShoesScreen} options={{ tabBarLabel: CATEGORY_TITLES['mens-shoes'] }} />
      <GroupTab.Screen name="mens-watches" component={MensWatchesScreen} options={{ tabBarLabel: CATEGORY_TITLES['mens-watches'] }} />
    </GroupTab.Navigator>
  );
}

function WomenGroupTabs() {
  return (
    <GroupTab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: { backgroundColor: colors.primary },
        tabBarStyle: { backgroundColor: '#cf9312ff' },
        tabBarLabelStyle: {
          color: colors.text,
          textTransform: 'none',
          fontWeight: '700',
        },
      }}
    >
      <GroupTab.Screen name="womens-bags" component={WomensBagsScreen} options={{ tabBarLabel: CATEGORY_TITLES['womens-bags'] }} />
      <GroupTab.Screen name="womens-dresses" component={WomensDressesScreen} options={{ tabBarLabel: CATEGORY_TITLES['womens-dresses'] }} />
      <GroupTab.Screen name="womens-jewellery" component={WomensJewelleryScreen} options={{ tabBarLabel: CATEGORY_TITLES['womens-jewellery'] }} />
      <GroupTab.Screen name="womens-shoes" component={WomensShoesScreen} options={{ tabBarLabel: CATEGORY_TITLES['womens-shoes'] }} />
      <GroupTab.Screen name="womens-watches" component={WomensWatchesScreen} options={{ tabBarLabel: CATEGORY_TITLES['womens-watches'] }} />
    </GroupTab.Navigator>
  );
}

export default function ProductsTabsScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: colors.primary },
        tabBarStyle: { backgroundColor: '#cf9312ff' },
        tabBarLabelStyle: {
          color: colors.text,
          textTransform: 'none',
          fontWeight: '700',
        },
      }}
    >
      <Tab.Screen name="Homens" component={MenGroupTabs} />
      <Tab.Screen name="Mulheres" component={WomenGroupTabs} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
});
