import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { AnimationService } from '../../services/animation.service';
import { Router } from '@angular/router';
import { Property } from 'src/app/interfaces/property';
import { FilterService } from 'src/app/services/filter.service';

// Icons
import {
  faAngleDown,
  faBed,
  faCoins,
  faHouseUser,
  faIgloo,
  faLocationArrow,
  faQuoteLeft,
  faRulerCombined,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  host: {
    '(window: resize)': 'onWindowResize($event)',
  },
})
export class MainPageComponent implements OnInit, AfterViewInit {
  properties: Property[];
  selectedProperty: Property;
  width: number = window.innerWidth;
  @ViewChild('carouselCell') cellHeight: ElementRef;

  public carouselHeight: number;
  public cellToShow: number;

  // ICONS
  faLocationArrow = faLocationArrow;
  faHouseUser = faHouseUser;
  faCoins = faCoins;
  faRooms = faBed;
  faArea = faRulerCombined;
  faYear = faIgloo;
  faQuote = faQuoteLeft;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faLinkedIn = faLinkedin;
  faArrowDown = faAngleDown;

  constructor(
    private router: Router,
    public filter: FilterService,
    public elem: ElementRef,
    private animationService: AnimationService
  ) {}

  ngOnInit(): void {
    // prevent images from dragging to make carousel work properly
    window.ondragstart = () => false;
  }

  ngAfterViewInit(): void {
    // questions.forEach((question: any, i: number) => {
    //   console.log('question:', question);
    //   question.addEventListener('click', () => {
    //     const visibility = accordions[i].getAttribute('data-visible');
    //     if (visibility === 'false') {
    //       accordions[i].setAttribute('data-visible', true);
    //     } else {
    //       accordions[i].setAttribute('data-visible', false);
    //     }
    //   });
    // });
  }

  // Revert carousel when filtering apply
  onSelectChange() {
    let carousel = this.elem.nativeElement.querySelector('.carousel-cells');
    carousel.style.transform = 'translateX(0px)';
  }

  onStart() {
    let questions = this.elem.nativeElement.querySelectorAll('.question');
    let accordions =
      this.elem.nativeElement.querySelectorAll('.accordion-item');

    this.animationService.faqToggle(questions, accordions);
  }

  // Responsive carousel on resize
  onWindowResize(event?: any) {
    if (event) this.width = event.target.innerWidth;
    this.carouselHeight = this.cellHeight.nativeElement.clientHeight + 30;

    this.responsiveCarousel();
  }

  // show amount of carousel cells depends on client width
  responsiveCarousel() {
    if (this.width > 1280) {
      this.cellToShow = 3;
    } else if (this.width > 900) {
      this.cellToShow = 2;
    } else {
      this.cellToShow = 1;
    }
  }

  // Redirect to property details page on "szczegóły" button click
  showPropertyDetails(property: Property): void {
    this.selectedProperty = property;
    this.router.navigate(['/property', this.selectedProperty.id]);
  }
}
