import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Dimensions } from 'react-native';
import axios from 'axios';

const windowHeight = Dimensions.get('window').height;

const Setlist = () => {
  const [text, setText] = useState('Default text value');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchSetlist();
  }, []);

  const config = {
    method: 'get',
    url: 'http://54.219.200.236:3002/setlist',
    headers: { 
      'Content-Type': 'application/json'
    }
  };
  
  const fetchSetlist = async () => {
    try {
      const response = await axios(config);
      console.log(response, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      setText(response.data.text);
    } catch (error) {
      console.log(error);
    }
  };
  
  const saveSetlist = async () => {
    const config = {
      method: 'patch',
      url: 'http://54.219.200.236:3002/setlist',
      headers: { 
        'Content-Type': 'application/json'
      },
      data: {
        text: text
      }
    };
  
    try {
      const response = await axios(config);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    saveSetlist();
    setIsEditing(false);
  };

  return (
    <View style={[styles.container, { height: windowHeight }]}>
      {isEditing ? (
        <>
          <TextInput selectable
            multiline={true}
            numberOfLines={10}
            onChangeText={text => setText(text)}
            value={text}
            style={styles.textarea}
            textAlignVertical="center"
            autoFocus={true}
          />
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity style={styles.button} onPress={handleEdit}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <Text selectable style={styles.text}>{text}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      padding: 16,
      height: 500,
      backgroundColor: 'black'
    },
    textarea: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      color: "lightgreen",
      textAlign: 'center',
      padding: 2,
      maxHeight: (windowHeight * .48),
      textAlignVertical: 'center',
    },
    button: {
      backgroundColor: 'blue',
      borderRadius: 8,
      padding: 16,
      position: 'relative',
      marginVertical: 8,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    text: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      textAlign: 'center',
      padding: 8,
      marginVertical: 8,
      color: 'lightgreen',
      maxHeight: (windowHeight * .6),
    }
  });
  

export default Setlist;
