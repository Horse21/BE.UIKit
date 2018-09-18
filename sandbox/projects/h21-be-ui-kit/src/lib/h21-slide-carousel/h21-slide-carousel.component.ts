import {
	AfterViewInit,
	OnInit,
	AfterViewChecked,
	Component,
	Input,
	Renderer2,
	ViewChild,
	ElementRef,
} from "@angular/core";
import {IPicture} from "./../../dto/i-picture";
import {H21SlideCarouselDialogComponent} from "./h21-slide-carousel-dialog.component";
import {MatDialog} from "@angular/material";

@Component({
	selector: 'h21-slide-carousel',
	templateUrl: './h21-slide-carousel.component.html'
})

export class H21SlideCarouselComponent implements AfterViewInit, OnInit, AfterViewChecked {

	@Input() slideCount: number = 5;
	@Input() showNavButtons: boolean = true;
	@Input() picturesCollection: Array<IPicture>;

	private totalSlideCount: number = 1;

	private viewPortWidth: number = 0;
	private slideWidth: number = 0;

	private currentTranslation: number = 0;
	private currentIndex: number = 0;

	@ViewChild('H21SlideCarousel') carousel: ElementRef;

	constructor (private _renderer: Renderer2,
				 public dialog: MatDialog) {

	}

	ngOnInit() {
		this.totalSlideCount = this.picturesCollection.length
		this.slideCount = this.slideCount > this.picturesCollection.length
			? this.picturesCollection.length
			: this.slideCount;
	}

	ngAfterViewInit() {
		let element = document.getElementById('H21SC_view_port')
		if (element) {
			this.init();
		}
	}

	ngAfterViewChecked() {
		if (this.viewPortWidth && this.carousel.nativeElement.clientWidth) {
			if(this.viewPortWidth != this.carousel.nativeElement.clientWidth) {
				this.init();
			}
		}
	}

	init(): void {
		this.totalSlideCount = this.picturesCollection.length;
		let element = document.getElementById('H21SC_view_port')

		this.viewPortWidth = element.clientWidth;
		this.slideWidth = this.viewPortWidth / this.slideCount;
		this.currentTranslation = this.currentIndex * this.slideWidth;

		let slides = element.children[0].children;

		for (let i = 0; i < slides.length; i++) {
			this._renderer.setStyle(slides[i], 'width', `${this.slideWidth}px`);
		}

		this.moveSlide();
	}

	prevSlide() {
		this.currentIndex--;
		this.moveSlide();
	}

	nextSlide() {
		this.currentIndex++;
		this.moveSlide();
	}

	private moveSlide() {
		let element = document.getElementById('H21SC_slides_set');
		this.currentTranslation = this.currentIndex * this.slideWidth;
		this._renderer.setStyle(element, 'transform', 'translateX(' + String(-this.currentTranslation) + 'px)');
	}

	showLargeImg(url: string): void {
		var dialogRef = this.dialog.open(H21SlideCarouselDialogComponent, {
			panelClass: 'c-h21-slide-carousel_dialog',
			backdropClass: 'c-h21-slide-carousel_dialog-backdrop',
			data: {
				imgUrl: url
			}
		});
	}

	prevPossibility(): boolean {
		return this.currentIndex > 0;
	}

	nextPossibility(): boolean {
		return this.currentIndex <= (this.totalSlideCount - this.slideCount - 1);
	}
}
