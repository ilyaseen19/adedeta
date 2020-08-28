import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ccc"
  },
  buttonView: {
    marginHorizontal: "30%",
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "#00363a",
    paddingVertical: 7,
    marginTop: 40,
    marginBottom: "40%",
    borderRadius: 20
  },
  textInput: {
    fontSize: 20,
    borderBottomWidth: 1,
    textAlign: "center"
  },
  submitButton: {
    fontSize: 20,
    borderRadius: 5,
    color: "#fff",
  },
  picStyle: {
    alignSelf: "center",
    marginTop: "20%",
    marginBottom: "10%"
  },
  avatar: {
    backgroundColor: "#e0e0e0", 
    width: 100, 
    height: 100, 
    alignItems: "center",
    justifyContent: "center"
  }
});

export default styles;