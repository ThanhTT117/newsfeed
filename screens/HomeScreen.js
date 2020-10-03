import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";

import "@firebase/firestore";
import moment from "moment";

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("posts");
    this.unsubscribe = null;
    this.state = {
      posts: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.getPost);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getPost = (querySnapshot) => {
    const posts = [];
    querySnapshot.forEach((doc) => {
      const { displayName, image, text, timestamp } = doc.data();
      posts.push({
        key: doc.id, // Document ID
        displayName, // DocumentSnapshot
        image,
        text,
        timestamp,
      });
    });
    this.setState({
      posts,
      loading: false,
    });
  };

  renderPost = (posts) => {
    return (
      <View style={styles.feedItem}>
        {/* <Image source={post.avatar} style={styles.avatar}></Image> */}
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.name}>{posts.displayName}</Text>
              <Text style={styles.timestamp}>
                {moment(posts.timestamp).fromNow()}
              </Text>
            </View>
            <Ionicons name="ios-more" size={24} color="#73788B" />
          </View>
          <Text style={styles.posts}>{posts.text}</Text>
          <Image
            source={{ uri: posts.image }}
            style={styles.postImage}
            resizeMode="cover"
          ></Image>
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              name="ios-heart-empty"
              size={24}
              style={{ marginRight: 16 }}
            />
            <Ionicons
              name="ios-chatboxes"
              size={24}
              style={{ marginRight: 16 }}
            />
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>News Feed</Text>
        </View>

        <FlatList
          style={styles.feed}
          data={this.state.posts}
          renderItem={({ item }) => this.renderPost(item)}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFECF4",
  },
  header: {
    paddingTop: 34,
    paddingBottom: 16,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
    flexDirection: "row",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
  feed: {
    marginHorizontal: 16,
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65",
    marginTop: 4,
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4,
  },
  postImage: {
    width: undefined,
    height: 150,
    borderWidth: 5,
    marginVertical: 16,
  },
});
