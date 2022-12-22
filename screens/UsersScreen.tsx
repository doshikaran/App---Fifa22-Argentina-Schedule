import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import users from "../assets/data/users.json";
import UserListItem from "../components/UserListItem";
import { gql, useQuery } from "@apollo/client";

const GetUsers = gql`
  query GetUsers {
    users {
      id
      displayName
      avatarUrl
    }
  }
`;

const UsersScreen = () => {
  const {data, error, loading} = useQuery(GetUsers);
  if (loading) {
    return <ActivityIndicator/>
  } 
  if (error) {
    return <Text>{error.message}</Text>
  }
  console.log(JSON.stringify(data, null, 2))

  return (
    <FlatList
      data={data.users}
      renderItem={({ item }) => <UserListItem user={item} />}
    />
  );
};

export default UsersScreen;

const styles = StyleSheet.create({});
