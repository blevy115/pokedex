import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SearchTile = ({ pokemon }) => {
  return (
    <Image
      source={{uri:pokemon.sprites.front_default}}
      style={{width: 200, height: 200}}
    />
  )
}

export default SearchTile;
