import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	Dimensions,
	TextInput,
	Pressable,
} from "react-native";
import { useForm } from "react-hook-form";

//responsiveness
const {width} = Dimensions.get('window');

function Home() {
	//use and update form
	const [target, setTarget] = useState('');
	//data from WHOIS API stored here
	const [data, setData] = useState([]);

	//form actions
	const { handleSubmit } = useForm();
  const onSubmit = async() => {
		//my apiKey
		const apiKey = 'at_PpglHpxAk1FD8c2qqx5iyaWoty7pa';

		//basic input validation
		if (target !== '') {
			try {
				const response = await fetch(`https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${apiKey}&domainName=${target}&outputFormat=JSON`);
				const json = await response.json();
				setData(json);
			} catch (error) {
				console.error(error);
			} finally {
				//do stuff
			}
		} else {
			console.warn('Error. Empty values are not accepted.');
			window.alert('Invalid entry. Please try again.');
		}
	};
	
	//builds views for displaying data in key/value pairs
	const generateElement = (key,value) => {
		return (
			<View key={key} className="row">
				<Text className="col-xs-6 ins-label">{key}: {value}</Text>
			</View>
		);
	}
	//builds views for displaying the data 'section' of the object
	const generateHeader = (key) => {
		return (
			<View key={key} className="row">
				<Text className="col-xs-6 ins-label" style={{fontWeight: 'bold'}}>{key}</Text>
			</View>
		);
	}

	//recursive function to sort different amounts JSON data from API
	function generateData(data) {
		const newData = Object.keys(data).reduce((result, currentKey) => {
			if (typeof data[currentKey] !== "object") {
				const elementToPush = generateElement(currentKey, data[currentKey]);
				result.push(elementToPush);
			} else {
				const headerToPush = generateHeader(currentKey);
				result.push(headerToPush);
				const nested = generateData(data[currentKey]);
				result.push(...nested);
			}
			return result;
		}, []);
		return newData;
	}

	return (
		<View
			noSpacer={true}
			noScroll={true}
			style={styles.container}>
			<Text style={styles.title}>My First CYDERES Web App</Text>
			<Text style={styles.text}>Enter a website domain or an IP address below to learn about it:</Text>
			<View style={styles.centering}>
				<TextInput
					style={styles.input}
					placeholder='www.google.com'
					onChangeText={(value) => setTarget(value)}
					value={target}
					//these lines below allow for 'enter' key to be used to submit the form
					multiline={false}
					onSubmitEditing={()=>{
						onSubmit();
					}} />
				<Pressable
				style={styles.button}
				title="Submit"
				onPress={handleSubmit(onSubmit)}>
					<Text>Search</Text>
				</Pressable>
    	</View>
			<View>
				{generateData(data)}
			</View>
		</View>
	);
}

//simple responsive design
function titleSize (width) {
  if(width > 1080){
    return 48;
  } else if(width > 680){
    return 32;
  } else if(width > 320){
    return 24;
  } else { 
    return 18;
  }
}
function textSize (width) {
  if(width > 1080){
    return 24;
  } else if(width > 680){
    return 16;
  } else { 
    return 12;
  }
}

var styles = StyleSheet.create({
	button: {
		backgroundColor: 'lightgray',
		marginTop: 10,
		paddingHorizontal: 15,
		paddingVertical: 5,
	},
  centering: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  container: {
    backgroundColor: "whitesmoke",
		flex: 1,
		marginHorizontal: '10%',
  },
	input: {
		fontSize: textSize(),
		borderColor:'gray',
		borderWidth: 2,
		borderRadius: 3,
		paddingHorizontal: 5,
		paddingVertical: 2,
		justifyContent: 'center',
		alignContent: 'center',
	},
	text: {
		fontSize: textSize(width),
	},
	title: {
		fontWeight: "bold",
		fontSize: titleSize(width),
	}
});

export default Home;