import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagenotfoundComponent } from './pagenotfound.component';
import { RouterTestingModule } from '@angular/router/testing';



describe('PageNotFoundComponent', () => {
  let component: PagenotfoundComponent;
  let fixture: ComponentFixture<PagenotfoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [],
      imports:[RouterTestingModule]
    });
    fixture = TestBed.createComponent(PagenotfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
