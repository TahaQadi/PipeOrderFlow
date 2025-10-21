/**
 * Centralized error logging system
 */

export class ErrorLogger {
  static logError(context: string, error: any, additionalData?: any) {
    const timestamp = new Date().toISOString();
    const errorInfo = {
      timestamp,
      context,
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : error,
      additionalData
    };

    console.error(`[${timestamp}] ERROR in ${context}:`, errorInfo);
    
    // In production, you might want to send this to an external logging service
    // like Sentry, LogRocket, or CloudWatch
  }

  static logWarning(context: string, message: string, additionalData?: any) {
    const timestamp = new Date().toISOString();
    console.warn(`[${timestamp}] WARNING in ${context}:`, message, additionalData);
  }

  static logInfo(context: string, message: string, additionalData?: any) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] INFO in ${context}:`, message, additionalData);
  }
}