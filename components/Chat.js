// Import necessary libraries and components
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

// Define the Chat component with props received from navigation
const Chat = ({ route, navigation }) => {
    // Retrieve name and backgroundColor from route parameters, passed from previous screen
    const { name, backgroundColor } = route.params;

    // State to store messages
    const [messages, setMessages] = useState([]);

    // Function to handle sending new messages
    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    }

    // Customize the chat bubbles' styling
    const renderBubble = (props) => (
        <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: '#000' // Black bubble for messages sent by the user
                },
                left: {
                    backgroundColor: '#FFF' // White bubble for messages received
                }
            }}
        />
    );

    // Initialize messages state when component mounts
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 2,
                text: 'This is a system message',
                createdAt: new Date(),
                system: true,
            },
        ]);
    }, []);

    // Update navigation options dynamically
    useEffect(() => {
        navigation.setOptions({ title: name });
    }, [name, navigation]);

    // Set the navigation bar title on the loading screen
    useLayoutEffect(() => {
        navigation.setOptions({
            title: name || 'Chat', // Use the username as the title, if available
        });
    }, [name, navigation]);

    // Render the GiftedChat component and handle keyboard behavior
    return (
        <View style={[styles.container, { backgroundColor }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1
                }}
            />
            {Platform.OS === "ios" && <KeyboardAvoidingView behavior="padding" />}
        </View>
    );
};

// StyleSheet for the container
const styles = StyleSheet.create({
    container: {
        flex: 1, // Use flex to utilize the full screen
    },
});

export default Chat;
