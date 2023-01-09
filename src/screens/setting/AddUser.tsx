import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { GlobalStyle } from '../../theme/GlobalStyle';
import DropDownPicker from 'react-native-dropdown-picker';

export const AddUser = () => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    const [items, setItems] = useState([
        { label: 'Administrador', value: 'admin' },
        { label: 'Usuario', value: 'user' }
    ]);


    console.log(value);

    return (
        <View style={styles.container}>
            <Text style={GlobalStyle.txtTitleHeader}>Llenar los campos para crea un usuario</Text>
            <View>
                <TextInput
                    style={GlobalStyle.input}
                    placeholder={'Nombre del usuario'}
                />
                <TextInput
                    style={GlobalStyle.input}
                    placeholder={'Contraseña del usuario'}
                />
            </View>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={GlobalStyle.input}
            />

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10
    }
})