import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import useResults from './hooks/useResults';
import SearchTile from './src/components/search-tile';

export default function App() {

  const [search, setSearch] = useState("");
  const [searchApi, results, error] = useResults();
  return (
    <View style={styles.container}>
      <Text>My Pokedex App</Text>
      <SearchBar
        platform = "ios"
        placeholder="Search"
        onChangeText={(term) => setSearch(term)}
        onSubmitEditing={() => searchApi(search)}
        value={search}
        autoComplete = {false}
      />
      {results ? (
        <SearchTile pokemon={results} />
      ) : (
        null
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 100
  },
});
