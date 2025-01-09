import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoProductoComponent } from './listado-producto.component';

describe('ListadoProductoComponent', () => {
  let component: ListadoProductoComponent;
  let fixture: ComponentFixture<ListadoProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoProductoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
