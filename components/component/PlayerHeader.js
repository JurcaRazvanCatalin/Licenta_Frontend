import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import Colors from "../UI/Colors";
import ImageSvg from "react-native-remote-svg";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function PlayerHeader({
  id,
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
  isPressed,
  noAvailablePhoto,
}) {
  const [playerDatas, setPlayerDatas] = useState([]);
  const [firebaseId, setFirebaseId] = useState([]);

  const playerData = {
    id: id,
    playerImg: playerImg,
    playerName: playerName,
    playerNameSmall: playerNameSmall,
    teamName: teamName,
    teamLogo: teamLogo,
  };

  useEffect(() => {
    const getPlayerData = async () => {
      try {
        const response = await axios.get(
          `https://licenta-cbmr-default-rtdb.firebaseio.com/favoritesPlayers.json?orderBy="playerNameSmall"&equalTo="${playerNameSmall}"&limitToFirst=1`
        );
        const playerData = response.data
          ? Object.values(response.data)[0]
          : null;
        setPlayerDatas(playerData);
      } catch (err) {
        console.error(err);
      }
    };
    getPlayerData();
  }, [playerDatas]);

  const handlePressed = async () => {
    const updatedIsPressed = !isPressed;
    console.log(updatedIsPressed);

    if (updatedIsPressed) {
      if (playerDatas) {
        console.log(`Player already exists in Firebase`);
        return;
      }
      try {
        const response = await axios.post(
          "https://licenta-cbmr-default-rtdb.firebaseio.com/favoritesPlayers.json",
          playerData
        );
        const newFirebaseId = response.data.name;
        const updatedPlayer = { ...playerData, firebaseId: newFirebaseId };
        setPlayerDatas(updatedPlayer);
        const updatedFirebaseId = [...firebaseId, newFirebaseId];
        setFirebaseId(updatedFirebaseId); // Update the firebaseId state
        await AsyncStorage.setItem(
          "firebaseId",
          JSON.stringify(updatedFirebaseId)
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await axios.get(
          `https://licenta-cbmr-default-rtdb.firebaseio.com/favoritesPlayers.json?orderBy="playerNameSmall"&equalTo="${playerNameSmall}"&limitToFirst=1`
        );

        const playerToDelete = Object.keys(response.data)[0];

        if (playerToDelete) {
          await axios.delete(
            `https://licenta-cbmr-default-rtdb.firebaseio.com/favoritesPlayers/${playerToDelete}.json`
          );
        } else {
          console.log(`Player not found in Firebase`);
        }

        setPlayerDatas(null);
      } catch (error) {
        console.error(error);
      }
    }

    axios.patch(
      `https://players.herokuapp.com/api/v1/players/create-player/${playerNameSmall}`,
      { isPressed: updatedIsPressed }
    );
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
              <TouchableOpacity onPress={handlePressed}>
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
