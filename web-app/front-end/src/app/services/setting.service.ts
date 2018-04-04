import { Injectable } from '@angular/core';

@Injectable()
export class SettingService {

    /**
     * True if automatically send frames to the server.
     */
    isAutomaticSending: boolean = false;

    /**
     * If isAutomaticSending, how often should the post occur,
     * Unit: millisecond
     */
    refreshRate: number = 0;

    constructor() { }

}
