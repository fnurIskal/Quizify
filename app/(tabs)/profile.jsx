import React from "react";
import { useAuth, useClerk } from "@clerk/clerk-expo";
import { UserProfile } from "@clerk/clerk-react";
import { Button, View } from "react-native";
import { useRouter } from "expo-router";

export default function Profile() {
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <View>
      <button onClick={() => signOut({ redirectUrl: "/" })}>Sign out</button>
      <UserProfile />
    </View>
  );
}
