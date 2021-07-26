import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {ToastrService} from "ngx-toastr";
import {catchError} from "rxjs/operators";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private snackbar: ToastrService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const notShow = req.headers.has('no-error');
    return next
      .handle(req)
      .pipe(
        catchError(error => this.showError(error, notShow))
      );
  }

  private showError(error: { error: { message: string }}, notShow: boolean) {
    if (!notShow) {
      this.snackbar.error(error.error.message);
    }
    return throwError(error);
  }
}
