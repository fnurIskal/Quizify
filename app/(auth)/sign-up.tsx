import * as React from "react";
import { Text, TextInput, Button, View, Image, Pressable } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
        username,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <>
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
            Email Adresi{" "}
          </Text>

          <Text
            className=" px-3 text-5xl font-bold text-[#713c8d]"
            style={{
              textShadowColor: "black", // Stroke color
              textShadowOffset: { width: 1, height: 1 }, // Adjust offset
              textShadowRadius: 1, // Soften edges
            }}
          >
            Doğrulama
          </Text>

          <View className=" ">
            <TextInput
              className="rounded-3xl flex p-6 m-6 text-center text-xl bg-[#baebe3]"
              value={code}
              placeholder="Doğrulama Kodu"
              onChangeText={(code) => setCode(code)}
            />
          </View>
          <Pressable
            className="rounded-3xl border border-[#acded5] bg-[#005456] p-3 mx-2"
            onPress={onVerifyPress}
          >
            <Text className="text-center font-medium text-base text-[#acded5]">
              Doğrula
            </Text>
          </Pressable>
        </View>
      </>
    );
  }

  return (
    <View className="flex-1 bg-[#acded5]">
      <>
        <Pressable onPress={() => router.push("/(home)")}>
          <Image
            style={{ height: 35, width: 35 }}
            source={require("../../assets/images/back.png")}
          />
        </Pressable>
        <Text
          className=" pt-3 px-3 text-5xl font-bold text-[#713c8d]"
          style={{
            textShadowColor: "black", // Stroke color
            textShadowOffset: { width: 1, height: 1 }, // Adjust offset
            textShadowRadius: 1, // Soften edges
          }}
        >
          Hadi
        </Text>
        <Text
          className=" px-3 text-5xl font-bold text-[#f8991d]"
          style={{
            textShadowColor: "black", // Stroke color
            textShadowOffset: { width: 1, height: 1 }, // Adjust offset
            textShadowRadius: 1, // Soften edges
          }}
        >
          Başlayalım!
        </Text>
        <View className="my-10 gap-2">
          <TextInput
            autoCapitalize="none"
            value={username}
            placeholder="Kullanıcı Adı"
            onChangeText={(username) => setUsername(username)}
            className="rounded-3xl border border-[#005456] p-4 mx-2"
          />
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email"
            onChangeText={(email) => setEmailAddress(email)}
            className="rounded-3xl border border-[#005456] p-4 mx-2"
          />
          <TextInput
            value={password}
            placeholder="Şifre"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            className="rounded-3xl border border-[#005456] p-4 mx-2"
          />
        </View>
        <Pressable
          className="rounded-3xl border border-[#acded5] bg-[#005456] p-3 mx-2"
          onPress={onSignUpPress}
        >
          <Text className="text-center font-medium text-base  text-[#acded5]">
            Kayıt Ol
          </Text>
        </Pressable>

        <View className="flex flex-row justify-center items-center mt-5">
          <Text>Zaten bir hesabınız var mı?</Text>
          <Link href="/sign-in">
            <Text className="text-[#005456] font-medium"> Giriş yap</Text>
          </Link>
        </View>
      </>
    </View>
  );
}
