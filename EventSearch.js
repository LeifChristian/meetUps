import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

const EventSearch = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search for events"
      />
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => onSearch(searchText)}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    top: -11,
    borderColor: '#ccc',
    borderWidth: 1,
    width: "90%",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchButton: {
    width: "46%",
   
    backgroundColor: '#3a9',
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginLeft: 5,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
});

export default EventSearch;