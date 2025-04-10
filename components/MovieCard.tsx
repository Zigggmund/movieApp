import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';

import { icons } from '@/constants/icons';

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  console.log(poster_path);
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className={'w-[30%]'}>
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : 'https://placehold.co/600x400/1a1a1a/FFFFFF.png',
          }}
          className={'w-full h-52 rounded-lg'}
          resizeMode={'cover'}
        />
        <Text numberOfLines={1} className={'text-sm font-bold text-white mt-2'}>
          {title}
        </Text>

        <View className={'flex-row items-center justify-start gap-x-1'}>
          <Image source={icons.star} className={'size-4'} />
          <Text className={'text-xs text-white font-bold uppercase'}>
            {/* Vote like 6.1 */}
            {Math.round(vote_average * 10) / 10}
          </Text>
        </View>
        <View className={'flex-row items-center justify-between'}>
          {/* Only Release year, not entire date*/}
          <Text className={'text-xs font-medium text-light-300 mt-1'}>
            {release_date?.split('-')[0]}
          </Text>

           {/*NEXT CODE CAN BE USED IF THERE ARE TV SHOWS, NOT JUST MOVIES*/}
          {/*<Text className={'text-sx font-medium text-light-300 uppercase'}>*/}
          {/*  Movie*/}
          {/*</Text>*/}
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
