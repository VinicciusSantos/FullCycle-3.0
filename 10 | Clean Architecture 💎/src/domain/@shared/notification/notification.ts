export interface NotificationErrorProps {
  message: string;
  context: string;
}

export default class Notification {
  private errors: NotificationErrorProps[] = [];

  public messages(context?: string): string {
    return this.errors
        .filter((error) => !context || error.context === context)
        .map((error) => `${error.context}: ${error.message}`)
        .join(", ");
  }

  public addError(error: NotificationErrorProps): void {
    this.errors.push(error);
  }

  public hasErrors(): boolean {
    return this.errors.length > 0;
  }

  public getErrors(): NotificationErrorProps[] {
    return this.errors;
  }
}
