import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface Props {
  placeholder: string;
  onPress?: () => void;
}

const SearchBar = ({ placeholder, onPress }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        className="size-5"
        source={icons.search}
        resizeMode="contain"
        tintColor={"#AB8BFF"}
      />

      <TextInput
        className="flex-1 ml-2 text-white"
        onPress={onPress}
        onChangeText={() => {}}
        placeholder={placeholder}
        placeholderTextColor={"#a8b5db"}
        style={{ color: "#FFFFFF" }}
        value=""
      />
    </View>
  );
};

export default SearchBar;
