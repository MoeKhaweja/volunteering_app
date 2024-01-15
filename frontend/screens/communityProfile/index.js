import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Avatar,
  Title,
  Paragraph,
  Card,
  List,
  Divider,
  Text,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const CommunityProfilePage = ({ route }) => {
  const navigation = useNavigation();
  const { events, community } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {/* Top section with circular avatar, community name, and description */}
      <View style={styles.topSection}>
        <Avatar.Image
          size={100}
          source={{ uri: community.img }} // Use community image if available
          style={styles.avatar}
        />
        <View style={styles.nameContainer}>
          <Title>{community.name}</Title>
          <Paragraph>{community.description}</Paragraph>
        </View>
      </View>

      <ScrollView>
        {/* Community details */}
        <Card style={{ margin: 3 }}>
          <Card.Content>
            <List.Section
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <List.Subheader onPress={() => {}}>Owner</List.Subheader>
              <Text>
                {community.owner.firstName + " " + community.owner.lastName}
              </Text>
            </List.Section>

            <Divider style={styles.divider} />

            <List.Section>
              <List.Subheader>Events:</List.Subheader>
              {events.map((event, index) => (
                <View key={index}>
                  <Divider></Divider>
                  <List.Item
                    key={index}
                    title={event.title}
                    onPress={() =>
                      navigation.navigate("VolunteerEventDetails", {
                        event: event,
                      })
                    }
                  />
                </View>
                // You may want to fetch and display more details for each event
              ))}
            </List.Section>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  nameContainer: {
    flex: 1,
    marginLeft: 16,
  },
  divider: {
    marginVertical: 16,
  },
});

export default CommunityProfilePage;
