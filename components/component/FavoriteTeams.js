import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Colors from "../UI/Colors";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Matches from "./Matches";

function FavoriteTeams({ teamLogo, teamName, smallTeamName }) {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchMatches = async () => {
      const homeTeamMatchesResponse = await axios(
        `https://matches.herokuapp.com/api/v1/matches/create-match?smallHomeTeamName=${smallTeamName}`
      );
      const awayTeamMatchesResponse = await axios(
        `https://matches.herokuapp.com/api/v1/matches/create-match?smallAwayTeamName=${smallTeamName}`
      );

      const homeTeamMatches = homeTeamMatchesResponse.data.matches;
      const awayTeamMatches = awayTeamMatchesResponse.data.matches;
      const allMatches = [...homeTeamMatches, ...awayTeamMatches];
      setMatches(allMatches);
      setIsLoading(false);
    };
    fetchMatches();
    console.log(matches.length);
  }, []);

  return (
    <View>
      <View style={styles.imgContainer}>
        <View style={{ flexDirection: "column" }}>
          <Pressable
            onPress={() => {
              navigation.navigate("Team", {
                teamName: teamName,
                smallTeamName: smallTeamName,
              });
            }}
          >
            <Image source={{ uri: teamLogo }} style={styles.image} />
            <Text style={styles.playerNameTitle}>{teamName}</Text>
          </Pressable>
        </View>
      </View>

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={"large"} color={Colors.white} />
        </View>
      ) : (
        matches &&
        matches.map((match) => {
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
              style={({ pressed }) => {
                pressed ? styles.buttonPressed : null;
              }}
              android_ripple={{ color: Colors.grey_200 }}
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
        })
      )}
    </View>
  );
}

export default FavoriteTeams;

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    margin: 15,
    borderRadius: 50,
  },
  imgContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  playerNameTitle: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
