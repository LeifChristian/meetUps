import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Modal, TouchableOpacity, Text, Alert } from 'react-native';
import CategoryList from './CategoryList';
import EventSearch from './EventSearch';
import CustomCalendar from './Calendar';
import EventListItem from './EventListItemHome';
import { useFocusEffect } from '@react-navigation/native';
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
      setEventsFromServer(response.data);
      console.log(response.data, '!!!!!!!!!!')
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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

  
  useFocusEffect(
    React.useCallback(() => {
    
   
      fetchEvents(); // Call the function to refresh the events list when the screen comes back into focus
    }, [])
  );


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
  

  const handleEditEvent = async (event) => {
    const updatedEvent = { ...event }; // make a copy of the event object to avoid modifying the original object
  
    // make the patch request to update the event
    try {
      const response = await axios.patch(`http://54.219.200.236:3002/events/${event.id}`, updatedEvent);
      console.log(response.data); // log the updated event
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleDeleteEvent = async (theEvent) => {

    console.log(theEvent, 'BILL!!!!!');

    // show a confirmation prompt before deleting the event
    Alert.alert(
      `Delete Event`,
      `Are you sure you want to delete ${theEvent.title}?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: async () => {
            // make the delete request to delete the event
            try {
              const response = await axios.delete(`http://54.219.200.236:3002/events/${theEvent._id}`);
              console.log(response.data); // log the message
            } catch (error) {
              console.log(error);
            }
          },
          style: 'destructive'
        }
      ]
    );
    fetchEvents();
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
      {/* <Modal
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
      </Modal> */}

<Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(false);
    setSelectedEvent(null);
  }}
>
  <View style={styles.modal}>
    <Text style={styles.modalTitle}>{selectedEvent?.title}</Text>
    <Text style={styles.modalDescription}>{selectedEvent?.description}</Text>
    <Text style={styles.modalDescription}>{selectedEvent?.location}</Text>
    <View style={styles.modalButtonContainer}>
      <TouchableOpacity
        style={[styles.modalButton, styles.closeButton]}
        onPress={() => {
          setModalVisible(false);
          setSelectedEvent(null);
        }}
      >
        <Text style={styles.modalButtonText}>Close</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.modalButton, styles.editButton]}
        onPress={() => {
          handleEditEvent(selectedEvent); // call handleEditEvent with the selected event object
          setModalVisible(false);
          setSelectedEvent(null);
          fetchEvents();
        }}
      >
        <Text style={styles.modalButtonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.modalButton, styles.deleteButton]}
        onPress={() => {
          handleDeleteEvent(selectedEvent); // call handleDeleteEvent with the selected event ID
          setModalVisible(false);
          setSelectedEvent(null);
        }}
      >
        <Text style={styles.modalButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

  
      <CategoryList categories={categories} onCategorySelect={handleCategorySelect} />
    </View>
  );
  
};

const styles = StyleSheet.create({
  modalButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  modalCloseButton: {
    backgroundColor: '#bbb',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalCloseButtonText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
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
