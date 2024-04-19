import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GqPage } from './gq.page';

describe('GqPage', () => {
  let component: GqPage;
  let fixture: ComponentFixture<GqPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GqPage],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(GqPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
