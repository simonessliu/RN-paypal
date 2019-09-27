import React from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import {WebView} from 'react-native-webview';


export default class IndexScreen extends React.Component{
    state = {
        showModal: false,
        status:"Pending"
    }

    handleResponse = data => {
        if(data.title === 'success') {
            this.setState({showModal: false, status: 'Complete'});
        }else if(data.title === 'cancel'){
            this.setState({showModal: false, status: 'Cancelled'})
        }else {
            return;
        }
    }
    //dont write localhost 3000 here  instead we use 10.0.0.1 shown in expo
    render(){
        return (
            <View>
                <Modal
                    visible={this.state.showModal}
                    onRequestClose = {() => this.setState({showModal:false})}
                >
                    <WebView 
                        source = {{ uri: "https://rn-paypal.herokuapp.com/" }} 
                        onNavigationStateChange={data => this.handleResponse(data)}
                        // injectedJavaScript = {'document.f1.submit()'}
                    />
                </Modal>
                <TouchableOpacity style = {{width:300, height:100}} onPress={() => this.setState({showModal:true})}>
                    <Text>Pay with Paypal</Text>
                </TouchableOpacity>
                <Text>Payment Status: {this.state.status}</Text>
            </View>
        )
    }
}