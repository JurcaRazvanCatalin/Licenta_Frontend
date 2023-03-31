import { Image, StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import Colors from "../UI/Colors";

function MatchPts({
  awayTeamPts,
  homeTeamPts,
  awayTeamLogo,
  homeTeamLogo,
  awayTeamScore,
  homeTeamScore,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.tableRow}>
        <Text
          style={[styles.cell, styles.headerCell, styles.nameContainer]}
        ></Text>
        <Text style={[styles.cell, styles.headerCell]}>Q1</Text>
        <Text style={[styles.cell, styles.headerCell]}>Q2</Text>
        <Text style={[styles.cell, styles.headerCell]}>Q3</Text>
        <Text style={[styles.cell, styles.headerCell]}>Q4</Text>
        <Text style={[styles.cell, styles.headerCell]}>T</Text>
      </View>
      {homeTeamPts.map((data, index) => {
        return (
          <View key={index} style={styles.tableRow}>
            <View style={[styles.nameContainer]}>
              <Image source={{ uri: homeTeamLogo }} style={[styles.teamLogo]} />
            </View>
            <Text style={styles.cell}>{data.first_pts}</Text>
            <Text style={styles.cell}>{data.second_pts}</Text>
            <Text style={styles.cell}>{data.third_pts}</Text>
            <Text style={styles.cell}>{data.fourth_pts}</Text>
            <Text style={[styles.cell, styles.total]}>{homeTeamScore}</Text>
          </View>
        );
      })}
      {awayTeamPts.map((data, index) => {
        return (
          <View key={index} style={styles.tableRow}>
            <View style={[styles.nameContainer, styles.cell]}>
              <Image source={{ uri: awayTeamLogo }} style={[styles.teamLogo]} />
            </View>
            <Text style={styles.cell}>{data.first_pts_a}</Text>
            <Text style={styles.cell}>{data.second_pts_a}</Text>
            <Text style={styles.cell}>{data.third_pts_a}</Text>
            <Text style={styles.cell}>{data.fourth_pts_a}</Text>
            <Text style={[styles.cell, styles.total]}>{awayTeamScore}</Text>
          </View>
        );
      })}
    </View>
  );
}

export default MatchPts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    width: "100%",
  },
  cell: {
    flex: 1,
    padding: 10,
    fontSize: 13,
    textAlign: "center",
    color: Colors.white,
    width: 50,
    borderStyle: "dotted",
    borderWidth: 1,
    borderColor: Colors.grey_300,
  },
  headerCell: {
    fontWeight: "bold",
    fontSize: 11,
  },
  nameContainer: {
    width: 200,
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  teamLogo: {
    borderRadius: 20,
    height: 30,
    width: 30,
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
