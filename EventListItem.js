import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Card } from 'react-native-paper';

const EventListItem = ({ event, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(event)}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.location}>{event.location}</Text>
          <Text style={styles.date}>{event.date}</Text>
          <View style={styles.tagsContainer}>
            {event.tags.map((tag, index) => (
              <Text key={index} style={styles.tag}>
                {tag}
              </Text>
            ))}
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 14,
    color: 'gray',
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 5,
    marginTop: 5,
  },
});

export default EventListItem;
