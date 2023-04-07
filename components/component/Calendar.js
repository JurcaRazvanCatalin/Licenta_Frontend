import { View, StyleSheet, Pressable } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import Colors from "../UI/Colors";
import { useLayoutEffect, useState } from "react";
import Matches from "./Matches";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { ScrollView } from "react-native";

let datesWhitelist = [
  {
    start: moment("2022-09-28", "YYYY-MM-DD"),
    end: moment("9999-12-31", "YYYY-MM-DD"),
  },
];

const API_URI = "https://matches.herokuapp.com/api/v1/matches/create-match";

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  const handleDateSelected = (date) => {
    setSelectedDate(date);
  };

  useLayoutEffect(() => {
    axios.get(`${API_URI}`).then((response) => {
      setData(response.data.matches);
    });
  }, []);

  return (
    <View style={styles.container}>
      <CalendarStrip
        selectedDate={selectedDate}
        onDateSelected={handleDateSelected}
        datesWhitelist={datesWhitelist}
        calendarAnimation={{ type: "sequence", duration: 30 }}
        daySelectionAnimation={{
          type: "background",
          duration: 100,
          borderWidth: 2,
          highlightColor: Colors.grey_300,
        }}
        highlightDateNumberStyle={styles.colorHighlight}
        highlightDateNameStyle={styles.colorHighlight}
        style={styles.calendarContainer}
        calendarHeaderStyle={{ color: "white" }}
        calendarColor={Colors.grey_500}
        dateNumberStyle={{ color: "white" }}
        dateNameStyle={{ color: "white" }}
        iconContainer={{ flex: 0.1 }}
        scrollable={true}
      />
      <ScrollView style={styles.container}>
        {data.map((match) => {
          if (
            moment(match.matchDate).format("L") ===
            moment(selectedDate).format("L")
          ) {
            return (
              <Pressable
                key={match._id}
                onPress={() => {
                  navigation.navigate("Match", {
                    id: match.id,
                    awayTeam: match.awayTeam,
                    homeTeam: match.homeTeam,
                    awayTeamScore: match.awayTeamScore,
                    homeTeamScore: match.homeTeamScore,
                    referee: match.referee,
                    arena: match.arena,
                    matchTime: match.matchTime,
                    awayTeamLogo: match.awayTeamLogo,
                    homeTeamLogo: match.homeTeamLogo,
                    awayTeamStats: match.awayTeamStats,
                    homeTeamStats: match.homeTeamStats,
                    homeTeamPts: match.homeTeamPts,
                    awayTeamPts: match.awayTeamPts,
                    awayTeamColor: match.awayTeamColor,
                    homeTeamColor: match.homeTeamColor,
                  });
                }}
              >
                <Matches
                  homeTeam={match.homeTeam}
                  awayTeam={match.awayTeam}
                  matchTime={match.matchTime}
                  homeTeamLogo={match.homeTeamLogo}
                  awayTeamLogo={match.awayTeamLogo}
                  homeTeamScore={match.homeTeamScore}
                  awayTeamScore={match.awayTeamScore}
                />
              </Pressable>
            );
          }
        })}
      </ScrollView>
    </View>
  );
}

export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendarContainer: {
    height: 100,
    width: "100%",
    paddingTop: 20,
    paddingBottom: 10,
  },
  colorHighlight: {
    color: Colors.yellow,
  },
});
