import { Injectable } from '@angular/core';

@Injectable()
export class AppState {
  public loading: boolean = false;
  public loadStart(): void {
    this.loading = true;
  }
  public loadEnd(): void {
    this.loading = false;
  }
}
