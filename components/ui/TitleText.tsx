import { Text, StyleSheet } from "react-native"

type Props = {
    style?: Object
}

const TitleText: React.FC<Props> = (props) => {
    return <Text style={{ ...styles.title, ...props.style }}>{props.children}</Text>
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    }
})

export default TitleText
