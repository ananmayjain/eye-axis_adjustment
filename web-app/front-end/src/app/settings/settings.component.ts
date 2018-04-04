import { Component, OnInit } from '@angular/core';
import { SettingService } from '../services/setting.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})

/**
 * Setting component is the setting panel in diagnostic component.
 */
export class SettingsComponent implements OnInit {

    constructor(public settingService: SettingService) { }

    ngOnInit() {
    }

}
