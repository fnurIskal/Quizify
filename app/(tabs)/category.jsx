import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Pressable, FlatList, Image } from "react-native";
import { router } from "expo-router";

function category() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((response) => {
        setCategory(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("error:", error);
        setLoading(false);
      });
  }, []);

  return (
    <FlatList
      className="bg-[#acded5]"
      data={category}
      keyExtractor={(item, index) => item.id?.toString() || index.toString()}
      numColumns={1}
      ListHeaderComponent={() => (
        <View className="flex-row items-center justify-between p-4">
          {/* Geri Dön Butonu */}
          <Pressable onPress={() => router.push("/(tabs)")}>
            <Image
              style={{ height: 35, width: 35 }}
              source={require("../../assets/images/back.png")}
            />
          </Pressable>

          {/* Başlık */}
          <Text className="text-xl font-bold text-center flex-1 text-[#713c8d]">
            Kategoriler
          </Text>
          <View style={{ width: 35 }} />
        </View>
      )}
      renderItem={({ item }) => (
        <View className=" w-screen p-2">
          <Pressable
            className=" bg-[#005456] p-3 rounded-xl "
            onPress={() => router.push(`/quiz/${item.id}`)}
          >
            <Text className="text-[#acded5] font-semibold text-base text-center">
              {item.name}
            </Text>
          </Pressable>
        </View>
      )}
    />
  );
}
export default category;
