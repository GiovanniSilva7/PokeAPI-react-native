
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getFavorites } from './database';

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getFavorites((data) => setFavorites(data));
  }, []);

  return (
    <View>
      <Text>Meus Pokémon Favoritos</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Nome do Pokemon: {item.name}</Text>
            <Text>Peso: {item.weight}</Text>
            <Text>Altura: {item.height}</Text>
            <Text>Tipos: {JSON.parse(item.types).join(', ')}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default FavoritesScreen;
