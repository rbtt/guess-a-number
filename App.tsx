import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [userNumber, setUserNumber] = useState<number>()
  const [guessRounds, setGuessRounds] = useState<number>(0)
  const [dataLoaded, setDataLoaded] = useState(false)

  if (!dataLoaded) return <AppLoading
    startAsync={fetchFonts}
    onFinish={() => setDataLoaded(true)}
    onError={(e) => console.log(e)}
  />

  const newGameHandler = () => {
    setGuessRounds(0)
    setUserNumber(undefined)
  }

  const startGameHandler = (selectedNumber: number) => {
    setUserNumber(selectedNumber)
  }

  const gameOverHandler = (numOfRounds: number) => {
    setGuessRounds(numOfRounds)
  }

  let content = <StartScreen onStartGame={startGameHandler} />

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen
      userChoice={userNumber}
      onGameOver={gameOverHandler}
    />
  } else if (guessRounds > 0) {
    if (userNumber) {
      content = <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onNewGame={newGameHandler}
      />
    }
  }

  return (
    <View style={styles.screen}>
      <Header title='Guess a Number' />
      {content}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
