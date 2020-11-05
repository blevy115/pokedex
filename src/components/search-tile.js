import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import pokeapi from '../../api/pokeapi';

const SearchTile = ({ pokemon }) => {
  const { container, image, table } = styles;
  const [weakness, setWeakness ] = useState([])
  const [strength, setStrength ] = useState([])
  const { types } = pokemon;
  let tempWeakness = [];
  let tempStrength = [];


  const determineTypeEffectiveness = async( type ) => {
    try {
      const response = await pokeapi.get(`type/${type}`)
      const newWeakness = response.data.damage_relations.double_damage_from.forEach((item, i) => {
        tempWeakness = [...tempWeakness, item.name]
      });
      setWeakness(tempWeakness);
      const newStrength = response.data.damage_relations.half_damage_from.forEach((item, i) => {
        tempStrength = [...tempStrength, item.name]
      });
      setStrength(tempStrength);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setWeakness([]);
    setStrength([]);
    types.forEach((type) => {
      determineTypeEffectiveness(type.type.name);
    });
  }, [pokemon.name])

  return (
    <>
      <View style={container}>
        <Image
          source={{uri:pokemon.sprites.front_default}}
          style={image}
        />
      </View>
      <View style={table}>
        <View>
          <Text>Weak To</Text>
          {weakness.map((item, i) => {
            return <Text key={i}>{item}</Text>
          })
          }
        </View>
        <View>
          <Text>Resistant Against</Text>
          {strength.map((item, i) => {
            return <Text key={i}>{item}</Text>
          })
          }
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200
  },
  container: {
    flexDirection:'row',
    justifyContent: 'center'
  },
  table: {
    flexDirection:'row',
    justifyContent: 'space-evenly'
  }
})

export default SearchTile;
