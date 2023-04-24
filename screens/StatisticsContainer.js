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
    { key: "playoff", value: "Playoffs" },
    { key: "playout", value: "Playout" },
  ];
  const options2 = [
    { key: "puncte", value: "Puncte" },
    { key: "pase", value: "Pase" },
    { key: "recuperari", value: "Recuperari" },
    { key: "eff", value: "Eff" },
  ];
  // const defaultValue1 = { key: "1", value: "Faza 1" };

  // const fetchData = async (value1, value2) => {
  //   const response = axios(
  //     `https://statistics2023.herokuapp.com/api/v1/statistics/create-stat?phase=${value1}&stats=${value2}`
  //   );
  //   return response;
  // };

  // const handleSelection = async (value, dropdownNumber) => {
  //   if (dropdownNumber === 1) {
  //     setSelectedValue1(value);
  //     const selectedData = await fetchData(selectedValue1, "puncte");
  //     setValue(selectedData.data.statistics);
  //   } else {
  //     setSelectedValue2(value);
  //   }

  //   if (selectedValue1 && selectedValue2) {
  //     const selectedData = await fetchData(selectedValue1, selectedValue2);
  //     setValue(selectedData.data.statistics);
  //   }
  // };

  useEffect(() => {
    if (selectedValue1 && !selectedValue2) {
      axios(
        `https://statistics2023.herokuapp.com/api/v1/statistics/create-stat?phase=${selectedValue1}&stats=puncte`
      ).then((response) => {
        setLoader(true);
        setData(response.data.statistics);
        setUpdatedTitle(response.data.statistics[0].phase);
        setUpdatedTitleStat("PUNCTE");
        setLoader(false);
      });
    } else if (selectedValue1 && selectedValue2) {
      axios(
        `https://statistics2023.herokuapp.com/api/v1/statistics/create-stat?phase=${selectedValue1}&stats=${selectedValue2}`
      ).then((response) => {
        setLoader(true);
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
            setSelected={(val) => setSelectedValue1(val)}
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
            setSelected={(val) => setSelectedValue2(val)}
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
        <ScrollView>
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.title]}>Faza {updatedTitle},</Text>
            <Text style={[styles.title]}>
              stats for {updatedTitleStat.toUpperCase()}
            </Text>
          </View>
          {!loader ? (
            data.map((stat) => {
              return (
                <PlayerStat
                  key={stat._id}
                  ranking={stat.ranking}
                  playerName={stat.playerName}
                  teamName={stat.teamName}
                  matchesPlayed={stat.matchesPlayed}
                  mediumStats={stat.mediumStats}
                />
              );
            })
          ) : (
            <ActivityIndicator />
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
    fontWeight: 900,
    fontSize: 20,
  },
});
