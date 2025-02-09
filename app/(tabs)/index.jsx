import { View, Text, Button, Pressable, Image } from "react-native";
import { React, useState } from "react";
import { router } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

const home = () => {
  const { user } = useUser();
  return (
    <View className="flex-1 items-center justify-start bg-[#acded5] ">
      {/* başlık */}
      <View className="flex gap-1 p-5 items-start justify-star w-screen">
        <View className="rounded-full border-2 w-11 flex items-center justify-center">
          <Pressable onPress={() => router.push("/profile")}>
            <Image
              style={{ height: 40, width: 40 }}
              source={require("../../assets/images/profile.png")}
            />
          </Pressable>
        </View>
        <Text className="text-base">Merhaba</Text>
        <Text className="font-bold ">{user.username}</Text>
      </View>

      <View className="grid grid-cols-2 gap-4 ">
        {/* kategori */}
        <View className="w-40 h-52 bg-[#005456] rounded-lg border drop-shadow-lg">
          <Pressable
            onPress={() => router.push("/category")}
            className="h-full flex items-center justify-center"
          >
            <Image
              style={{ width: 60, height: 60 }}
              source={require("../../assets/images/categories.png")}
            ></Image>
            <Text className="text-[#acded5] font-bold text-base my-2 ">
              Chose a Category
            </Text>
          </Pressable>
        </View>
        {/* quiz oluştur */}

        <View
          className="w-40 h-52 bg-[#005456] rounded-lg border shadow-lg
"
        >
          <Pressable
            onPress={() => router.push("/create")}
            className="h-full flex items-center justify-center"
          >
            <Image
              style={{ width: 60, height: 60 }}
              source={require("../../assets/images/create.png")}
            ></Image>
            <Text className="text-[#acded5] font-bold text-base my-2 ">
              Create a Quiz
            </Text>
          </Pressable>
        </View>
        {/* senin quizlerin */}
        <View
          className="w-40 h-52 bg-[#005456] rounded-lg border shadow-lg
"
        >
          <Pressable
            onPress={() => router.push("../yourQuizes")}
            className="h-full flex items-center justify-center"
          >
            <Image
              style={{ width: 60, height: 60 }}
              source={require("../../assets/images/list.png")}
            ></Image>
            <Text className="text-[#acded5] font-bold text-base my-2 ">
              Your Quizes
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default home;
