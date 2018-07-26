import { Injectable } from '@angular/core';

@Injectable()
export class AppState {
  private loading = false;
  public loadStart(): void {
    this.loading = true;
  }
  public loadEnd(): void {
    this.loading = false;
  }
}
