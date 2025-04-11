import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';

const TrendingCard = ({
  movie: { movie_id, title, poster_url },
  index,
}: TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className={'w-32 relative pl-5'}>
        <Image
          source={{ uri: poster_url }}
          className={'w32 h-48 rounded-lg'}
          resizeMode={'cover'}
        />

        <View
          className={'absolute bottom-9 -left-3.5 px-2  py-1 rounded-4'}
        >

        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
