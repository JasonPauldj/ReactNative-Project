import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';

function ContactUs() {
    return (
        <View >
        <Card>
            <Card.Title>
                Contact Information
            </Card.Title>
            <Card.Divider></Card.Divider>
            <View>
               
                    <Text>
                        121, Clear Water Bay Road</Text>
                    <Text>
                        Clear Water Bay, Kowloon</Text>
                    <Text>
                        HONG KONG</Text>
                    <Text>
                        Tel: +852 1234 </Text>
                    <Text>
                        Fax: +852 8765 4321</Text>
                    <Text>
                        Email:confusion@food.net</Text>
                
            </View>
        </Card>
        </View>
    )

}

export default ContactUs;