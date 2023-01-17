import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colores } from '../../theme/Colores';
export const PrivacyPolicy = () => {
    return (
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.txtTitle}>Política de privacidad:</Text>
                <Text style={styles.txt}>El sitio web SaveID es propiedad de Hospital Municipal Piedra Blanca, que es un controlador de datos de tus datos personales.</Text>
                <Text style={styles.txt}>Hemos adoptado esta Política de privacidad, que determina cómo procesamos la información recopilada por SaveID, que también proporciona las razones por las que debemos recopilar ciertos datos personales sobre ti. Por lo tanto, debes leer esta Política de privacidad antes de usar el sitio web de SaveID.</Text>
                <Text style={styles.txt}>Cuidamos tus datos personales y nos comprometemos a garantizar su confidencialidad y seguridad.</Text>
            </View>

            <View>
                <Text style={styles.txtTitle}>Seguridad de la información:</Text>
                <Text style={styles.txt}>Aseguramos la información que proporcionas en servidores informáticos en un entorno controlado y seguro, protegido del acceso, uso o divulgación no autorizados. Mantenemos medidas de seguridad administrativas, técnicas y físicas razonables para proteger contra el acceso no autorizado, el uso, la modificación y la divulgación de datos personales bajo su control y custodia. Sin embargo, no se puede garantizar la transmisión de datos a través de Internet o redes inalámbricas.</Text>
            </View>

            <View>
                <Text style={styles.txtTitle}>Información de contacto:</Text>
                <Text style={styles.txt}>Si deseas comunicarte con nosotros para comprender más sobre esta Política o deseas comunicarte con nosotros en relación con cualquier asunto sobre los derechos individuales y tu información personal, puedes enviarnos un correo electrónico a hospitalmunicipal.p.b.92@hotmail.es.</Text>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10
    },
    txtTitle: {
        fontSize: 20,
        color: colores.black,
        marginVertical: 10,
        fontWeight: '600'
    },
    txt: {
        marginVertical: 10
    }
})