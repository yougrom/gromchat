// components/Start.js
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

export default function Start({ navigation }) {
    const [name, setName] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');

    function enterChat() {
        // When the user presses the button, navigate to the Chat screen and pass the user name and background color
        navigation.navigate('Chat', { name: name, backgroundColor: backgroundColor });
    }

    const backgroundImage = require('../assets/background-image.png');

    return (
        <View style={styles.container}>
          <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
            <Text style={styles.title}>Grom Chat</Text>
            <View style={styles.box}>
                <TextInput
                    style={styles.input}
                    placeholder="Your Name"
                    placeholderTextColor="#757083"
                    value={name}
                    onChangeText={setName}
                />
                <Text style={styles.text}>
                    Choose Background Color:
                </Text>
                <View style={styles.colorOptions}>
                    <TouchableOpacity
                        onPress={() => setBackgroundColor('#090C08')}
                        style={[styles.colorButton, { backgroundColor: '#090C08' }]}
                    />
                    <TouchableOpacity
                        onPress={() => setBackgroundColor('#474056')}
                        style={[styles.colorButton, { backgroundColor: '#474056' }]}
                    />
                    <TouchableOpacity
                        onPress={() => setBackgroundColor('#8A95A5')}
                        style={[styles.colorButton, { backgroundColor: '#8A95A5' }]}
                    />
                    <TouchableOpacity
                        onPress={() => setBackgroundColor('#B9C6AE')}
                        style={[styles.colorButton, { backgroundColor: '#B9C6AE' }]}
                    />
                </View>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: backgroundColor }]}
                    onPress={enterChat}
                >
                    <Text style={styles.buttonText}>Start Chatting</Text>
                </TouchableOpacity>
                
            </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },  
  container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#ffffff',
      
  },
  title: {
      fontSize: 45,
      fontWeight: '600',
      color: '#FFFFFF',
      marginTop: '0%',
      marginBottom: '75%',
  },
  box: {
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      width: '88%',
      height: '44%',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '6%',
  },
  input: {
      fontSize: 16,
      fontWeight: '300',
      color: '#757083',
      width: '88%',
      padding: 10,
      borderColor: '#757083',
      borderRadius: 5,
      borderWidth: 1,
      opacity: 0.5,
  },
  text: {
      fontSize: 16,
      fontWeight: '300',
      color: '#757083',
      opacity: 1,
  },
  colorOptions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '88%',
  },
  colorButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
  },
  button: {
      width: '88%',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
  },
  buttonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
  },
});
