import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAccessoryComponent } from './delete-accessory.component';

describe('DeleteAccessoryComponent', () => {
  let component: DeleteAccessoryComponent;
  let fixture: ComponentFixture<DeleteAccessoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteAccessoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAccessoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
