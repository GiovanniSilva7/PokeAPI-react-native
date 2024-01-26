
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'pokemon.db', location: 'default' });

const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS favorites (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, weight REAL, height REAL, types TEXT)',
      []
    );
  });
};

const addFavorite = (pokemon) => {
  db.transaction((tx) => {
    tx.executeSql('INSERT INTO favorites (name, weight, height, types) VALUES (?, ?, ?, ?)', [
      pokemon.name,
      pokemon.weight,
      pokemon.height,
      JSON.stringify(pokemon.types),
    ]);
  });
};

const getFavorites = (callback) => {
  db.transaction((tx) => {
    tx.executeSql('SELECT * FROM favorites', [], (_, { rows }) => {
      const favorites = [];
      for (let i = 0; i < rows.length; i++) {
        favorites.push(rows.item(i));
      }
      callback(favorites);
    });
  });
};

export { initDatabase, addFavorite, getFavorites };
