import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
// import events from "./events"
import axios from 'axios'
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';

const CustomCalendar = () => {
  const [events, setEvents] = useState([])

const config = {
  method: 'get',
  url: 'http://54.219.200.236:3002/events',
  headers: { 
    'Content-Type': 'application/json'
  }
};

const fetchEvents = async () => {
  try {
    const response = await axios(config);
    setEvents(response.data);
    console.log(response.data, '!!!!!!!!!!')
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchEvents();
}, []);



useFocusEffect(
  React.useCallback(() => {
    fetchEvents(); // Call the function to refresh the events list when the screen comes back into focus
  }, [])
);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);

  // const markedDates = events.reduce((acc, event) => {
  //   acc[event.date] = { marked: true, dotColor: 'blue' };
  //   return acc;
  // }, {});
  
  const markedDates = events.reduce((acc, event) => {
    const date = moment(event.date).format('YYYY-MM-DD');
    acc[date] = { marked: true, dotColor: 'blue' };
    return acc;
  }, {});

  const handleDayPress = (day) => {
    const selectedDate = moment(day.dateString).format('YYYY-MM-DD');
    const eventsForSelectedDay = events.filter((event) => moment(event.date).format('YYYY-MM-DD') === selectedDate);
    setSelectedEvents(eventsForSelectedDay);
    setModalVisible(true);
  };
  

  return (
    <View style={{backgroundColor: 'black', flex: 1}}>
    <Calendar
  markedDates={markedDates}
  onDayPress={handleDayPress}
  style={{ backgroundColor: 'black'}}
/> 
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', color: 'white' }}>
          <View style={{ backgroundColor: 'black', padding: 20, borderRadius: 10 }}>
            {selectedEvents.map((event, index) => (
              <View key={index} style={{alignItems: 'center'}}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{event.title}</Text>
                <Text style={{color: "white"}}>{event.description}</Text>
                <Text style={{color: 'white'}}>Location: {event.location}</Text>
                <Text style={{color: 'white'}}>{moment(event.date)?.format('MMMM DD, YYYY - hh:mm A')? moment(event.date)?.format('MMMM DD, YYYY - hh:mm A'): ''}</Text>       
              </View>
            ))}
        <TouchableOpacity
  onPress={() => {
    setModalVisible(false);
  }}
  style={{ 
    backgroundColor: '#1e90ff', 
    padding: 10, 
    marginTop: 10, 
    borderRadius: 5,
    width: 100,
    justifyContent: 'center',
    alignSelf: 'center'
  }}
>
  <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Close</Text>
</TouchableOpacity>

          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomCalendar;
