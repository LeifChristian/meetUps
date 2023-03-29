import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Modal, TouchableOpacity, Text } from 'react-native';
import CategoryList from './CategoryList';
import EventSearch from './EventSearch';
import CustomCalendar from './Calendar';
import EventListItem from './EventListItemHome';
import axios from 'axios';

const CalendarScreen = () => {
  const categories = [    { key: 'sports', label: 'Sports', color: 'red' },    { key: 'music', label: 'Music', color: 'green' },    { key: 'technology', label: 'Technology', color: 'blue' },    { key: 'arts', label: 'Arts', color: 'orange' },  ];
  
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAllClicked, setIsAllClicked] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [eventFromServer, setEventsFromServer] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const config = {
      method: 'get',
      url: 'http://192.168.1.16:3001/events',
      headers: { 
        'Content-Type': 'application/json'
      }
    };
  
    const fetchEvents = async () => {
      try {
        const response = await axios(config);
        setEventsFromServer(response.data);
        console.log(response.data, '!!!!!!!!!!')
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchEvents();
  }, []);
  
  useEffect(() => {
    if (eventFromServer) {
      if (selectedCategory === null && searchText.trim() === '') {
        console.log(filteredEvents, '000000')
        setFilteredEvents(eventFromServer);
        console.log(filteredEvents, '11111111')
      } else if (selectedCategory === null) {
        const filtered = eventFromServer.filter((event) =>
          event.title.toLowerCase().includes(searchText.toLowerCase()) ||
          event.category.toLowerCase().includes(searchText.toLowerCase())
        );
        console.log(filteredEvents, '2222222')
        setFilteredEvents(filtered);
        console.log(filteredEvents, '3333333')
      } else {
        const filtered = eventFromServer.filter((event) =>
          event.category === selectedCategory.key &&
          (event.title.toLowerCase().includes(searchText.toLowerCase()) ||
          event.category.toLowerCase().includes(searchText.toLowerCase()))
        );
       
      }
    }
  }, [eventFromServer, selectedCategory, searchText]); 


  const handleCategorySelect = (category) => {
    console.log('Selected category:', category.key);
    setSelectedCategory(category);
    setSearchText(category.key);
    setIsAllClicked(false);
 
    const filtered = eventFromServer.filter((event) => event.category.toLowerCase().includes(category.key.toLowerCase()))

    console.log(filteredEvents, '6666666')
    setFilteredEvents(filtered);
    console.log(filteredEvents, '7777777')
    
  };


  const handleSearch = (searchText) => {
    console.log('Search text:', searchText);
    setSelectedCategory(null);
    setSearchText(searchText);
    if (searchText.trim() === '') {
      console.log(filteredEvents, '888888')
      // setFilteredEvents(eventFromServer);
      console.log(filteredEvents, '999999')
    } else {
      const filtered = eventFromServer.filter((event) =>
        event.title.toLowerCase().includes(searchText.toLowerCase()) ||
        event.category.toLowerCase().includes(searchText.toLowerCase())
      );
      console.log(filteredEvents, '101010101010')
      setFilteredEvents(filtered);
      console.log(filteredEvents, '11111111111111111111')
    }
  };
  
  

  const handleEventPress = (event) => {
    console.log('Event pressed:', event);
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const onInvite = (item) => {
    console.log(item, 'invite')
    return item
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {setSelectedCategory(null); setSearchText('')}}>
        <EventSearch onSearch={handleSearch} />
      </TouchableOpacity>
     
      <View style={{display: 'none'}}>
        <CustomCalendar events={filteredEvents} />
      </View>

      <Text>{filteredEvents.length}</Text>
  
      <FlatList
  data={filteredEvents}
  renderItem={({ item }) => (
    <EventListItem event={item} onPress={handleEventPress} onInvite={onInvite(item)} />
  )}
  keyExtractor={(item) => item.id?.toString()}
  keyboardDismissMode="on-drag"
  keyboardShouldPersistTaps="always"
  contentContainerStyle={{ flexGrow: 1 }}
  ListEmptyComponent={() => <Text>No events found</Text>}
/>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>{selectedEvent?.title}</Text>
          <Text style={styles.modalDescription}>{selectedEvent?.description}</Text>
          <Text style={styles.modalDescription}>{selectedEvent?.location}</Text>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              setSelectedEvent(null);
            }}
            style={styles.modalCloseButton}
          >
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
  
      <CategoryList categories={categories} onCategorySelect={handleCategorySelect} />
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CalendarScreen;
