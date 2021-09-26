/**
 * Class to monitor Raspberry Pi GPIO for trigger from doorbell button push
 **/
var debug = require('debug')('pi_doorbell:DoorBellBtn');

const DoorBellController = require('./doorbell_controller');

// const Gpio = require('onoff').Gpio;

// We only need one Daemon monitoring to play sounds
const doorbellController = DoorBellController.getInstance();
doorbellController.awaitButtonPush();

class DoorBellBtn {
// extends Gpio{
    constructor(gpio_pin_id) {
        console.log("DoorBellBtn constructed for Pin " + gpio_pin_id)
        // super(gpio_pin_id, 'in','rising');
    }

    // constructor() {
    //     console.log("DoorBellBtn construsted!")
    // }
    
    // watch_button_press() {
    //     this.watch(function (err, value) {
    //         if (err) {
    //             throw err;
    //         }

    //         doorbelld.ringDoorbell();
    //     });
    // }
}


module.exports = DoorBellBtn

