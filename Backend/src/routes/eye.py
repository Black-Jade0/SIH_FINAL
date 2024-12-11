import cv2
import dlib
import numpy as np
import os

current_dir = os.getcwd()

# Define the path to the model file
model_path = os.path.join(current_dir, "shape_predictor_68_face_landmarks.dat")

# Load the pre-trained face detector and shape predictor from dlib
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")

# Eye indices from the 68 landmarks model
LEFT_EYE_START = 36
LEFT_EYE_END = 41
RIGHT_EYE_START = 42
RIGHT_EYE_END = 47

def eye_aspect_ratio(eye):
    # Compute the euclidean distances between the two sets of vertical eye landmarks (x, y)-coordinates
    A = np.linalg.norm(eye[1] - eye[5])
    B = np.linalg.norm(eye[2] - eye[4])

    # Compute the euclidean distance between the horizontal eye landmark (x, y)-coordinates
    C = np.linalg.norm(eye[0] - eye[3])

    # The eye aspect ratio (EAR)
    ear = (A + B) / (2.0 * C)
    return ear

def get_eye_points(shape, eye_start, eye_end):
    # Get the eye points from the facial landmarks
    eye_points = shape[eye_start:eye_end + 1]
    return eye_points

def is_looking_away(left_ear, right_ear, threshold=0.2):
    # If the EAR is less than a threshold, the user is potentially not looking straight (attention deviation)
    return left_ear < threshold or right_ear < threshold

# Start capturing the video feed from the webcam
cap = cv2.VideoCapture(1)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Detect faces in the frame
    faces = detector(gray)

    for face in faces:
        # Predict facial landmarks
        landmarks = predictor(gray, face)
        landmarks = np.array([[p.x, p.y] for p in landmarks.parts()])

        # Get the eye points
        left_eye_points = get_eye_points(landmarks, LEFT_EYE_START, LEFT_EYE_END)
        right_eye_points = get_eye_points(landmarks, RIGHT_EYE_START, RIGHT_EYE_END)

        # Compute the EAR for both eyes
        left_ear = eye_aspect_ratio(left_eye_points)
        right_ear = eye_aspect_ratio(right_eye_points)

        # Draw the eye landmarks for visualization
        for point in left_eye_points:
            cv2.circle(frame, tuple(point), 2, (0, 255, 0), 1)
        for point in right_eye_points:
            cv2.circle(frame, tuple(point), 2, (0, 255, 0), 1)

        # Check if the user is looking away
        if is_looking_away(left_ear, right_ear):
            cv2.putText(frame, "Looking Away!", (20, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
        else:
            cv2.putText(frame, "Looking Forward", (20, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    # Display the result
    cv2.imshow("Eye Tracking", frame)

    # Break the loop on 'q' key press
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the camera and close all windows
cap.release()
cv2.destroyAllWindows()