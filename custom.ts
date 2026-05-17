//% color="#d40000" icon="\uf0f3" block="Keyestudio PIR Alarm"
namespace keyestudioPirAlarm {

    /**
     * Reads the digital signal from the Keyestudio PIR sensor.
     * Returns true if 3.3V (motion) is detected, false if 0V (quiet).
     * @param pinChoose select which pin the sensor signal wire is plugged into, eg: DigitalPin.P1
     */
    //% block="PIR sensor on %pinChoose detects motion"
    export function motionDetected(pinChoose: DigitalPin): boolean {
        // This is the absolute core command. It reads the real electrical voltage 
        // on the pin (1 for high voltage, 0 for low voltage).
        if (pins.digitalReadPin(pinChoose) == 1) {
            return true; // Body heat movement detected!
        }
        return false; // Room is perfectly still.
    }
}
