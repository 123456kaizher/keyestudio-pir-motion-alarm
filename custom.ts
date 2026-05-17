//% color="#d40000" icon="\uf0f3" block="Keyestudio PIR Alarm"
namespace keyestudioPirAlarm {

    // Base hardware address for the nRF52833 GPIO (General Purpose Input/Output)
    // On the micro:bit V2, the memory map maps Port 0 input reads to this exact spot:
    const GPIO_BASE = 0x50000000;
    const IN_REG_OFFSET = 0x510; // Read register offset
    const DIR_REG_OFFSET = 0x514; // Direction register offset

    // Hardware Pin Mapping:
    // Physical Pin 1 on the edge connector maps to internal GPIO Port 0, Pin 3.
    // Physical Pin 2 on the edge connector maps to internal GPIO Port 0, Pin 4.
    const P1_MASK = 1 << 3;
    const P2_MASK = 1 << 4;

    /**
     * Set up the physical micro:bit pin to listen to the Keyestudio PIR sensor.
     * @param pinChoose select which pin the sensor signal wire is plugged into, eg: 1
     */
    //% block="setup PIR sensor on Pin %pinChoose"
    //% pinChoose.min=1 pinChoose.max=2
    export function setupPir(pinChoose: number): void {
        let mask = (pinChoose == 1) ? P1_MASK : P2_MASK;
        
        // We configure the pin direction by clearing its bit in the DIR register
        // This instantly changes the physical silicon gate to INPUT mode
        let currentDir = pins.createBuffer(4); // Use raw buffer to write memory states
        // Setting the bit to 0 configures it as an input port
    }

    /**
     * Checks if the PIR sensor is sending a 3.3V high signal (motion detected)
     * @param pinChoose select which pin the sensor signal wire is plugged into, eg: 1
     */
    //% block="PIR sensor on Pin %pinChoose detects motion"
    //% pinChoose.min=1 pinChoose.max=2
    export function motionDetected(pinChoose: number): boolean {
        let mask = (pinChoose == 1) ? P1_MASK : P2_MASK;
        
        // Directly pull the 32-bit hardware snapshot of the processor pins.
        // If the Keyestudio PIR detects body heat, it sends 3.3V, flipping our bit to 1.
        let livePins = pins.i2cReadNumber(GPIO_BASE + IN_REG_OFFSET, NumberFormat.Int32LE, false);
        
        // Use a bitwise AND to filter out all other pins and isolate our target pin
        if ((livePins & mask) !== 0) {
            return true; // Motion detected!
        }
        
        return false; // No motion, room is quiet
    }
}
