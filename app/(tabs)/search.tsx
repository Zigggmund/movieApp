import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';

import { fetchMovies } from '@/services/API';
import { updateSearchCount } from '@/services/appwrite';
import useFetch from '@/services/useFetch';

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const {
    data: movies = [],
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {

    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    // Update count after new view
    if (movies?.[0] && movies?.length > 0) {
      updateSearchCount(searchQuery, movies[0]);
    }
  }, [movies]);

  return (
    <View className={'flex-1 bg-primary'}>
      <Image
        source={images.bg}
        resizeMode={'cover'}
        className={'flex-1 absolute w-full z-0'}
      />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={item => item.id.toString()}
        className={'px-5'}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          !loading && !error ? (
            <View className={'mt-10 px-5'}>
              <Text className={'text-center text-gray-500'}>
                {searchQuery.trim() ? 'No movies found' : 'Search for a movie'}
              </Text>
            </View>
          ) : null
        }
        ListHeaderComponent={
          <>
            <View
              className={'w-full flex-row justify-center mt-20 items-center'}
            >
              <Image source={icons.logo} className={'w-12 h-10'} />
            </View>
            <View className={'my-5'}>
              <SearchBar
                placeholder={'Search movies...'}
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {/*If loading*/}
            {loading && (
              <ActivityIndicator
                size={'large'}
                color={'#0000ff'}
                className={'my-3'}
              />
            )}

            {/*If Error*/}
            {error && (
              <Text className={'text-red-500 px-5 my-3'}>
                Error: {error.message}
              </Text>
            )}

            {/*If no error, no loading, search query exists and length og movies list more than 1*/}
            {!loading &&
              !error &&
              searchQuery.trim() &&
              Array.isArray(movies) &&
              movies?.length > 0 && (
                <Text className={'text-xl text-white font-bold'}>
                  Search Results for {''}
                  <Text className={'text-accent'}>{searchQuery}</Text>
                </Text>
              )}
          </>
        }
      ></FlatList>
    </View>
  );
};

export default Search;
StyleSheet.create({});
