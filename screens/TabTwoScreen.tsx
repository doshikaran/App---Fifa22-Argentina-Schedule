import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
//import users from "../assets/data/users.json";
import CustomButton from "../components/CustomButton/CustomButton";
import { useUserData, useSignOut } from "@nhost/react";

const TabTwoScreen = () => {
  const user = useUserData();
  //console.log(JSON.stringify(user, null, 2))
  const { signOut } = useSignOut();

  return (
    <View style={styles.container}>
      <Image source={{ uri: user?.avatarUrl }} style={styles.image} />
      <Text style={styles.name}>{user?.displayName}</Text>
      <View style={{ marginTop: "auto" }}>
        <CustomButton
          onPress={signOut}
          text="Sign Out"
          type="TERTIARY"
          fgColor="crimson"
        />
      </View>
    </View>
  );
};

export default TabTwoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 50,
    marginTop: 10,
  },
  name: {
    fontSize: 20,
    letterSpacing: 5,
    fontWeight: "bold",
    color: "gray",
    marginVertical: 15,
  },
});
