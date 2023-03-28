import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Modal, TouchableOpacity, Text } from 'react-native';
import CategoryList from './CategoryList';
import EventSearch from './EventSearch';
import CustomCalendar from './Calendar';
import EventListItem from './EventListItemHome';
import events from './events'

const CalendarScreen = () => {
  const categories = [
    { key: 'sports', label: 'Sports', color: 'red' },
    { key: 'music', label: 'Music', color: 'green' },
    { key: 'technology', label: 'Technology', color: 'blue' },
    { key: 'arts', label: 'Arts', color: 'orange' },
  ];
  // const events = [
  //   {
  //     date: '2023-04-10',
  //     title: 'Basketball Game',
  //     description: 'Come watch the New York Knicks play against the Los Angeles Lakers!',
  //     location: 'Madison Square Garden',
  //     category: 'sports'
  //   },
  //   {
  //     date: '2023-04-12',
  //     title: 'Jazz Night',
  //     description: 'Join us for a night of live jazz music featuring local artists.',
  //     location: 'The Fillmore',
  //     category: 'music'
  //   },
  //   {
  //     date: '2023-04-20',
  //     title: 'Tech Conference',
  //     description: 'Discover the latest advancements in technology and network with industry professionals.',
  //     location: 'McCormick Place',
  //     category: 'technology'
  //   },
  //   { date: '2023-04-15', title: 'Art Exhibit Opening', description: 'Come view our latest art exhibit featuring local artists.', location: 'New York', category: 'arts' }

  // ];
  
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAllClicked, setIsAllClicked] = useState(true)
  const [filteredEvents, setFilteredEvents] = useState(events);


  const handleCategorySelect = (category) => {
    console.log('Selected category:', category);
    setSelectedCategory(category);
  };

  const handleSearch = (searchText) => {
    console.log('Search text:', searchText);
    setSelectedCategory(null);
    if (searchText.trim() === '') {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) =>
        event.title.toLowerCase().includes(searchText.toLowerCase()) ||
        event.category.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  };
  

  const handleEventPress = (event) => {
    console.log('Event pressed:', event);
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const onInvite = (item) => {
    console.log(item, '@@@@@@@@')
    return item
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {setSelectedCategory(null); setFilteredEvents(events)}}>
      <EventSearch onSearch={handleSearch} /></TouchableOpacity>
     
     <View style={{display: 'none'}}><CustomCalendar events={events}  /></View>
      <FlatList
  data={filteredEvents.filter((event) =>
    selectedCategory ? event.category === selectedCategory.key : true
  )}
  renderItem={({ item }) => <EventListItem event={item} onPress={handleEventPress} onInvite={onInvite(item)}/>}
  keyExtractor={(item) => item.id}
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
