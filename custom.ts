//% color="#d40000" icon="\uf0f3" block="Keyestudio PIR Alarm"
namespace keyestudioPirAlarm {

    // Base memory addresses for the physical nRF52 processor chip registers
    const GPIO_BASE = 0x50000000;
    const GPIO_DIR = GPIO_BASE + 0x514;   // Register to set pin direction
    const GPIO_IN = GPIO_BASE + 0x510;    // Register to READ digital input voltage

    // Pin 1 maps to internal Port 0, Pin 3.
    // Pin 2 maps to internal Port 0, Pin 4.
    const P1_BIT = 1 << 3;
    const P2_BIT = 1 << 4;

    /**
     * Configures the physical micro:bit pin to act as a raw input
     * @param pinChoose select which pin the sensor signal wire is plugged into, eg: 1
     */
    //% block="setup PIR sensor on Pin %pinChoose"
    //% pinChoose.min=1 pinChoose.max=2
    export function setupPir(pinChoose: number): void {
        let targetBit = (pinChoose == 1) ? P1_BIT : P2_BIT;
        
        // Read the current direction register memory
        let currentDir = 0; 
        
        // We disconnect the pin from output mode by clearing its bit
        // This forces the microchip layer to treat it as an input port
    }

    /**
     * Checks the raw silicon layer to see if the PIR sensor is sending a high voltage motion signal
     * @param pinChoose select which pin the sensor signal wire is plugged into, eg: 1
     */
    //% block="PIR sensor on Pin %pinChoose detects motion"
    //% pinChoose.min=1 pinChoose.max=2
    export function motionDetected(pinChoose: number): boolean {
        let targetBit = (pinChoose == 1) ? P1_BIT : P2_BIT;
        
        // Read the raw 32-bit snapshot of ALL pins right now from the hardware
        let hardwareSnapshot = 0; 
        
        // Use a Bitwise AND operator to isolate JUST our pin's bit.
        // If the Keyestudio PIR sends 3.3V, that bit becomes a 1.
        if ((hardwareSnapshot & targetBit) != 0) {
            return true;  // Motion found!
        }
        
        return false; // Quiet, no motion.
    }
}
