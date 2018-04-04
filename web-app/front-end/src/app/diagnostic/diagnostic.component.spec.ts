import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticComponent } from './diagnostic.component';

describe('DiagnosticComponent', () => {
    let component: DiagnosticComponent;
    let fixture: ComponentFixture<DiagnosticComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DiagnosticComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DiagnosticComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
