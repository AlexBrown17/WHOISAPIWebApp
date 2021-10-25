import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default class GetData extends Component {
  state = {
    data: []
  };

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const response = await fetch("https://randomuser.me/api?results=1");
    const json = await response.json();
    this.setState({ data: json.results });
		console.warn('json: ' + JSON.stringify(json));
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          keyExtractor={(x, i) => i}
          renderItem={({ item }) =>
            <Text>
              {`Name: ${item.name.first} ${item.name.last}\nLocation: ${item.location.country}`}
            </Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
		marginLeft:'15%',
		marginRight: '15%',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
  }
});