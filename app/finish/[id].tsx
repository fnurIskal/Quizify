import { View, Text, Pressable, Image } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";

const Finish = () => {
  const { correctNum } = useLocalSearchParams(); // ✅ Doğru yöntem
  console.log(correctNum);
  const router = useRouter();

  const { id } = useLocalSearchParams(); // URL'den veriyi al

  return (
    <View className="flex-1 bg-[#acded5] justify-center items-center">
      {/* Geri Tuşu */}
      <Pressable
        onPress={() => router.push("/(tabs)")}
        className="absolute top-5 left-4"
      >
        <Image
          style={{ height: 35, width: 35 }}
          source={require("../../assets/images/back.png")}
        />
      </Pressable>
      {/* Sonuç */}
      <Text>Doğru Sayısı: {id}</Text>
      <Text>Yanlış Sayısı: </Text>

      <Pressable onPress={() => router.push("/(tabs)/category")}>
        <Text className="bg-[#005456] py-2 px-10 m-5 rounded-2xl text-[#acded5]">
          Başka bir test çöz
        </Text>
      </Pressable>
    </View>
  );
};

export default Finish;
