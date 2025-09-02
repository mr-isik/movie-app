import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const SavedMovieCard = ({
  movie_id,
  poster_url,
  title,
  vote_average,
  release_date,
}: SavedMovie) => {
  return (
    /* @ts-ignore */
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_url,
          }}
          className="w-full h-52 rounded-lg"
        />

        <Text numberOfLines={1} className="text-sm font-bold text-white mt-2">
          {title}
        </Text>

        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs font-bold text-white uppercase">
            {Math.round(vote_average / 2)}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {release_date?.split("-")[0]}
          </Text>
          {/* <Text className="text-xs font-medium text-light-300 uppercase">
            Movie
          </Text> */}
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default SavedMovieCard;
