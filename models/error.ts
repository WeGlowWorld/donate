export class BackendError extends Error {
  status: number;
  constructor(message?: string, status?: number) {
    super(message || 'An error occured.');
    this.status = status || 400;
    this.name = 'BackendError';
  }
}
