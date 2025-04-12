import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import TrendingCard from '@/components/TrendingCard';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';

import { fetchMovies } from '@/services/API';
import { getTrendingMovies } from '@/services/appwrite';
import useFetch from '@/services/useFetch';

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: '' }));

  return (
    <View className={'flex-1 bg-primary'}>
      <Image source={images.bg} className={'absolute w-full z-0'} />

      {/* Scrollable List */}
      <ScrollView
        className={'flex-1 px-5'}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: '100%',
          paddingBottom: 10,
        }}
      >
        <Image source={icons.logo} className={'w-12 h-10 mt-20 mb-5 mx-auto'} />

        {moviesLoading || trendingLoading ? (
          // if loading
          <ActivityIndicator
            size={'large'}
            color={'#0000ff'}
            className={'mt-10 self-center'}
          />
        ) : moviesError || trendingError ? (
          // if error
          <Text>Error: {moviesError?.message || trendingError?.message}</Text>
        ) : (
          // if we have movies to show
          <View className={'flex-1 mt-5'}>
            <SearchBar
              onPress={() => {
                router.push('/search');
              }}
              placeholder={'Search for a movie'}
            />

            {trendingMovies && (
              <View className={'mt-10 '}>
                <Text className={'text-lg text-white font-bold mb-3'}>
                  Popular Movies
                </Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                  className={'mb-4 mt-3'}
                  data={trendingMovies}
                  // There are non-unique ids
                  // keyExtractor={item => item.movie_id.toString()}
                  keyExtractor={(item, index) =>
                    `${item.movie_id.toString()}-${index}`
                  }
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                />
              </View>
            )}
            <>
              <Text className={'text-lg text-white font-bold mt-5 mb-3'}>
                Latest Movies
              </Text>
              {/*3 columns of data LIST*/}
              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                // keyExtractor for giving unique index to each element
                keyExtractor={item => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: 'flex-start',
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
