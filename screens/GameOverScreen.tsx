import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Button, Image } from 'react-native'
import DefaultStyles from '../constants/default-styles'
import Colors from '../constants/colors'
import MainButton from '../components/ui/MainButton'

type Props = {
    roundsNumber: number;
    userNumber: number;
    onNewGame: () => void;
}

const GameOverScreen: React.FC<Props> = (props) => {
    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>The Game is Over!</Text>
            <View style={styles.imageContainer}>
                <Image
                    resizeMode='stretch'
                    style={styles.image}
                    // source={require('../assets/success.png')}
                    source={
                        {
                            uri: 'https://media.istockphoto.com/vectors/game-over-comic-speech-bubble-style-vector-illustrationjpg-vector-id1169155347?k=20&m=1169155347&s=612x612&w=0&h=eT4Jpj5ZqBu1oFS5Fv2rXPhvq_Q0JUIiPcvae1P3sVI='
                        }
                    }
                />
            </View>
            <View style={styles.resultsContainer}>
                <Text style={{ ...DefaultStyles.bodyText, fontSize: 19 }}>
                    It took me <Text style={styles.highlight}>{props.roundsNumber}</Text> tries
                </Text>
                <Text style={{ ...DefaultStyles.bodyText, fontSize: 19 }}>
                    to guess that your number was <Text style={styles.highlight}>{props.userNumber}</Text>
                </Text>
            </View>
            <MainButton onPress={props.onNewGame}>NEW GAME</MainButton>
            <StatusBar style='auto' />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }, imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    },
    image: {
        width: '100%',
        height: '100%'
    },
    resultsContainer: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15
    },
    highlight: {
        color: Colors.primary,
        fontWeight: 'bold'
    },
    resultsText: {
        fontSize: 20
    }
})

export default GameOverScreen