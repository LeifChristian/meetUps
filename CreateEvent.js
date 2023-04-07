import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';


const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [isDateTimePickerVisible, setDateTimePickerVisibility] = useState(false);


  const navigation = useNavigation();

  const showDateTimePicker = () => {
    setDateTimePickerVisibility(true);
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setLocation('');
    setCategory('');
  };

  const hideDateTimePicker = () => {
    setDateTimePickerVisibility(false);
  };

  const handleDatePicked = (selectedDate) => {
    const formattedDate = moment(selectedDate).format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ [(Coordinated Universal Time)]');
    setDate(formattedDate);
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
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        multiline
      />

      <Text style={styles.label}>Date and Time</Text>
      <TouchableOpacity style={styles.input} onPress={showDateTimePicker}>
        <Text style={{ color: 'gray' }}>
        {date}
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

      <Button title="Create Event" onPress={()=>{handleSubmit(); navigation.navigate('HomeScreen');
}} />


<View><Text>{"\n"}</Text></View>

<Button title="Cancel" onPress={()=>{onPress={handleCancel}; navigation.navigate('HomeScreen');
}} />
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