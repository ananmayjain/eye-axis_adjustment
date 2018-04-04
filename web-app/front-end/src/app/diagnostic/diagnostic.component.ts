import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { SettingService } from '../services/setting.service';
import { DiagosticService } from '../services/diagostic.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-diagnostic',
    templateUrl: './diagnostic.component.html',
    styleUrls: ['./diagnostic.component.css'],
})

/**
 * Diagnostic component check and fix the user's eyes.
 */
export class DiagnosticComponent implements OnInit, OnDestroy {

    isSettingActive: boolean = false;
    videoElement: HTMLVideoElement;
    canvasElement: HTMLCanvasElement;

    videoStream: MediaStream;

    timerHandle: number;

    constructor(private menuService: MenuService,
        public settingService: SettingService,
        public diagnosticService: DiagosticService,
        private httpClient: HttpClient) { }

    /**
     * 1. Update active menu index
     * 2. Set up camera and get the canvas rendering.
     */
    ngOnInit() {
        // Diagnostic Page does not have a standaline 
        // menu item.
        this.menuService.activeIndex = 1;

        this.videoElement = <HTMLVideoElement>document.getElementById("video-element");
        this.canvasElement = <HTMLCanvasElement>document.getElementById("canvas-element");

        this.setupCamera();
        // console.log(this.canvasElement)
    }

    /**
     * Called when the user navigates away from the user
     */
    ngOnDestroy() {
        // Make sure the video stream is stopped, to turn the camera off.
        if (this.videoStream) {
            this.videoStream.getTracks()[0].stop();
        }
        
    }

    /**
     * 1. Obtain video and canvas element
     * 2. Access camera
     * 3. Start update process
     */
    setupCamera() {

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
        navigator.mozGetUserMedia;

        if (navigator.getUserMedia) {
            navigator.getUserMedia({ video: true },
                (stream) => {
                    // The video element is not shown to the user.
                    // However the video element still plays the video, allowuing the canvas
                    // element to keep rendering.
                    this.videoElement.srcObject = stream;
                    this.videoElement.play();

                    this.videoStream = stream;

                    this.timerHandle = window.setInterval((args: any[]) => {
                        //
                        this.canvasElement.getContext("2d").drawImage(
                            this.videoElement,
                            0, 0,
                            this.canvasElement.width, this.canvasElement.height
                        )

                    }, 100);

                }, (reason) => {
                    console.log(reason.message);
                })
        } else {
            this.diagnosticService.isCameraAvailable = false;
        }
    }

    /* Event handlers from this point on */

    /**
     * Toggel the visibility of the settings panel.
     */
    toggleSettings(): void {
        this.isSettingActive = !this.isSettingActive;
    }

    /**
     * Send a frame of the canvas to the back end python in .jpg format.
     */
    sendFrame(): void {
        var image = this.canvasElement.toDataURL("image/jpeg");

        // Must remove the following prefix, otherwise the image's format is not right.
        image = image.replace("data:image/jpeg;base64,", "");

        // Prepare data sent to the server
        var data = JSON.stringify(
            { "image": image }
        )

        // Send data to "/new_update"
        // to change the url, make sure to change the corresponding url and function name in 
        // : web-app/main.py
        this.httpClient.post("/new_update", data).subscribe(
            () => {
                console.log("Respond")
            },
            (error) => {
                console.log(error.message)
            },
            () => {
                console.log("Success")
            });

        console.log("New frame sent");

    }

}
