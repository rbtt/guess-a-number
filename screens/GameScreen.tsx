import { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    ScrollView,
    Dimensions
} from 'react-native';
import NumberContainer from '../components/ui/NumberContainer';
import Card from '../components/ui/Card';
import MainButton from '../components/ui/MainButton';
import { Ionicons } from '@expo/vector-icons'
import BodyText from '../components/ui/BodyText';
import TitleText from '../components/ui/TitleText';

const generateRandomBetween = (
    min: number,
    max: number,
    exclude: number
): number => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const randNumber = Math.floor(Math.random() * (max - min)) + min
    if (randNumber === exclude) {
        return generateRandomBetween(min, max, exclude)
    }
    return randNumber
}

const renderListItems = (value: number, numOfRound: number) => {
    return (
        <View key={value} style={styles.listItem}>
            <BodyText>#{numOfRound}</BodyText>
            <BodyText style={{ fontWeight: 'bold' }}>{value}</BodyText>
        </View>
    )
}

type Props = {
    userChoice: number;
    onGameOver: (numOfRounds: number) => void
}
enum Direction { lower = 'LOWER', greater = 'GREATER' }

const GameScreen: React.FC<Props> = (props) => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrrentGuess] = useState(initialGuess)
    const [pastGuesses, setPastGuesses] = useState<number[]>([initialGuess])

    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    const [deviceWidth, setDeviceWidth] = useState(
        Dimensions.get('window').width
    )
    const [deviceHeight, setDeviceHeight] = useState(
        Dimensions.get('window').height
    )
    useEffect(() => {
        const updateLayout = () => {
            setDeviceWidth(Dimensions.get('window').width)
            setDeviceHeight(Dimensions.get('window').height)
        }
        Dimensions.addEventListener('change', updateLayout)
        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    })

    const { userChoice, onGameOver } = props
    useEffect(() => {
        if (currentGuess === props.userChoice) {
            props.onGameOver(pastGuesses.length)
        }
    }, [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = (direction: Direction) => {
        if (
            (direction === Direction.lower && currentGuess < props.userChoice) ||
            (direction === Direction.greater && currentGuess > props.userChoice)
        ) {
            Alert.alert(
                'Don\'t lie!',
                'You know that this is wrong..',
                [{ text: 'Sorry', style: 'cancel' }]
            )
            return
        }
        if (direction === Direction.lower) {
            currentHigh.current = currentGuess
        } else {
            currentLow.current = currentGuess + 1
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrrentGuess(nextNumber)
        // setRounds((prevState) => prevState + 1)
        setPastGuesses((prevState) => prevState && [nextNumber, ...prevState])
    }

    if (deviceHeight < 400) {
        return (
            <View style={styles.screen}>
                <TitleText style={{ marginBottom: 10 }}>I guess your number was</TitleText>
                <View style={styles.controls}>
                    <MainButton onPress={() => nextGuessHandler(Direction.lower)}>
                        <Ionicons name='md-remove' size={24} color='white' />
                    </MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton onPress={() => nextGuessHandler(Direction.greater)}>
                        <Ionicons name='md-add' size={24} color='white' />
                    </MainButton>
                </View>
                <StatusBar style='auto' />
                <View style={styles.listContainer}>
                    <ScrollView contentContainerStyle={styles.list}>
                        {pastGuesses.map((guess, i) => renderListItems(guess, pastGuesses.length - i))}
                    </ScrollView>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <TitleText style={{ marginBottom: 10 }}>I guess your number was</TitleText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={() => nextGuessHandler(Direction.lower)}>
                    <Ionicons name='md-remove' size={24} color='white' />
                </MainButton>
                <MainButton onPress={() => nextGuessHandler(Direction.greater)}>
                    <Ionicons name='md-add' size={24} color='white' />
                </MainButton>
            </Card>
            <StatusBar style='auto' />
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, i) => renderListItems(guess, pastGuesses.length - i))}
                </ScrollView>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 400,
        maxWidth: '90%'
    },
    listContainer: {
        width: '90%',
        flex: 1 // otherwise scrolling dont work!
    },
    list: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',

    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        alignItems: 'center'
    }
})

export default GameScreen
