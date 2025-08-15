import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CategoryKey } from '@store/productsSlice';
import colors from '@theme/colors';
import CategoryListScreen from './CategoryListScreen';

const Tab = createMaterialTopTabNavigator();

const MEN: CategoryKey[] = ['mens-shirts', 'mens-shoes', 'mens-watches'];
const WOMEN: CategoryKey[] = ['womens-bags', 'womens-dresses', 'womens-jewellery', 'womens-shoes', 'womens-watches'];

export default function ProductsTabsScreen() {
  return (
    <Tab.Navigator
      initialLayout={{ width: 360 }}
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: { backgroundColor: colors.primary },
        tabBarStyle: { backgroundColor: '#0b1020' },
        tabBarLabelStyle: { color: colors.text, textTransform: 'none', fontWeight: '700' },
      }}
    >
      {MEN.map(cat => (
        <Tab.Screen key={cat} name={cat} options={{ title: cat.replace('mens-', 'Homens: ') }}>
          {() => <CategoryListScreen category={cat} />}
        </Tab.Screen>
      ))}
      {WOMEN.map(cat => (
        <Tab.Screen key={cat} name={cat} options={{ title: cat.replace('womens-', 'Mulheres: ') }}>
          {() => <CategoryListScreen category={cat} />}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
}