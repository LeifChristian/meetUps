import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, Switch, ScrollView } from 'react-native';

const SettingsScreen = () => {
  const [notificationSettings, setNotificationSettings] = useState({ push: true, email: true, sms: true });
  const [privacySettings, setPrivacySettings] = useState({ profile: true, messages: true, activity: true });

  const toggleSetting = (settingName) => {
    const updatedSettings = { ...notificationSettings, [settingName]: !notificationSettings[settingName] };
    setNotificationSettings(updatedSettings);
  };

  const togglePrivacySetting = (settingName) => {
    const updatedSettings = { ...privacySettings, [settingName]: !privacySettings[settingName] };
    setPrivacySettings(updatedSettings);
  };

  return (
    <ScrollView style={{backgroundColor: 'black', color: 'white'}}>
      <View style={{maxWidth: "90%", marginLeft: '5%'}}>
        <Text style={styles.sectionTitle}>Profile Settings</Text>
        {/* Add profile settings components here */}

        <Text style={styles.sectionTitle}>Notification Settings</Text>
        <View style={styles.settingRow}>
          <Text  style={{color: 'white'}}>Push Notifications</Text>
          <Switch
            value={notificationSettings.push}
            onValueChange={() => toggleSetting('push')}
          />
        </View>
        <View style={styles.settingRow}>
          <Text  style={{color: 'white'}}>Email Notifications</Text>
          <Switch
            value={notificationSettings.email}
            onValueChange={() => toggleSetting('email')}
          />
        </View>
        <View style={styles.settingRow}>
          <Text  style={{color: 'white'}}>SMS Alerts</Text>
          <Switch
            value={notificationSettings.sms}
            onValueChange={() => toggleSetting('sms')}
          />
        </View>

        <Text style={styles.sectionTitle}>Privacy Settings</Text>
        {/* Add privacy settings components here */}
        <View style={styles.settingRow}>
          <Text  style={{color: 'white'}}>Profile Visibility</Text>
          <Switch
            value={privacySettings.profile}
            onValueChange={() => togglePrivacySetting('profile')}
          />
        </View>
        <View style={styles.settingRow}>
          <Text  style={{color: 'white'}}>Message Privacy</Text>
          <Switch
            value={privacySettings.messages}
            onValueChange={() => togglePrivacySetting('messages')}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={{color: 'white'}}>Activity Visibility</Text>
          <Switch
            value={privacySettings.activity}
            onValueChange={() => togglePrivacySetting('activity')}
          />
        </View>

        <Text style={styles.sectionTitle}>Theme Settings</Text>
        {/* Add theme settings components here */}

        <Text style={styles.sectionTitle}>Account Settings</Text>
        {/* Add account settings components here */}

        <Text style={styles.sectionTitle}>Help and Support</Text>
        {/* Add help and support components here */}
      </View>
    </ScrollView>
  );
};

const styles = {
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  settingRow: {
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
};

export default SettingsScreen;
