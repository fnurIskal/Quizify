import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, View, Button, Image, Pressable } from "react-native";

export default function Page() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <View className=" flex-1 bg-[#acded5]">
      <SignedIn>
        <Pressable
          className="flex-1 flex-row justify-end items-end mb-10"
          onPress={() => router.replace("/(tabs)")}
        >
          <Text
            className="text-5xl font-extrabold  text-[#f8991d]"
            style={{
              textShadowColor: "black", // Stroke color
              textShadowOffset: { width: 2, height: 2 }, // Adjust offset
              textShadowRadius: 1, // Soften edges
            }}
          >
            Hadi Başlayalım
          </Text>
          <Image source={require("../../assets/images/forward.png")} />
        </Pressable>
        <View></View>
      </SignedIn>

      <SignedOut>
        <View className="flex justify-around items-center h-screen gap-3">
          <Image
            style={{ height: 250, width: 250 }}
            source={require("../../assets/images/logo.png")}
          ></Image>

          <Text
            className="text-6xl font-extrabold  text-[#f8991d]"
            style={{
              textShadowColor: "black", // Stroke color
              textShadowOffset: { width: 2, height: 2 }, // Adjust offset
              textShadowRadius: 1, // Soften edges
            }}
          >
            QUIZIFY
          </Text>
          <Text
            className=" my-5 font-bold text-xl text-[#713c8d] "
            style={{
              textShadowColor: "black", // Stroke color
              textShadowRadius: 1, // Soften edges
            }}
          >
            Bilgini konuştur, quizini oluştur!
          </Text>

          <View className="flex gap-4">
            <Link href="/(auth)/sign-in">
              <View className="flex shadow items-center justify-center border-2 font-bold text-xl border-[#005456] rounded-3xl p-3 w-64 h-12">
                <Text className="text-center">Giriş Yap</Text>
              </View>
            </Link>

            <Link href="/(auth)/sign-up">
              <View className="flex shadow items-center justify-center bg-[#005456] font-bold text-xl rounded-3xl p-3 w-64 h-12">
                <Text className="text-center text-[#acded5]">Kayıt Ol</Text>
              </View>
            </Link>
          </View>
        </View>
      </SignedOut>
    </View>
  );
}
