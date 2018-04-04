import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuService } from '../services/menu.service';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
})

/**
 * Welcome component is the welcome screen of the app.
 */
export class WelcomeComponent implements OnInit {

    constructor(private menuService: MenuService) {
    }

    /**
     * Called after view is loaded, equivalent of iOS's viewDidAppaer()
     * make sure the menu active index is updated so the menu behaves as 
     * expected.
     */
    ngOnInit() {
        this.menuService.activeIndex = 0
    }

}
