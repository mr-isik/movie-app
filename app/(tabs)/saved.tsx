import SavedMovieCard from "@/components/saved-movie-card";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { getSavedMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

const Saved = () => {
  const {
    data: savedMovies,
    loading,
    error,
    refetch,
  } = useFetch(() => getSavedMovies());

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5000);
    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <View className="bg-primary flex-1">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <ScrollView className="px-5 flex-1">
        <FlatList
          data={savedMovies}
          renderItem={({ item }) => <SavedMovieCard {...item} />}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "flex-start",
            gap: 16,
            marginVertical: 16,
          }}
          contentContainerStyle={{ paddingBottom: 100 }}
          keyExtractor={(item) => item.$id.toString()}
          scrollEnabled={false}
          ListHeaderComponent={
            <>
              <View className="w-full flex-row justify-center mt-20 mb-12 items-center">
                <Image source={icons.logo} className="w-12 h-10" />
              </View>

              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Saved Movies
              </Text>

              {loading && (
                <ActivityIndicator
                  size="large"
                  color="#0000ff"
                  className="my-3"
                />
              )}

              {error && (
                <Text className="text-red-500 px-5 my-3">
                  Error: {error.message}
                </Text>
              )}
            </>
          }
          ListEmptyComponent={
            !loading && !error ? (
              <View className="mt-10 px-5">
                <Text className="text-center text-gray-500">
                  No saved movies found.
                </Text>
              </View>
            ) : null
          }
        />
      </ScrollView>
    </View>
  );
};

export default Saved;
