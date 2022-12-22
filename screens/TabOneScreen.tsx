import { Alert, Pressable, StyleSheet, Image, ActivityIndicator } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { Agenda, AgendaEntry, AgendaSchedule } from "react-native-calendars";
import events from "../assets/data/events.json";
import { gql, useQuery } from "@apollo/client";

const GetMatches = gql`
  query GetMatches {
    Matches {
      id
      name
      date
      stadium
    }
  }
`;

const getEventsSchedule = (matches: []): AgendaSchedule => {
  const items: AgendaSchedule = {};

  matches.forEach((matches) => {
    const day = matches.date.slice(0,10);

    if (!items[day]) {
      items[day] = [];
    }
    items[day].push({ ...matches, day, height: 50 });
  });

  return items;
};

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const { data, error, loading } = useQuery(GetMatches);

  const renderItem = (matches: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? "black" : "gray";
    return (
      <Pressable
        style={[styles.item, { height: matches.height }]}
        onPress={() => navigation.navigate("Modal", { id: matches.id })}
      >
        <Text style={[styles.text, { color, fontSize }]}>{matches.name}</Text>
        <View style={styles.info}>
          <Text style={{ fontSize: 10, fontWeight: "700", color: "gray" }}>
            {matches.date}
          </Text>
          <Text style={{ fontSize: 10, fontWeight: "700", color: "gray" }}>
            {matches.stadium}
          </Text>
        </View>
      </Pressable>
    );
  };

  const renderEmptyDate = () => {
    const height = 50;
    return (
      <View style={[styles.item, { height }]}>
        <Text>No match today</Text>
      </View>
    );
  };

  if(loading) {
    return <ActivityIndicator/>
  }
  if(error) {
    Alert.alert(error.message)
  }

  const matches = getEventsSchedule(data.Matches)

  return (
    <View style={styles.container}>
      <Agenda
        items={matches}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        selected="2022-11-29"
        // showOnlySelectedDayItems
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 20,
  },
  text: {},
  info: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
});
