import {useState} from 'react'
import pokeapi from '../api/pokeapi';

export default () => {
  const [results, setResults] = useState("");
  const [error, setError] = useState("")


  const searchApi = async (term) => {
    try {
      const response = await pokeapi.get(`pokemon/${term.toLowerCase()}`)
      setResults(response.data);
    }
    catch (err) {
      setError("Something went wrong");
    }
  }
  return [searchApi, results, error]
}
