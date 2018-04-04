import { Injectable } from '@angular/core';

/**
 * Menu service keeps track of the active menu item in the nav bar.
 */
@Injectable()
export class MenuService {

    /**
     * The menu index to be active
     * 1 = Diagnostic
     * 2 = About
     */
    activeIndex: number = 0;

    constructor() { }

}
