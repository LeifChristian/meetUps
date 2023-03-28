import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const EventListItem = ({ event, onPress }) => (
<TouchableOpacity style={styles.container} onPress={() => onPress(event)}>
<Text style={styles.title}>
<Text style={{ fontWeight: 'bold' }}>{event.title}</Text> -{' '}
<Text style={{ textDecorationLine: 'none', color: 'grey' }} onPress={() => console.log(event.location)}>
{event.location}
</Text>
</Text>
</TouchableOpacity>
);

const styles = StyleSheet.create({
container: {
padding: 10,
backgroundColor: '#f8f8f8',
borderBottomWidth: 1,
borderColor: '#eee',
},
title: {
fontSize: 17,
maxWidth: 600,
overflow: 'hidden',
textOverflow: 'ellipsis',
whiteSpace: 'nowrap',
},
});

export default EventListItem;