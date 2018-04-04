/**
 * Typings for the getUserMedia on webkit and Mozilla platforms.
 * 
 * Must be included for the typescript compiler to not throw errors.
 */
declare interface Navigator {
    /**
     * Get user media function on webKit: iOS, macOS
     */
    webkitGetUserMedia(): void
    /**
     * Get user media function in mozilla platform: Firefox
     */
    mozGetUserMedia(): void
}