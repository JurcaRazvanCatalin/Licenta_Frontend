import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { ScrollView } from "react-native";
import Colors from "../UI/Colors";

function PlayerHistory({ stats, playerName }) {
  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {playerName}
          <Text style={styles.innerText}>'s Stats in </Text>
          LNBM
        </Text>
      </View>
      <ScrollView horizontal={true}>
        <View style={styles.tableContainer}>
          <View style={[styles.row]}>
            <Text
              style={[
                styles.cell,
                styles.notScrollable,
                styles.header,
                styles.nameContainer,
              ]}
            >
              Year
            </Text>
            <Text style={[styles.cell, styles.header]}>M</Text>
            <Text style={[styles.cell, styles.header]}>PTS</Text>
            <Text style={[styles.cell, styles.header]}>REB</Text>
            <Text style={[styles.cell, styles.header]}>ASS</Text>
            <Text style={[styles.cell, styles.header]}>BKS</Text>
            <Text style={[styles.cell, styles.header]}>2FGM</Text>
            <Text style={[styles.cell, styles.header]}>2FGA</Text>
            <Text style={[styles.cell, styles.header]}>2FGP</Text>
            <Text style={[styles.cell, styles.header]}>3FGM</Text>
            <Text style={[styles.cell, styles.header]}>3FGA</Text>
            <Text style={[styles.cell, styles.header]}>3FGP</Text>
            <Text style={[styles.cell, styles.header]}>FTM</Text>
            <Text style={[styles.cell, styles.header]}>FTA</Text>
            <Text style={[styles.cell, styles.header]}>FTP</Text>
            <Text style={[styles.cell, styles.header]}>FLS</Text>
            <Text style={[styles.cell, styles.header]}>TOV</Text>
            <Text style={[styles.cell, styles.header]}>EFF</Text>
          </View>
          <View style={styles.dataWrapper}>
            {stats.map((stats, index) => (
              <View style={styles.row} key={index}>
                <Text
                  style={[
                    styles.cell,
                    styles.notScrollable,
                    styles.nameContainer,
                  ]}
                >
                  {stats.year}
                </Text>
                <Text style={[styles.cell, styles.text]}>
                  {stats.matchPlayed}
                </Text>
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
                <Text style={styles.cell}>{stats.eff}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default PlayerHistory;

const styles = StyleSheet.create({
  tableContainer: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: 20,
    flexDirection: "row",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey_200,
    minHeight: 40,
  },
  header: {
    fontWeight: "bold",
    fontSize: 10,
    textAlign: "center",
    color: Colors.white,
  },
  cell: {
    flex: 1,
    textAlign: "center",
    padding: 2,
    fontSize: 13,
    textAlign: "center",
    color: Colors.white,
    width: 70,
  },
  notScrollable: {
    width: 120,
    flex: 1,
  },
  dataWrapper: {
    marginTop: -1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: Colors.white,
  },
  nameContainer: {
    width: 120,
    flex: 1,
    padding: 10,
    borderRightWidth: 5,
    borderRightColor: Colors.grey_300,
  },
  text: {
    color: Colors.white,
    marginVertical: 20,
  },
  innerText: {
    fontWeight: "400",
    fontSize: 16,
  },
});
