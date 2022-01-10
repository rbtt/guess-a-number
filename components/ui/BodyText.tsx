import { Text, StyleSheet } from "react-native"

type Props = {
    style?: Object
}

const BodyText: React.FC<Props> = (props) => {
    return <Text style={{ ...styles.body, ...props.style }}>
        {props.children}
    </Text>
}

const styles = StyleSheet.create({
    body: {
        fontFamily: 'open-sans'
    }
})

export default BodyText
