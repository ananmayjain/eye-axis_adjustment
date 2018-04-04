import { TestBed, inject } from '@angular/core/testing';

import { DiagosticService } from './diagostic.service';

describe('DiagosticService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DiagosticService]
        });
    });

    it('should be created', inject([DiagosticService], (service: DiagosticService) => {
        expect(service).toBeTruthy();
    }));
});
