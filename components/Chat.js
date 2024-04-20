// components/Chat.js
import React, { useLayoutEffect }  from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Chat = ({ route, navigation }) => {
    // Retrieving backgroundColor from route parameters passed from Start.js
    const { name, backgroundColor } = route.params;

        // navigation bar title on loading screen
      useLayoutEffect(() => {
        navigation.setOptions({
              title: name ? name : 'Chat', // Set the username as the title, if there is one
          });
      }, [name, navigation]);

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Text>Chat Screen</Text>
        </View>
    );
};

// initial styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // Temporary background color that will be replaced by the parameter
        backgroundColor: '#FFF',
    },
});

export default Chat;
