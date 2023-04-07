import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import DateTime from 'react-datetime';
import moment from 'moment';


const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setDate('');
    setLocation('');
    setCategory('');
  };

  const handleSubmit = async () => {
    const newEvent = {
      title: title,
      description: description,
      category: category,
      date: date.format(),
      location: location
    };

    console.log(newEvent, 'new');

    var config = {
      method: 'post',
      url: 'http://54.219.200.236:3002/events',
      headers: {
        'Content-Type': 'application/json'
      },
      data: newEvent
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter event title"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[{borderColor: 'red', fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        color: '#333', 
        fontSize: 16,minHeight: 30}]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Date and Time</Text>
      <DateTime
        onChange={(momentObj) => setDate(momentObj)}
        inputProps={{
          style: styles.inputDate,
          placeholder: 'Select date and time'
        }}
      />

      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Enter category"
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Enter location"
      />

      <Button title="Create Event" onPress={handleSubmit} />

      <Button title="Cancel" onPress={handleCancel} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginTop: 8,
    color: '#333',
  },
  inputDate: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginTop: 8,
    color: '#333',
  },
  multilineInput: {
    height: 700,
 
  },
});

export default CreateEvent;
