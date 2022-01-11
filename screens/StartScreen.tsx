import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    Button,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import Card from '../components/ui/Card'
import Colors from '../constants/colors'
import Input from '../components/Input'
import NumberContainer from '../components/ui/NumberContainer'
import BodyText from '../components/ui/BodyText'
import TitleText from '../components/ui/TitleText'
import MainButton from '../components/ui/MainButton'

type Props = {
    onStartGame: (selectedNumber: number) => void
}

const StartScreen: React.FC<Props> = (props) => {
    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setCofirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState<number>()

    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 3.3)
    useEffect(() => {
        const updateLayout = () => setButtonWidth(Dimensions.get('window').width / 3.3)
        Dimensions.addEventListener('change', updateLayout)

        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    })

    const numberInputHandler = (inputText: string): void => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    }
    const resetInputHandler = () => {
        setEnteredValue('')
        setCofirmed(false)
    }
    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue)
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid Number',
                'Number has to be a number between 1 and 99',
                [
                    {
                        text: 'Okay',
                        style: 'destructive',
                        onPress: resetInputHandler
                    }
                ]
            )
            return
        }
        setCofirmed(true)
        setSelectedNumber(chosenNumber)
        setEnteredValue('')
        Keyboard.dismiss()
    }

    let confirmedOutput;
    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <BodyText>You selected</BodyText>
                <NumberContainer>
                    {selectedNumber}
                </NumberContainer>
                <MainButton
                    onPress={() => selectedNumber && props.onStartGame(selectedNumber)}
                >START GAME</MainButton>
            </Card>
        )

    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss()
                }}>
                    <View style={styles.screen}>
                        <TitleText style={styles.title}>Start a new Game!</TitleText>
                        <Card style={styles.inputContainer}>
                            <BodyText>Select a Number</BodyText>
                            <Input
                                style={styles.input}
                                blurOnSubmit
                                autoCorrect={false}
                                maxLength={2}
                                keyboardType='number-pad'
                                onChangeText={numberInputHandler}
                                value={enteredValue}
                            />
                            <View style={styles.btnContainer}>
                                <View style={
                                    { ...styles.button, width: buttonWidth }
                                }>
                                    <Button
                                        title='Reset'
                                        color={Colors.accent}
                                        onPress={resetInputHandler}
                                    />
                                </View>
                                <View style={
                                    { ...styles.button, width: buttonWidth }
                                }>
                                    <Button
                                        title='Confirm'
                                        color={Colors.primary}
                                        onPress={confirmInputHandler}
                                    />
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                        <StatusBar style="auto" />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        width: '80%',
        minWidth: 300,
        maxWidth: '95%',
        // maxWidth: '80%',
        alignItems: 'center'
    },
    btnContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        // width: 100
        // width: Dimensions.get('window').width / 3.3
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        margin: 20,
        alignItems: 'center',

    }
})

export default StartScreen
