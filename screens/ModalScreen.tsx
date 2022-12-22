import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Image, Platform, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import info from "../assets/data/info.json";
import { AntDesign } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton/CustomButton";
import users from "../assets/data/users.json";
import { gql, useQuery } from "@apollo/client";

const GetMatches = gql`
 query GetMatches($id: uuid!) {
  Matches_by_pk(id: $id) {
    id
    name
    date
    stadium
  }
}
`
export default function ModalScreen({route}) {
  const id = route?.params?.id
  const {data, error, loading} = useQuery(GetMatches, {variables:{id}})
  const match = data?.Matches_by_pk

  const onJoin = () => {};
  const displayedUsers = users.slice(0, 5);

  if(error) {
    return <Text>{error.message}</Text>
  }
  if(loading) {
    return <ActivityIndicator/>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{match.name}</Text>
      <View style={styles.info}>
        <View>
          <AntDesign name="calendar" size={18} color={"black"} />
          <Text style={{ fontSize: 10, fontWeight: "700", color: "gray" }}>
            {new Date(match.date).toDateString()}
          </Text>
        </View>
        <Text style={{ fontSize: 10, fontWeight: "700", color: "gray" }}>
          {match.stadium}
        </Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.headline}>{info.headline}</Text>
        <Image
          source={{ uri: info.image }}
          style={{ height: 250, marginTop: 25 }}
        />
        <Text style={{ marginTop: 20, fontSize: 15, fontWeight: "200" }}>
          {info.description}
        </Text>
      </View>

      <View style={styles.footer}>
        <View style={{ flexDirection: "row" }}>
          {displayedUsers.map((user, index) => (
            <Image
              key={user.id}
              source={{ uri: user.image }}
              style={[
                styles.footerimage,
                { transform: [{ translateX: -20 * index }] },
              ]}
            />
          ))}
          <View style={[
                styles.footerimage,
                { transform: [{ translateX: -20 * displayedUsers.length }] },
              ]}>
            <Text>+{users.length - displayedUsers.length}</Text>
          </View>
        </View>

        <CustomButton text="Join the match" onPress={onJoin} />
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 25,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  info: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
  },
  details: {
    marginTop: 50,
  },
  headline: {
    fontSize: 15,
    fontStyle: "italic",
    fontWeight: "700",
    letterSpacing: 2,
  },
  footer: {
    marginTop: "auto",
  },
  footerimage: {
    width: 50,
    backgroundColor: "gainsboro",
    aspectRatio: 1,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
