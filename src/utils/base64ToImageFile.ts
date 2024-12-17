/**
 * Converts a base64 string to an image file
 * @param base64String - The base64 string to convert
 * @param fileName - The name for the output file (including extension)
 * @returns File object
 */
export function base64ToImageFile(base64String: string, fileName: string): File {
    // Remove data URL prefix if present
    const base64Content = base64String.replace(/^data:image\/\w+;base64,/, '');
    
    // Convert base64 to binary
    const binaryString = window.atob(base64Content);
    
    // Create an array to store binary data
    const bytes = new Uint8Array(binaryString.length);
    
    // Convert binary string to byte array
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    
    // Determine MIME type from base64 string or default to 'image/jpeg'
    const mimeType = base64String.match(/^data:(.*?);/)
        ? base64String.match(/^data:(.*?);/)![1]
        : 'image/jpeg';
    
    // Create Blob from byte array
    const blob = new Blob([bytes], { type: mimeType });
    
    // Create and return File object
    return new File([blob], fileName, { type: mimeType });
}