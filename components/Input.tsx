import { StyleSheet, TextInput, ViewProps, TextInputProps } from 'react-native';


interface Props extends TextInputProps {
    style?: Object
}

const Input: React.FC<Props> = (props) => {
    return (
        <TextInput
            {...props}
            style={{ ...styles.input, ...props.style }}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginVertical: 10
    }
})

export default Input
