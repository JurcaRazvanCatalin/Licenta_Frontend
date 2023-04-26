import {
  View,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Text,
} from "react-native";
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
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  const handleDateSelected = (date) => {
    setSelectedDate(date);
  };

  useLayoutEffect(() => {
    axios.get(`${API_URI}`).then((response) => {
      setData(response.data.matches);
      setIsLoading(false);
    });
  }, []);

  const matchingDate = data.filter(
    (item) =>
      moment(item.matchDate).format("L") === moment(selectedDate).format("L")
  );

  if (matchingDate.length === 0) {
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
        <View style={styles.noMatchToday}>
          <Text style={styles.noMatchText}>No match today</Text>
        </View>
      </View>
    );
  }

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
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size={"large"} color={Colors.white} />
          </View>
        ) : (
          data.map((match) => {
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
          })
        )}
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noMatchToday: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  noMatchText: {
    fontSize: 20,
    color: Colors.white,
  },
});
