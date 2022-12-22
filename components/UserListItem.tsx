import { Pressable, StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import users from '../assets/data/users.json'

type UserListItemProps = {
    user: any,
  };
  
const UserListItem = ({user}: UserListItemProps) => {
  return (
    <Pressable style={styles.container}>
        <Image source={{uri:user.avatarUrl}} style={styles.image}/>
        <Text style={styles.text}>{user.displayName}</Text>
    </Pressable>
  )
}

export default UserListItem

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        padding: 10,
        margin: 10,
        alignItems: "center",
        marginHorizontal: 10,
        backgroundColor: "white",
        borderRadius: 10,
    },
    image:{
        width: 50,
        aspectRatio:1,
        borderRadius: 50
    },
    text:{
        marginLeft: 15,
        fontWeight: "bold",
        letterSpacing: 2
    }
})