import { View, Text, StyleSheet } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import Colors from "../UI/Colors";
import { useState } from "react";

let datesWhitelist = [
  {
    start: moment("2022-09-28", "YYYY-MM-DD"),
    end: moment("9999-12-31", "YYYY-MM-DD"),
  },
];

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

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
      <Text onPress={handleDateSelected}>
        {moment(selectedDate).format("L")}
      </Text>
    </View>
  );
}

export default Calendar;

const styles = StyleSheet.create({
  calendarContainer: {
    height: 100,
    paddingTop: 20,
    paddingBottom: 10,
  },
  colorHighlight: {
    color: Colors.yellow,
  },
});
