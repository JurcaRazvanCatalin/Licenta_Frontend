import { ScrollView } from "react-native";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../UI/Colors";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";

function HomeTeam({ homeTeamStats }) {
  const navigation = useNavigation();

  return (
    <ScrollView horizontal={true}>
      <View style={styles.container}>
        <View style={styles.tableRow}>
          <Text style={[styles.cell, styles.headerCell, styles.nameContainer]}>
            Name
          </Text>
          <Text style={[styles.cell, styles.headerCell]}>NR</Text>
          <Text style={[styles.cell, styles.headerCell]}>MIN</Text>
          <Text style={[styles.cell, styles.headerCell]}>PTS</Text>
          <Text style={[styles.cell, styles.headerCell]}>REB</Text>
          <Text style={[styles.cell, styles.headerCell]}>AST</Text>
          <Text style={[styles.cell, styles.headerCell]}>BLK</Text>
          <Text style={[styles.cell, styles.headerCell]}>2FGM</Text>
          <Text style={[styles.cell, styles.headerCell]}>2FGA</Text>
          <Text style={[styles.cell, styles.headerCell]}>2FG%</Text>
          <Text style={[styles.cell, styles.headerCell]}>3FGM</Text>
          <Text style={[styles.cell, styles.headerCell]}>3FGA</Text>
          <Text style={[styles.cell, styles.headerCell]}>3FG%</Text>
          <Text style={[styles.cell, styles.headerCell]}>FTM</Text>
          <Text style={[styles.cell, styles.headerCell]}>FTA</Text>
          <Text style={[styles.cell, styles.headerCell]}>FT%</Text>
          <Text style={[styles.cell, styles.headerCell]}>FLS</Text>
          <Text style={[styles.cell, styles.headerCell]}>TOV</Text>
        </View>
        {homeTeamStats &&
          homeTeamStats.map((data, index) => {
            return (
              <View key={index} style={styles.tableRow}>
                <Pressable
                  onPress={() =>
                    navigation.navigate("Player", {
                      playerName: data.playerName,
                      playerNameSmall: data.playerNameSmall,
                    })
                  }
                  android_ripple={{ color: Colors.grey_300 }}
                  style={({ pressed }) => {
                    pressed ? styles.buttonPressed : null;
                  }}
                >
                  <Text style={[styles.nameContainer]}>{data.playerName}</Text>
                </Pressable>
                <Text style={styles.cell}>#{data.playerNumber}</Text>
                <Text style={styles.cell}>{data.minutesPlayed}</Text>
                <Text style={styles.cell}>{data.pts}</Text>
                <Text style={styles.cell}>{data.reb}</Text>
                <Text style={styles.cell}>{data.ass}</Text>
                <Text style={styles.cell}>{data.blocks}</Text>
                <Text style={styles.cell}>{data.two_fgm}</Text>
                <Text style={styles.cell}>{data.two_fga}</Text>
                <Text style={styles.cell}>{data.two_fgp}%</Text>
                <Text style={styles.cell}>{data.three_fgm}</Text>
                <Text style={styles.cell}>{data.three_fga}</Text>
                <Text style={styles.cell}>{data.three_fgp}%</Text>
                <Text style={styles.cell}>{data.ftm}</Text>
                <Text style={styles.cell}>{data.fta}</Text>
                <Text style={styles.cell}>{data.ftp}%</Text>
                <Text style={styles.cell}>{data.fouls}</Text>
                <Text style={styles.cell}>{data.tov}</Text>
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
}

export default HomeTeam;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginVertical: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  nameContainer: {
    width: 170,
    flex: 1,
    padding: 10,
    color: Colors.white,
    borderRightWidth: 5,
    borderRightColor: Colors.grey_400,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey_400,
    borderTopWidth: 1,
    borderTopColor: Colors.grey_400,
  },
  text: {
    color: Colors.white,
    marginVertical: 20,
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: "center",
    borderBottomWidth: 1,
    color: Colors.white,
    width: 70,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey_400,
    borderTopWidth: 1,
    borderTopColor: Colors.grey_400,
  },
  headerCell: {
    fontWeight: "bold",
    fontSize: 12,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
