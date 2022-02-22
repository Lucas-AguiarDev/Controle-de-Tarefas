import { StyleSheet } from "react-native";
import { BackgroundImage } from "react-native-elements/dist/config";

/* const EstiloNome = StyleSheet.create({
    classe: {
        ....,
        ....
    },

    classe2: {
        ....,
        ....
    }
}) */


const Styles1 = StyleSheet.create({
    view1: {
        backgroundColor: '#14A6FF'
    },

    view2: {
        margin: 10,
        backgroundColor: 'white',
        padding: 10
    },

    view3: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 5,
        margin: 5
    },

    view4: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },

    scroll: {
        flex: 1,
    },
})

const Styles2 = StyleSheet.create({

    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center'
    },

    /* input: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 10
    }, */

    botao: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#14A6FF',
        height: 40,
    },

    botao2: {
        width: 160,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#19E06F',
        height: 30,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 5
    },

    botao3: {
        width: 160,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        height: 30,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 5
    },

    botaoText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },

    botaoText2: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold'
    },




})

export { Styles1, Styles2 };