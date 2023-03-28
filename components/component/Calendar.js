import { View, StyleSheet, Pressable, FlatList } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import Colors from "../UI/Colors";
import { useState } from "react";
import data from "../../data";
import Matches from "./Matches";
import { useNavigation } from "@react-navigation/native";

let datesWhitelist = [
  {
    start: moment("2022-09-28", "YYYY-MM-DD"),
    end: moment("9999-12-31", "YYYY-MM-DD"),
  },
];

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigation = useNavigation();

  const handleDateSelected = (date) => {
    setSelectedDate(date);
  };

  const handleGetSelectedDate = () => {
    const date = calendarRef.getSelectedDate();
    return date;
  };
  return (
    <View>
      <CalendarStrip
        ref={(ref) => (calendarRef = ref)}
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
      {data.map((match) => {
        if (
          moment(match.matchDate).format("L") ===
          moment(selectedDate).format("L")
        ) {
          return (
            <Pressable
              key={match.id}
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
                });
              }}
            >
              <Matches
                homeTeam={match.homeTeam}
                awayTeam={match.awayTeam}
                homeTeamLogo={match.homeTeamLogo}
                awayTeamLogo={match.awayTeamLogo}
                homeTeamScore={match.homeTeamScore}
                awayTeamScore={match.awayTeamScore}
              />
            </Pressable>
          );
        }
      })}
    </View>
  );
}

export default Calendar;

const styles = StyleSheet.create({
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
