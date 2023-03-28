import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import * as Facebook from 'expo-facebook';
import * as SMS from 'expo-sms';

const InviteScreen = () => {
  const inviteByEmail = async (eventId, eventName) => {
    const subject = `Check out this awesome event: ${eventName}`;
    const body = `Hey, I found this amazing event. You should check it out! http://www.google.com?event=${eventId}`;
    const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
    if (await Linking.canOpenURL(url)) {
      Linking.openURL(url);
    } else {
      alert('Unable to send email');
    }
  };
  
      const inviteBySMS = async (eventId, eventName) => {
        const { result } = await SMS.sendSMSAsync(
          [], // Array of phone numbers to send the SMS to
          `Check out this awesome event: ${eventName} (ID: ${eventId}) http://www.google.com` // The SMS message
        );
        console.log('SMS sent:', result);
      };
      

  const inviteByFacebook = async () => {
    try {
      await Facebook.initializeAsync({
        appId: 'your-facebook-app-id',
      });

      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });

      if (type === 'success') {
        // Implement Facebook invite logic here
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Invite friends</Text>
      <TouchableOpacity onPress={inviteByEmail} style={styles.button}>
        <Text style={styles.buttonText}>Invite by Email</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={inviteBySMS} style={styles.button}>
        <Text style={styles.buttonText}>Invite by Text</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={inviteByFacebook} style={styles.button}>
        <Text style={styles.buttonText}>Invite by Facebook</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  button: {
    backgroundColor: '#1e90ff',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
};

export default InviteScreen;
