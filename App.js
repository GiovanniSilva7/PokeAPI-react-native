// App.js
import React, { useEffect } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SearchScreen from './SearchScreen';
import FavoritesScreen from './FavoritesScreen';
import { initDatabase } from './dba/database';

const AppNavigator = createStackNavigator(
  {
    Search: SearchScreen,
    Favorites: FavoritesScreen,
  },
  {
    initialRouteName: 'Search',
  }
);

const AppContainer = createAppContainer(AppNavigator);

const App = () => {
  useEffect(() => {
    initDatabase();
  }, []);

  return <AppContainer />;
};

export default App;
