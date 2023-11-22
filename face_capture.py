import cv2
import os

faceCascade = cv2.CascadeClassifier('haarcascade/haarcascade_frontalface_default.xml')

video_capture = cv2.VideoCapture(0)
video_capture.set(cv2.CAP_PROP_FRAME_WIDTH, 840)
video_capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 840)

# Specify the `uid` and `NUM_IMGS` here.
uid = "3035000002"
NUM_IMGS = 200
if not os.path.exists('data/{}'.format(uid)):
    os.mkdir('data/{}'.format(uid))

cnt = 1
font = cv2.FONT_HERSHEY_SIMPLEX
bottomLeftCornerOfText = (50, 50)
fontScale = 1
fontColor = (64, 64, 64)
lineType = 2

# Open camera
while cnt <= NUM_IMGS:
    # Capture frame-by-frame
    ret, frame = video_capture.read()

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    
    faces = faceCascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(30, 30),
        flags=cv2.CASCADE_SCALE_IMAGE,
    )

    # Draw a rectangle around the faces
    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

    msg = "Saving {}'s Face Data [{}/{}]".format(uid, cnt, NUM_IMGS)
    cv2.putText(frame, msg,
                bottomLeftCornerOfText,
                font,
                fontScale,
                fontColor,
                lineType)


    # Display the resulting frame
    cv2.imshow('Video', frame)
    # Store the captured images in `data/Jack`
    cv2.imwrite("data/{}/{}{:03d}.jpg".format(uid, uid, cnt), frame)
    cnt += 1

    key = cv2.waitKey(100)

# When everything is done, release the capture
video_capture.release()
cv2.destroyAllWindows()
