import { StyleSheet } from 'react-native';
import { colores } from './Colores';


export const GlobalStyle = StyleSheet.create({
  txtTitle: {
    fontSize: 40,
    fontWeight: '500',
    textAlign: 'auto',
  },
  input: {
    height: 48,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
    paddingLeft: 20,
    paddingRight: 40,
    fontSize: 15,
    textTransform: 'lowercase'
  },
  eyes: {
    position: 'absolute',
    right: 10,
    top: 22
  },
  btnLogin: {
    height: 48,
    marginVertical: 50,
    backgroundColor: colores.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: colores.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 3.5,
    shadowOpacity: 5,
    elevation: 5,
  },
  txtLogin: {
    color: colores.white,
    fontSize: 18,
    fontWeight: '400'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});