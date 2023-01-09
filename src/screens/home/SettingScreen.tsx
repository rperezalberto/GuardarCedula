import { useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { getProfileInfo, resetData, resetUserList, signOuts } from '../../feacture/authSlice';
import { useAppDispatch, useAppSelector } from '../../hook/hook';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { colores } from '../../theme/Colores';
import { StackScreenProps } from '@react-navigation/stack';
import { dbFirestore } from '../../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';


interface Props extends StackScreenProps<any, any> { };

export const SettingScreen = ({ navigation }: Props) => {

    const dispatch = useAppDispatch();
    const { token, name, email } = useAppSelector(state => state.auth);

    const getInfoProfile = () => {
        onSnapshot(doc(dbFirestore, `usuarios/${token}`), (doc) => {
            dispatch(getProfileInfo(doc.data()));
        })
    }


    const userInfo = useMemo(() => getInfoProfile(), []);

    // useEffect(() => {
    //     getInfoProfile();
    // }), [];


    return (
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <TouchableOpacity style={styles.containerPhoto}>
                    <Foundation name="torso" size={32} color={colores.white} />
                    <View style={styles.containerEdit}>
                        <Foundation name="pencil" size={15} color={colores.white} />
                    </View>
                </TouchableOpacity>

                <View style={{ marginHorizontal: 20 }}>
                    {
                        (name) && <Text style={styles.txtName}>{name}</Text>
                    }
                    <Text style={styles.txtEmail}>{email}</Text>
                </View>
            </View>

            <View style={[styles.containerMenu, { marginBottom: 25 }]}>
                <View style={[styles.containerIcon, { backgroundColor: colores.delete }]}>
                    <Foundation name="alert" size={20} color={colores.white} />
                </View>
                <Text style={{ fontSize: 14, fontWeight: '600' }}>Alerta</Text>
            </View>

            <TouchableOpacity style={styles.containerMenu} onPress={() => navigation.navigate('EditProfile')}>
                <View style={[styles.containerIcon]}>
                    <Foundation name="page-edit" size={20} color={colores.white} />
                </View>
                <Text style={{ fontSize: 14, fontWeight: '600' }}>Editar Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.containerMenu} onPress={() => {
                dispatch(resetUserList());
                navigation.navigate('UsersSetting');
            }}>
                <View style={[styles.containerIcon]}>
                    <Foundation name="torsos" size={20} color={colores.white} />
                </View>
                <Text style={{ fontSize: 14, fontWeight: '600' }}>Usuarios</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.containerMenu} onPress={() => navigation.navigate('AddUser')}>
                <View style={[styles.containerIcon]}>
                    <Foundation name="torsos" size={20} color={colores.white} />
                </View>
                <Text style={{ fontSize: 14, fontWeight: '600' }}>Crear usuario</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.containerMenu, { marginTop: 25, }]}>
                <View style={[styles.containerIcon]}>
                    <Foundation name="alert" size={20} color={colores.white} />
                </View>
                <Text style={{ fontSize: 14, fontWeight: '600' }}>Política y Privacidad</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.containerMenu}>
                <View style={[styles.containerIcon]}>
                    <Foundation name="torsos" size={20} color={colores.white} />
                </View>
                <Text style={{ fontSize: 14, fontWeight: '600' }}>Términos y Condiciones</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.containerMenu} onPress={() => dispatch(signOuts())}>
                <View style={[styles.containerIcon, { backgroundColor: colores.delete }]}>
                    <FontAwesome name="sign-in" size={20} color={colores.white} />
                </View>
                <Text style={{ fontSize: 14, fontWeight: '600' }}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10
    },
    containerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20
    },
    containerPhoto: {
        width: 79,
        height: 79,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colores.secundary,
        borderRadius: 100
    },
    containerEdit: {
        position: 'absolute',
        bottom: 6,
        right: 0,
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: colores.primary,
        borderRadius: 100,

        shadowColor: colores.black,
        shadowOpacity: 5,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2.5
        },
        elevation: 5
    },
    txtName: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 2
    },
    txtEmail: {
        fontSize: 12,
        fontWeight: '400'
    },
    containerMenu: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colores.white,
        paddingHorizontal: 10,
        paddingVertical: 10,
        shadowColor: colores.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    containerIcon: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colores.primary,
        borderRadius: 100,
        marginRight: 10
    },
})