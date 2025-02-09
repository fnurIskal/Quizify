import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, Button, View, Image, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: username,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <View className="flex-1 bg-[#acded5]">
      <Pressable onPress={() => router.push("/(home)")}>
        <Image
          style={{ height: 35, width: 35 }}
          source={require("../../assets/images/back.png")}
        />
      </Pressable>
      <Text
        className=" pt-3 px-3 text-5xl font-bold  text-[#f8991d]"
        style={{
          textShadowColor: "black", // Stroke color
          textShadowOffset: { width: 1, height: 1 }, // Adjust offset
          textShadowRadius: 1, // Soften edges
        }}
      >
        Merhaba,
      </Text>
      <Text
        className=" px-3 text-5xl font-bold text-[#713c8d]"
        style={{
          textShadowColor: "black", // Stroke color
          textShadowOffset: { width: 1, height: 1 }, // Adjust offset
          textShadowRadius: 1, // Soften edges
        }}
      >
        Tekrar Hoşgeldiniz
      </Text>

      <View className="my-10 gap-2">
        <TextInput
          className="rounded-3xl border border-[#005456] p-4 mx-2"
          autoCapitalize="none"
          value={username}
          placeholder="Kullanıcı Adı"
          onChangeText={(username) => setUsername(username)}
        />
        <TextInput
          className="rounded-3xl border border-[#005456] p-4 mx-2"
          value={password}
          placeholder="Şifre"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <Pressable
        className="rounded-3xl border border-[#acded5] bg-[#005456] p-3 mx-2"
        onPress={onSignInPress}
      >
        <Text className="text-center font-medium text-base text-[#acded5]">
          Giriş Yap
        </Text>
      </Pressable>

      <View className="flex flex-row justify-center items-center mt-5">
        <Text>Hesabınız Yok Mu?</Text>
        <Link href="/sign-up">
          <Text className="text-[#005456] font-medium"> Kayıt Ol</Text>
        </Link>
      </View>
    </View>
  );
}
