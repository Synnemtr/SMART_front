import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MqPage } from './mq.page';

describe('MqPage', () => {
  let component: MqPage;
  let fixture: ComponentFixture<MqPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MqPage],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(MqPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
