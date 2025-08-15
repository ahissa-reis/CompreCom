import RootNavigation from '@navigation/index';
import { store } from '@store/index';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <RootNavigation />
    </Provider>
  );
}