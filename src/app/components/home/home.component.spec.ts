import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HomecarouselComponent } from '../homecarousel/homecarousel.component';
import { RouterTestingModule } from '@angular/router/testing';



describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent,NavbarComponent,HomecarouselComponent],
      providers: [],
      imports:[RouterTestingModule]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
