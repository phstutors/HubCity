import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const Button = (props) => {
    const filledBgColor = props.color ||'#18163D';
    const outlinedColor = '#fff';
    const bgColor = props.filled ? filledBgColor : outlinedColor;
    const textColor = props.filled ? '#fff' : '#18163D';

    return (
        <TouchableOpacity
            style={{
                ...styles.button,
                ...{ backgroundColor: bgColor },
                ...props.style
            }}
            onPress={props.onPress}
        >
            <Text style={{ fontSize: 18, ... { color: textColor } }}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingBottom: 16,
        paddingVertical: 10,
        borderColor: '#18163D',
        borderWidth: 2,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default Button