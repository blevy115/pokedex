import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Autocomplete from 'react-native-autocomplete-input';
import useResults from './hooks/useResults';
import SearchTile from './src/components/search-tile';
import pokeapi from './api/pokeapi';


export default function App() {

  const [search, setSearch] = useState("");
  const [pkmList, setPkmList] = useState([]);
  const [filteredPkmList, setFilteredPkmList] = useState([]);
  const [searchApi, results, error] = useResults();

  const loadPkmList = async () => {
    const response = await pokeapi.get('pokemon/?offset=0&limit=1050');
    setPkmList(response.data.results.map((item) => item.name))
  }

  useEffect(() => {
    loadPkmList();
  }, []);

  const findPkm = (query) => {
    if (query) {
      setSearch(query);
      const regex = new RegExp(`${query.trim()}`, 'i');
      setFilteredPkmList(
        pkmList.filter((pkm) => pkm.search(regex) >= 0)
      );
    } else {
      setFilteredPkmList([]);
    }
  }


  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
      <Text>My Pokedex App</Text>
      <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          //data to show in suggestion
          data={filteredPkmList}
          //default value if you want to set something in input
          defaultValue={
            JSON.stringify(search) === '{}' ?
            '' :
            search
          }
          // onchange of the text changing the state of the query
          // which will trigger the findFilm method
          // to show the suggestions
          // listContainerStyle={{flex:1}}
          keyExtractor = {item => filteredPkmList.indexOf(item).toString()}
          listStyle={{maxHeight:300}}
          onChangeText={(text) => findPkm(text)}
          onSubmitEditing={() => {
            searchApi(search)
            setSearch('')
            setFilteredPkmList([]);
          }}
          placeholder="Enter Pokemon Name"
          renderItem={({item}) => (
            //you can change the view you want to show in suggestions
            <TouchableOpacity
              onPress={() => {
                searchApi(item);
                setSearch('')
                setFilteredPkmList([]);
              }}>
              <Text style={styles.itemText}>
                  {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      {results.name ? (
        <SearchTile pokemon={results} />
      ) : (
        null
      )}
      <StatusBar style="auto" />
    </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    padding: 16,
    marginTop: 40,
  },
  autocompleteContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 16,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     marginTop: 100
//   },
// });
