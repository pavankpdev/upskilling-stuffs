import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from "@nestjs/common";
import {Request, Response} from "express"

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): any {
        const cts = host.switchToHttp()
        const req = cts.getRequest<Request>()
        const res = cts.getResponse<Response>()
        const status = exception.getStatus();

        res.status(status).json({
            statusCode: status,
            timeStamp: new Date().toISOString(),
            path: req.url
        })
    }
}