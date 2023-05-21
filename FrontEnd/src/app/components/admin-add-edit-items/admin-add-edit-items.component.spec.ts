import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddEditItemsComponent } from './admin-add-edit-items.component';

describe('AdminAddEditItemsComponent', () => {
  let component: AdminAddEditItemsComponent;
  let fixture: ComponentFixture<AdminAddEditItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddEditItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddEditItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
