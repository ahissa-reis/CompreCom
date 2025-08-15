import { DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@screens/LoginScreen';
import ProductDetailsScreen from '@screens/ProductDetailsScreen';
import ProductsTabsScreen from '@screens/ProductsTabsScreen';
import { logout } from '@store/authSlice';
import { useAppDispatch, useAppSelector } from '@store/index';
import { clearAll } from '@store/productsSlice';
import colors from '@theme/colors';
import { Pressable, Text } from 'react-native';

const Stack = createNativeStackNavigator();

const navTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: '#ffca1dff',
    text: colors.text,
    primary: colors.primary,
  },
};

export default function RootNavigation() {
  const user = useAppSelector(s => s.auth.user);
  const dispatch = useAppDispatch();

  const headerRight = () => (
    user ? (
      <Pressable
        onPress={() => { dispatch(logout()); dispatch(clearAll()); }}
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1, padding: 8 })}
      >
        <Text style={{ color: colors.primary, fontWeight: '700' }}>Sair</Text>
      </Pressable>
    ) : null
  );

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="Products"
              component={ProductsTabsScreen}
              options={{ title: 'Produtos', headerRight, headerTitleAlign: 'center' }}
            />
            <Stack.Screen
              name="ProductDetails"
              component={ProductDetailsScreen}
              options={{ title: 'Detalhes', headerTitleAlign: 'center' }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
