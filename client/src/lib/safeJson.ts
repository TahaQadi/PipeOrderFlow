/**
 * Safely parse JSON string with proper error handling
 * @param jsonString - The JSON string to parse
 * @param fallback - Fallback value if parsing fails
 * @returns Parsed object or fallback value
 */
export function safeJsonParse<T>(jsonString: string, fallback: T): T {
  try {
    if (!jsonString || typeof jsonString !== 'string') {
      console.warn('Invalid JSON string provided:', jsonString);
      return fallback;
    }
    
    const parsed = JSON.parse(jsonString);
    console.log('Successfully parsed JSON:', parsed);
    return parsed;
  } catch (error) {
    console.warn('Failed to parse JSON:', error);
    console.warn('JSON string was:', jsonString);
    return fallback;
  }
}

/**
 * Safely stringify object to JSON
 * @param obj - Object to stringify
 * @param fallback - Fallback string if stringify fails
 * @returns JSON string or fallback
 */
export function safeJsonStringify(obj: unknown, fallback: string = '{}'): string {
  try {
    return JSON.stringify(obj);
  } catch (error) {
    console.warn('Failed to stringify object:', error);
    return fallback;
  }
}