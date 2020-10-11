class HttpException extends Error {
  status: number;
  message: string;
  type: any;
  body: any;
  constructor(status: number, message: string, body: any, type: any) {
    super(message);
    this.status = status;
    this.message = message;
    this.body = body;
    this.type = type;
  }
}

export default HttpException;
