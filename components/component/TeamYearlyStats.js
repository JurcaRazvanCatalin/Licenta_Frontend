import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Colors from "../UI/Colors";

function TeamYearlyStats({ stats, teamName, teamLogo }) {
  return (
    <View style={styles.container}>
      <View style={[{ flexDirection: "row" }, styles.statsTeamContainer]}>
        <Image source={{ uri: teamLogo }} style={styles.teamLogo} />
        <Text style={styles.teamTitleText}>{teamName} Stats</Text>
      </View>
      <ScrollView horizontal={true}>
        <View style={{ flexDirection: "column" }}>
          <View style={styles.tableRow}>
            <Text
              style={[styles.cell, styles.nameContainer, styles.headerCell]}
            >
              Year
            </Text>
            <Text style={[styles.cell, styles.headerCell]}>M</Text>
            <Text style={[styles.cell, styles.headerCell]}>Pts</Text>
            <Text style={[styles.cell, styles.headerCell]}>R</Text>
            <Text style={[styles.cell, styles.headerCell]}>A</Text>
            <Text style={[styles.cell, styles.headerCell]}>Blocks</Text>
            <Text style={[styles.cell, styles.headerCell]}>2FGM</Text>
            <Text style={[styles.cell, styles.headerCell]}>2FGA</Text>
            <Text style={[styles.cell, styles.headerCell]}>2FGP</Text>
            <Text style={[styles.cell, styles.headerCell]}>3FGM</Text>
            <Text style={[styles.cell, styles.headerCell]}>3FGA</Text>
            <Text style={[styles.cell, styles.headerCell]}>3FGP</Text>
            <Text style={[styles.cell, styles.headerCell]}>FTM</Text>
            <Text style={[styles.cell, styles.headerCell]}>FTA</Text>
            <Text style={[styles.cell, styles.headerCell]}>FTP</Text>
            <Text style={[styles.cell, styles.headerCell]}>Fouls</Text>
            <Text style={[styles.cell, styles.headerCell]}>TOV</Text>
          </View>
          {stats &&
            stats.map((stats, index) => {
              return (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.cell, styles.nameContainer]}>
                    {stats.year}
                  </Text>
                  <Text style={styles.cell}>{stats.matches}</Text>
                  <Text style={styles.cell}>{stats.pts}</Text>
                  <Text style={styles.cell}>{stats.reb}</Text>
                  <Text style={styles.cell}>{stats.ass}</Text>
                  <Text style={styles.cell}>{stats.blocks}</Text>
                  <Text style={styles.cell}>{stats.two_fgm}</Text>
                  <Text style={styles.cell}>{stats.two_fga}</Text>
                  <Text style={styles.cell}>{stats.two_fgp}%</Text>
                  <Text style={styles.cell}>{stats.three_fgm}</Text>
                  <Text style={styles.cell}>{stats.three_fga}</Text>
                  <Text style={styles.cell}>{stats.three_fgp}%</Text>
                  <Text style={styles.cell}>{stats.ftm}</Text>
                  <Text style={styles.cell}>{stats.fta}</Text>
                  <Text style={styles.cell}>{stats.ftp}%</Text>
                  <Text style={styles.cell}>{stats.fouls}</Text>
                  <Text style={styles.cell}>{stats.tov}</Text>
                </View>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
}

export default TeamYearlyStats;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  teamLogo: {
    height: 35,
    width: 35,
    borderRadius: 60,
  },
  statsTeamContainer: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 20,
  },
  teamTitleText: {
    color: Colors.white,
    padding: 5,
    fontWeight: "700",
    fontSize: 17,
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    // marginVertical: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  nameContainer: {
    width: 100,
    flex: 1,
    padding: 10,
  },
  text: {
    color: Colors.white,
    marginVertical: 20,
  },
  cell: {
    flex: 1,
    padding: 10,
    fontSize: 13,
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey_200,
    color: Colors.white,
    width: 70,
  },
  headerCell: {
    fontWeight: "bold",
    fontSize: 11,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
