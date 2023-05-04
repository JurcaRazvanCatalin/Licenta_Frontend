import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import Colors from "../UI/Colors";
import ImageSvg from "react-native-remote-svg";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { deleteFavoritePlayer } from "../../http";

function PlayerHeader({
  playerImg,
  playerName,
  playerNameSmall,
  teamName,
  teamLogo,
  playerCountry,
  position,
  birthday,
  height,
  weight,
  number,
  pts_per_game,
  reb_per_game,
  ass_per_game,
  eff,
  noAvailablePhoto,
}) {
  const [isPressed, setIsPressed] = useState(false);
  const [playerDatas, setPlayerDatas] = useState([]);

  const playerData = {
    playerImg: playerImg,
    playerName: playerName,
    playerNameSmall: playerNameSmall,
    teamName: teamName,
    teamLogo: teamLogo,
  };

  const handlePressed = () => {
    setIsPressed(!isPressed);
    if (!isPressed) {
      axios
        .post(
          "https://licenta-cbmr-default-rtdb.firebaseio.com/favoritesPlayers.json",
          playerData
        )
        .then((response) => {
          const firebaseId = response.data.name;
          const updatedPlayer = { ...playerData, firebaseId };
          setPlayerDatas(updatedPlayer);
        });
    } else {
      const firebaseId = playerDatas.firebaseId;
      deleteFavoritePlayer(firebaseId);
    }
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.firstHeader}>
          <Image source={{ uri: teamLogo }} style={styles.logo} />
          {playerImg === "/images/site/no-player-image.svg" ? (
            <Image
              source={{ uri: noAvailablePhoto }}
              style={styles.playerImg}
            />
          ) : (
            <Image source={{ uri: playerImg }} style={styles.playerImg} />
          )}
          <View style={styles.firstInfo}>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.text, styles.firstHeaderSmallInfo]}>
                {teamName}/
              </Text>
              <Text style={[styles.text, styles.firstHeaderSmallInfo]}>
                #{number}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.text, styles.name]}>{playerName}</Text>
              <TouchableOpacity style={[styles.star]} onPress={handlePressed}>
                {isPressed ? (
                  <Ionicons name="star" size={24} color={Colors.yellow} />
                ) : (
                  <Ionicons name="star" size={24} color={Colors.grey_100} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.stats}>
          <View>
            <Text style={styles.statName}>PPG</Text>
            <Text style={styles.statValue}>{pts_per_game}</Text>
          </View>
          <View>
            <Text style={styles.statName}>RPG</Text>
            <Text style={styles.statValue}>{reb_per_game}</Text>
          </View>
          <View>
            <Text style={styles.statName}>APG</Text>
            <Text style={styles.statValue}>{ass_per_game}</Text>
          </View>
          <View>
            <Text style={styles.statName}>EFF</Text>
            <Text style={styles.statValue}>{eff}</Text>
          </View>
        </View>
        <View style={styles.secondHeader}>
          <View>
            <Text style={styles.statName}>Height/Weight</Text>
            <Text style={styles.otherValues}>
              {height}cm/{weight}kg
            </Text>
          </View>
          <View>
            <Text style={styles.statName}>Country</Text>
            <View style={styles.svg}>
              <ImageSvg
                style={styles.country}
                source={{ uri: playerCountry }}
              />
            </View>
          </View>
        </View>
        <View style={styles.secondHeader}>
          <View>
            <Text style={styles.statName}>Position</Text>
            <Text style={styles.otherValues}>{position}</Text>
          </View>
          <View>
            <Text style={styles.statName}>Birthday</Text>
            <Text style={styles.otherValues}>{birthday}</Text>
          </View>
        </View>
      </View>
    </>
  );
}

export default PlayerHeader;

const styles = StyleSheet.create({
  playerImg: {
    width: 100,
    height: 100,
    borderRadius: 40,
    marginLeft: 10,
  },
  headerContainer: {
    height: "45%",
    backgroundColor: Colors.grey_200,
  },
  logo: {
    height: 40,
    width: 40,
    borderRadius: 60,
    marginBottom: 60,
  },
  country: {
    height: 25,
    width: 25,
  },
  firstHeader: {
    flexDirection: "row",
    marginTop: 30,
    padding: 15,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: Colors.grey_300,
  },
  text: {
    color: Colors.white,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    width: "60%",
  },
  firstInfo: {
    marginLeft: 20,
  },
  firstHeaderSmallInfo: {
    fontSize: 11,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderBottomWidth: 2,
    padding: 10,
    borderBottomColor: Colors.grey_300,
  },
  statName: {
    fontSize: 10,
    fontWeight: "bold",
    color: Colors.white,
    textAlign: "center",
  },
  statValue: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.white,
    textAlign: "center",
  },
  secondHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: Colors.grey_300,
  },
  svg: {
    alignItems: "center",
  },
  otherValues: {
    fontSize: 15,
    color: Colors.white,
    textAlign: "center",
    marginTop: 5,
  },
});
