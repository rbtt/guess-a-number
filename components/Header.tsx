import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Platform, View } from 'react-native';
import Colors from '../constants/colors'
import TitleText from './ui/TitleText'

type Props = {
    title: string
}

const Header: React.FC<Props> = (props) => {
    return (
        <View style={styles.header}>
            <TitleText style={styles.headerTitle}>{props.title}</TitleText>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 80,
        paddingTop: 36,
        backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0
    },
    headerTitle: {
        color: Platform.OS === 'ios' ? Colors.primary : 'white',
        fontSize: 18,
        fontFamily: 'open-sans-bold'
    }
})

export default Header
