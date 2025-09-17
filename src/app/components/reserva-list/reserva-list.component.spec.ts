import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasListComponent } from './reserva-list.component';

describe('ReservaListComponent', () => {
  let component: ReservasListComponent;
  let fixture: ComponentFixture<ReservasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservasListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
