import React from "react";
import {View, Text, Button, StyleSheet, Platform} from 'react-native';
import {HeaderButton} from "react-navigation-header-buttons";
import {Ionicons} from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const CustomHeaderButton = (props) => {

    return <HeaderButton
        {...props}
        title=""
        IconComponent={Ionicons}
        iconSize={23}
        color={Platform.OS === 'android' ? 'white' : Colors.primary}
    />;

};


const styles = StyleSheet.create({

});


export default CustomHeaderButton;
