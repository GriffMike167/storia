import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import Post from '../../components/Post';
// import feed from '../../../assets/data/feed';
import {API, graphqlOperation} from 'aws-amplify';
import {listPosts} from '../../graphql/queries';

const SearchResultsScreen = (props) => {
  //   const {posts} = props;
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsResults = await API.graphql(graphqlOperation(listPosts));

        setPosts(postsResults.data.listPosts.items);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPosts();
  }, []);

  return (
    <View>
      <FlatList data={posts} renderItem={({item}) => <Post post={item} />} />
    </View>
  );
};

export default SearchResultsScreen;
