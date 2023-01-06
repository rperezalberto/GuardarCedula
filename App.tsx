import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import { RootNavigation } from './src/navigation/RootNavigation';

const App = () => {

  return (
    <Provider store={store}>
      <RootNavigation />
      <StatusBar style='light' />
    </Provider>
  )
}

export default App;
