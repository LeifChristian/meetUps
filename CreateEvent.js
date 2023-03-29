import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [isDateTimePickerVisible, setDateTimePickerVisibility] = useState(false);

  const showDateTimePicker = () => {
    setDateTimePickerVisibility(true);
  };

  const hideDateTimePicker = () => {
    setDateTimePickerVisibility(false);
  };

  const handleDatePicked = (selectedDate) => {
    setDate(moment(selectedDate).format('YYYY-MM-DD'));
    setTime(moment(selectedDate).format('hh:mm A'));
    hideDateTimePicker();
  };

  const handleSubmit = async () => {
    const newEvent = {
      title: title,
      description: description,
      category: category,
      date: date,
      time: time,
      location: location
    };

    console.log(newEvent, 'new');

    var config = {
      method: 'post',
      url: 'http://192.168.1.16:3001/events',
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
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        multiline
      />

      <Text style={styles.label}>Date and Time</Text>
      <TouchableOpacity style={styles.input} onPress={showDateTimePicker}>
        <Text style={{ color: 'gray' }}>
          {date && time ? moment(date + ' ' + time, 'YYYY-MM-DD hh:mm A').format('MMM DD, YYYY - hh:mm A') : 'Select Date and Time'}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDateTimePickerVisible}
        mode="datetime"
        onConfirm={handleDatePicked}
        onCancel={hideDateTimePicker}
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
    </View>
  );
};

  const styles = StyleSheet.create({
    container: {
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
    },
    dateTimePicker: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dateTimePickerButton: {
      marginTop: 16,
    },
  });
  export default CreateEvent