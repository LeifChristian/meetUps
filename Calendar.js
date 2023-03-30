import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
// import events from "./events"
import axios from 'axios'



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


  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);

  const markedDates = events.reduce((acc, event) => {
    acc[event.date] = { marked: true, dotColor: 'blue' };
    return acc;
  }, {});

  const handleDayPress = (day) => {
    const eventsForSelectedDay = events.filter((event) => event.date === day.dateString);
    setSelectedEvents(eventsForSelectedDay);
    setModalVisible(true);
  };

  return (
    <View>
      <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center' }}>Calendar</Text>
      <Calendar
        markedDates={markedDates}
        onDayPress={handleDayPress}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            {selectedEvents.map((event, index) => (
              <View key={index}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{event.title}</Text>
                <Text>{event.description}</Text>
                <Text>Location: {event.location}</Text>
              </View>
            ))}
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
              style={{ backgroundColor: '#1e90ff', padding: 10, marginTop: 10, borderRadius: 5, alignSelf: 'flex-end' }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomCalendar;
