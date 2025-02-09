import { View, Text, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { router } from "expo-router";

const yourQuizes = () => {
  const [titles, setTitles] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/myQuizes").then((response) => {
      setTitles(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <FlatList
      data={titles}
      keyExtractor={(item, index) => item.id?.toString() || index.toString()}
      ListHeaderComponent={() => (
        <Text className="text-xl font-bold text-center p-4">
          Benim Testlerim
        </Text>
      )}
      renderItem={({ item }) => (
        <Pressable onPress={() => router.push(`/myQuizes/${item.id}`)}>
          <Text>
            {console.log(item.id)}
            {item.title}
          </Text>
        </Pressable>
      )}
    ></FlatList>
  );
};

export default yourQuizes;
