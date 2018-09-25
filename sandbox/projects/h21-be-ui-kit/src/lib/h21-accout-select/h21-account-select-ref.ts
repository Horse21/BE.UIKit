import { OverlayRef } from '@angular/cdk/overlay';
import { H21AccountSelectComponent } from "./h21-account-select.component";
import { Subject, Observable } from "rxjs";
import { take, filter } from "rxjs/operators";

export class H21AccountSelectRef {

	private _beforeClose = new Subject<void>();
	private _afterClosed = new Subject<any>();

	componentInstance: H21AccountSelectComponent;

	constructor(private overlayRef: OverlayRef) {

	}

	close(data: any = null): void {
		this.componentInstance.animationStateChanged.pipe(
			filter((event: any) => event.phaseName === 'start'),
			take(1)
		).subscribe(() => {
			this._beforeClose.next();
			this._beforeClose.complete();
			this.overlayRef.detachBackdrop();
		});

		this.componentInstance.animationStateChanged.pipe(
			filter((event: any) => event.phaseName === 'done' && event.toState === 'leave'),
			take(1)
		).subscribe(() => {
			this.overlayRef.dispose();
			this._afterClosed.next(data);
			this._afterClosed.complete();
			this.componentInstance = null!;
		});

		this.componentInstance.startExitAnimation();
	}

	afterClosed(): Observable<any> {
		return this._afterClosed.asObservable();
	}

	beforeClose(): Observable<void> {
		return this._beforeClose.asObservable();
	}

}
