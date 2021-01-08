import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet, Switch, Button, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DatePicker from "react-native-datepicker";
import DateTimePicker from '@react-native-community/datetimepicker';


class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: new Date(),
            time: new Date(),
            showdate: false,
            showtime: false,
            showModal: false
        }
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();

    }

    toggleModal() {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: new Date(),
            time: new Date(),
            showdate: false,
            showtime: false,
            showModal: false
        });
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>No of guests</Text>
                    <Picker style={styles.formItem}
                        onValueChange={(itemValue, itemIndex) => { this.setState({ guests: itemValue }) }}
                        selectedValue={this.state.guests}>
                        <Picker.Item label='1' value='1' />
                        <Picker.Item label='2' value='2' />
                        <Picker.Item label='3' value='3' />
                        <Picker.Item label='4' value='4' />
                        <Picker.Item label='5' value='5' />
                        <Picker.Item label='6' value='6' />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non Smoking</Text>
                    <Switch value={this.state.smoking} onValueChange={(value) => this.setState({ smoking: value })}
                        style={styles.formItem}
                        onTintColor='#512DA8'
                    />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date and Time</Text>
                    <DatePicker style={styles.formItem} format='' mode="datetime" date={this.state.date} minDate={new Date().toISOString()} confirmBtnText="Confirm" cancelBtnText="Cancel" onDateChange={(date) => this.setState({ date: date })} customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        // ... You can check the source to find the other keys. 
                    }} />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date</Text>
                    <Button title="Show Date Picker" onPress={() => { this.setState({ showdate: true }) }} />
                    {this.state.showdate && <DateTimePicker value={this.state.date} mode="date" onChange={(event, date) => this.setState({ date: date, showdate: false })} display="default" />}
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Time</Text>
                    <Button title="Show Time Picker" onPress={() => { this.setState({ showtime: true }) }} />
                    {this.state.showtime && <DateTimePicker value={this.state.time} mode="time" onChange={(event, time) => this.setState({ time: time, showdate: false, showtime: false })} display="default" />}
                </View>
                <View style={styles.formRow}>
                    <Button
                        onPress={() => this.handleReservation()}
                        title="Reserve"
                        color="#512DA8"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
                <Modal
                    animation={"slide"} visible={this.state.showModal} transparent={false} onDismiss={() => this.toggleModal()} onRequestClose={() => this.toggleModal()} >
                    <View>
                        <Text style={styles.modalTitle}>Your Reservation</Text>
                        <Text style={styles.modalText}>Number of Guests: {this.state.guests}</Text>
                        <Text style={styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                        <Text style={styles.modalText}>Date and Time: {this.state.date.toString()}</Text>
                    </View>
                    <Button 
                            onPress = {() =>{this.toggleModal(); this.resetForm();}}
                            color="#512DA8"
                            title="Close" 
                            />
                </Modal>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    formRow: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        margin: 20
    },
    formLabel: {
        fontSize: 16,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
})


export default Reservation;