/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
  ListView
} = React;

const API = 'https://www.v2ex.com/api/topics/hot.json'

var Demo = React.createClass({

  getInitialState(){
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loading: true
    }
  },

  componentDidMount(){
    this.fetchTopics()
  },

  fetchTopics(){
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data),
          loading: false
        })
      })
      .done()
  },

  renderTopic(topic){
    return (  
      <View style={styles.container}>
        <Image source={{ uri: 'https:' + topic.member.avatar_normal }}
              style={styles.avatar}
        />
        <View style={ styles.title }>
          <Text>{ topic.title }</Text>
        </View>
      </View>
    )
  },

  render() {
    if (this.state.loading) {
      return (
        <Text>Loading...</Text>
      )
    };
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderTopic}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 12
  },
  title: {
    flex: 1,
    marginLeft: 12,
    fontSize: 24
  },
  avatar: {
    borderRadius: 25,
    width: 50,
    height: 50
  },
});

AppRegistry.registerComponent('Demo', () => Demo);
