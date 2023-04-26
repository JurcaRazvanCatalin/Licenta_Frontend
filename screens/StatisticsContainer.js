import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import Colors from "../components/UI/Colors";
import { SelectList } from "react-native-dropdown-select-list";
import PlayerStat from "../components/component/PlayerStat";

function StatisticsContainer() {
  const [selectedValue1, setSelectedValue1] = useState("");
  const [selectedValue2, setSelectedValue2] = useState("");
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedTitleStat, setUpdatedTitleStat] = useState("");
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const options1 = [
    { key: "1", value: "Faza 1" },
    { key: "2", value: "Faza 2" },
    { key: "playoff", value: "Playoff" },
    { key: "playout", value: "Playout" },
  ];
  const options2 = [
    { key: "puncte", value: "Puncte" },
    { key: "pase", value: "Pase" },
    { key: "recuperari", value: "Recuperari" },
    { key: "eff", value: "Eff" },
  ];

  useEffect(() => {
    if (selectedValue1 && !selectedValue2) {
      axios(
        `https://statistics2023.herokuapp.com/api/v1/statistics/create-stat?phase=${selectedValue1}&stats=puncte`
      ).then((response) => {
        setData(response.data.statistics);
        setUpdatedTitle(response.data.statistics[0].phase);
        setUpdatedTitleStat("PUNCTE");
        setLoader(false);
      });
    } else if (selectedValue1 && selectedValue2) {
      axios(
        `https://statistics2023.herokuapp.com/api/v1/statistics/create-stat?phase=${selectedValue1}&stats=${selectedValue2}`
      ).then((response) => {
        setData(response.data.statistics);
        setUpdatedTitle(response.data.statistics[0].phase);
        setUpdatedTitleStat(response.data.statistics[0].stats);
        setLoader(false);
      });
    }
  }, [selectedValue1, selectedValue2]);

  return (
    <View style={styles.container}>
      <View style={styles.dropdowns}>
        <View style={styles.dropdownStyle}>
          <SelectList
            data={options1}
            placeholder="Select phase ..."
            setSelected={(val) => {
              setLoader(true);
              setSelectedValue1(val);
            }}
            selectedOption={selectedValue1}
            search={false}
            inputStyles={{ color: Colors.grey_100, fontWeight: 800 }}
            dropdownTextStyles={{ color: Colors.white, fontWeight: 500 }}
            dropdownItemStyles={{
              borderBottomWidth: 1,
              marginHorizontal: 10,
              borderBottomColor: Colors.grey_200,
            }}
          />
        </View>
        <View style={styles.dropdownStyle}>
          <SelectList
            data={options2}
            placeholder="Select category ... "
            setSelected={(val) => {
              setLoader(true);
              setSelectedValue2(val);
            }}
            selectedOption={selectedValue2}
            search={false}
            inputStyles={{ color: Colors.grey_100, fontWeight: 800 }}
            dropdownTextStyles={{ color: Colors.white, fontWeight: 500 }}
            dropdownItemStyles={{
              borderBottomWidth: 1,
              marginHorizontal: 10,
              borderBottomColor: Colors.grey_200,
            }}
          />
        </View>
        <View style={styles.row}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title]}>
              Faza :{" "}
              <Text style={styles.importantTitle}>
                {updatedTitle.toUpperCase()}
              </Text>
            </Text>
            <Text style={[styles.title]}>
              Stats for :{" "}
              <Text style={styles.importantTitle}>
                {updatedTitleStat.toUpperCase()}
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerCellRanking}>#</Text>
          <Text style={styles.headerCellLarge}>Player Name</Text>
          <Text style={styles.headerCellLarge}>Team Name</Text>
          <Text style={styles.headerCell}>M</Text>
          <Text style={styles.headerCell}>Stats</Text>
        </View>
        <ScrollView>
          {loader ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size={"large"} color={Colors.yellow} />
            </View>
          ) : (
            data &&
            data.map((stat) => {
              return (
                <PlayerStat
                  key={stat._id}
                  ranking={stat.ranking}
                  playerName={stat.playerName}
                  teamName={stat.teamName}
                  matchesPlayed={stat.matchesPlayed}
                  mediumStats={stat.mediumStats}
                  playerNameSmall={stat.playerNameSmall}
                  smallTeamName={stat.smallTeamName}
                />
              );
            })
          )}
        </ScrollView>
      </View>
    </View>
  );
}

export default StatisticsContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey_500,
  },
  dropdowns: {
    flex: 1,
  },
  dropdownStyle: {
    padding: 10,
  },
  text: {
    color: Colors.white,
  },
  list: {
    flex: 1,
  },
  stat: {
    marginHorizontal: 10,
    fontSize: 12,
    marginVertical: 10,
  },
  title: {
    color: Colors.white,
    fontWeight: 500,
    fontSize: 17,
  },
  importantTitle: {
    fontWeight: 900,
    fontSize: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey_200,
    marginVertical: 10,
  },
  headerCell: {
    flex: 2,
    textAlign: "center",
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 10,
  },
  headerCellRanking: {
    flex: 1,
    textAlign: "center",
    color: Colors.yellow,
    fontWeight: "bold",
    fontSize: 10,
  },
  headerCellLarge: {
    flex: 4,
    textAlign: "center",
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 10,
  },
});
