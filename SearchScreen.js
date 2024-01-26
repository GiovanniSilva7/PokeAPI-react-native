
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Image, Text, Alert } from 'react-native';
import axios from 'axios';
import { addFavorite } from './database';

const SearchScreen = ({ navigation }) => {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);

  const searchPokemon = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      setPokemonData(response.data);
    } catch (error) {
      console.error('Error fetching Pokemon data', error);
      setPokemonData(null);
    }
  };

  const addToFavorites = () => {
    if (pokemonData) {
      addFavorite({
        name: pokemonData.name,
        weight: pokemonData.weight,
        height: pokemonData.height,
        types: pokemonData.types.map((type) => type.type.name),
      });
      Alert.alert('Sucesso', 'Pokémon adicionado aos favoritos!');
    }
  };

  useEffect(() => {
    navigation.setParams({ addToFavorites });
  }, [pokemonData]);

  return (
    <View>
      <TextInput
        placeholder="Digite o nome do Pokémon"
        value={pokemonName}
        onChangeText={(text) => setPokemonName(text)}
      />
      <Button title="Pesquisar" onPress={searchPokemon} />

      {pokemonData && (
        <View>
          <Text>Nome do Pokemon: {pokemonData.name}</Text>
          <Image source={{ uri: pokemonData.sprites.front_default }} style={{ width: 100, height: 100 }} />
          <Text>Peso: {pokemonData.weight}</Text>
          <Text>Altura: {pokemonData.height}</Text>
          <Text>Tipos: {pokemonData.types.map((type) => type.type.name).join(', ')}</Text>
        </View>
      )}
    </View>
  );
};

SearchScreen.navigationOptions = ({ navigation }) => {
  const addToFavorites = navigation.getParam('addToFavorites');
  return {
    headerRight: () => <Button title="Favoritos" onPress={() => navigation.navigate('Favorites')} />,
    headerRightContainerStyle: { paddingRight: 10 },
    headerLeft: () => <Button title="Favoritar" onPress={addToFavorites} />,
    headerLeftContainerStyle: { paddingLeft: 10 },
  };
};

export default SearchScreen;
