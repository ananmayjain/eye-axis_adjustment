import cv2

class Camera:
    def __init__(self):
        """
        Initialize a video object.
        """
        self.video = cv2.VideoCapture(0)
    
    def __del__(self):
        """
        Release the video object.
        """
        self.video.release()

    def get_frame(self):
        """
        Capture one frame from the web cam, encode it to .jpg format
        and returns it in bytes for use by "camera_stream".
        """
        success, rawFrame = self.video.read()
        ret, frame = cv2.imencode(".jpg", rawFrame)

        # TODO: diagnostic the image
        
        return frame.tobytes()