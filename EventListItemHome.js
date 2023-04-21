import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const invite = (thing)=>{console.log('invite!',thing)}

const EventListItem = ({ event, onPress, onInvite }) => (
<TouchableOpacity style={styles.container} onPress={() => onPress(event)}>
  <Text style={styles.title}>
    <Text style={{ fontWeight: 'bold' }}>{event.title}</Text>
    <Text style={{ fontStyle: 'italic', fontSize: 12 }}> - {event.category}</Text>
    {"\n"}
  
    <Text style={{ textDecorationLine: 'none', color: 'grey', fontSize: 14 }}>
  {
    (() => {
      const date = new Date(event.date);
      return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)} ${((date.getHours() % 12) || 12).toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} ${(date.getHours() < 12) ? 'AM' : 'PM'}`;
    })()
  }
</Text> {event.location ?  '- ' : ''}

<Text style={{ textDecorationLine: 'none', color: 'grey', fontSize: 14 }}>
      {event.location}
    </Text>

  </Text>
  <View style={styles.buttonContainer}>
    <TouchableOpacity onPress={() => invite(event)} style={styles.button}>
      <MaterialIcons name="person-add" size={14} color="white" />
      <Text style={styles.buttonText}>Invite</Text>
    </TouchableOpacity>
  </View>
</TouchableOpacity>



);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'black',
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    color: 'white',
    maxWidth: 280,
    overflow: 'hidden',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },
});

export default EventListItem;
