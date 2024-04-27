import React, { useState, useEffect, useLayoutEffect } from "react";
import { StyleSheet, Platform, KeyboardAvoidingView } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

// Define the Chat component with props received from navigation
const Chat = ({ route, navigation, db }) => {
  const { name, backgroundColor, _id } = route.params;
  const [messages, setMessages] = useState([]);

  // Function to handle sending new messages and save them to Firestore
  const onSend = async (newMessages = []) => {
    const messageToSend = {
      ...newMessages[0],
      user: {
        _id: _id || 1, // Установити типове значення, якщо _id не передається
        name: name, // Встановлюємо ім'я відправника
      },
    };
    try {
      await addDoc(collection(db, "messages"), messageToSend);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // Customize the chat bubbles' styling
  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000",
        },
        left: {
          backgroundColor: "#FFF",
        },
      }}
    />
  );

  // Initialize messages state when component mounts
  useEffect(() => {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        _id: doc.id,
        text: doc.data().text,
        createdAt: doc.data().createdAt.toDate(),
        user: doc.data().user,
      }));
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [db]);

  // Update navigation options dynamically
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  // Set the navigation bar title on the loading screen
  useLayoutEffect(() => {
    navigation.setOptions({
      title: name || "Chat",
    });
  }, [name, navigation]);

  // Render the GiftedChat component
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? -200 : 0}
      >
        <GiftedChat
          messages={messages}
          renderBubble={renderBubble}
          onSend={onSend} // Updated to send messages to Firestore
          user={{
            _id: _id, // Установити типове значення, якщо _id не передається
            name: name,
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// StyleSheet for the container
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
