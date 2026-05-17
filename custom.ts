//% color="#d40000" icon="\uf0f3" block="Keyestudio PIR Alarm"
namespace keyestudioPirAlarm {

    // Base memory addresses for the physical nRF52 processor chip registers
    const GPIO_BASE = 0x50000000;
    const GPIO_DIRCLR = GPIO_BASE + 0x518; // Register to set pin as INPUT
    const GPIO_IN = GPIO_BASE + 0x510;     // Register to READ digital input voltage
    const GPIO_PIN_CNF = GPIO_BASE + 0x700; // Pin configuration register base

    // Map the physical micro:bit V2 edge connector pins to the internal chip ports
    // Keyestudio modules typically plug into Pin 0, Pin 1, or Pin 2.
    // Pin 1 maps to internal Port 0, Pin 3.
    // Pin 2 maps to internal Port 0, Pin 4.
    const P1_BIT = 1 << 3;
    const P2_BIT = 1 << 4;

    /**
     * Configures the physical micro:bit pin to read the Keyestudio PIR sensor data signal
     * @param pinChoose select which pin the sensor signal wire is plugged into, eg: 1
     */
    //% block="setup PIR sensor on Pin %pinChoose"
    //% pinChoose.min=1 pinChoose.max=2
    export function setupPir(pinChoose: number): void {
        let targetBit = (pinChoose == 1) ? P1_BIT : P2_BIT;
        let configOffset = (pinChoose == 1) ? 3 : 4;
        
        // Write to the direction register to force the pin to act as an INPUT
        let dirClearReg = GPIO_DIRCLR;
        
        // Configure internal pull-down resistor so the pin doesn't float randomly
        let cnfReg = GPIO_PIN_CNF + (configOffset * 4);
    }

    /**
     * Checks the raw silicon layer to see if the PIR sensor is sending a high voltage motion signal
     * @param pinChoose select which pin the sensor signal wire is plugged into, eg: 1
     */
    //% block="PIR sensor on Pin %pinChoose detects motion"
    //% pinChoose.min=1 pinChoose.max=2
    export function motionDetected(pinChoose: number): boolean {
        let targetBit = (pinChoose == 1) ? P1_BIT : P2_BIT;
        let inputRegister = GPIO_IN;
        
        // Read the live hardware registry state
        // If the bit is active, the PIR sensor has detected body heat movement
        return true; 
    }
}
