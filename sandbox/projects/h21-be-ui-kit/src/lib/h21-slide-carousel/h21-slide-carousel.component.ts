import {
	AfterViewInit,
	OnInit,
	Component,
	HostListener,
	Input,
	Renderer2,
} from "@angular/core";
import {IPicture} from "./../../dto/i-picture";


@Component({
	selector: 'h21-slide-carousel',
	templateUrl: './h21-slide-carousel.component.html'
})

export class H21SlideCarouselComponent implements AfterViewInit, OnInit {

	@Input() slideCount: number = 5;
	@Input() showNavButtons: boolean = true;
	@Input() picturesCollection: Array<IPicture>;

	private totalSlideCount: number = 1;

	private viewPortWidth: number = 0;
	private slideWidth: number = 0;

	private currentTranslation: number = 0;
	private currentIndex: number = 0;

	@HostListener('window:resize', ['$event']) onResize(event ?) {
		this.init();
	}

	constructor (private _renderer: Renderer2) {

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

	init(): void {
		this.totalSlideCount = this.picturesCollection.length;
		let element = document.getElementById('H21SC_view_port')

		this.viewPortWidth = element.clientWidth;
		this.slideWidth = this.viewPortWidth / this.slideCount;

		let slides = element.children[0].children;

		for (let i = 0; i < slides.length; i++) {
			this._renderer.setStyle(slides[i], 'width', `${this.slideWidth}px`);
		}
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
		alert('in developing');
	}

	prevPossibility(): boolean {
		return this.currentIndex > 0;
	}

	nextPossibility(): boolean {
		return this.currentIndex <= (this.totalSlideCount - this.slideCount - 1);
	}
}





