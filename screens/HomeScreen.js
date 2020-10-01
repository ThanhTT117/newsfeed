import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  LayoutAnimation,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import Fire from "../Fire";
import "@firebase/firestore";
import FirebaseKey from "../Config";

const posts = [
  {
    id: "1",
    displayName: "Joe",
    text: "Hello JOEEEE",
    timestamp: 1569109273726,
    avatar: require("../assets/avatar.jpg"),
    image: require("../assets/avatar.jpg"),
  },
  {
    id: "2",
    displayName: "Jo1111e",
    text: "Hello JOEEE12123123213213E",
    timestamp: 1569109273727,
    avatar: require("../assets/avatar.jpg"),
    image: require("../assets/avatar.jpg"),
  },
  {
    id: "3",
    displayName: "22222222",
    text: "Hello JOEEE1232TTTTTTTTTTTTTTT2123123213213E",
    timestamp: 1569109273728,
    avatar: require("../assets/avatar.jpg"),
    image: require("../assets/avatar.jpg"),
  },
];

export default class HomeScreen extends React.Component {
  state = {
    PostsList: [],
    displayName: "",
    loading: false,
  };

  componentDidMount() {
    this.getPost();
  }

  getPost = async () => {
    firebase
      .firestore()
      .collection("posts")
      .onSnapshot((doc) => {
        let list = [];
        doc.forEach((doc) => {
          list.push(doc.data());
        });
        this.setState({ PostsList: list });
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
              <Text style={styles.timestamp}>{posts.timestamp}</Text>
            </View>
            <Ionicons name="ios-more" size={24} color="#73788B" />
          </View>
          <Text style={styles.posts}>{posts.text}</Text>
          <Image
            source={posts.image}
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
          <Text style={{ margin: 30 }}>{this.state.PostsList.email}</Text>
          <Text style={styles.headerTitle}>News Feed</Text>
        </View>

        <FlatList
          style={styles.feed}
          data={posts}
          renderItem={({ item }) => this.renderPost(item)}
          // keyExtractor={(item) => item.id}
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
