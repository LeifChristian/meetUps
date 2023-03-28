import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import EventListItem from './EventListItem';

const EventList = ({ events }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={({ item }) => <EventListItem event={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default EventList;
