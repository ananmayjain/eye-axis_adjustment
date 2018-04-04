import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
/**
 * About component is the about page of the app.
 */
export class AboutComponent implements OnInit {

    constructor(private menuService: MenuService) { }

    /**
     * Called after view is loaded, equivalent of iOS's viewDidAppaer()
     * make sure the menu active index is updated so the menu behaves as 
     * expected.
     */
    ngOnInit() {
        this.menuService.activeIndex = 2;
    }

}
