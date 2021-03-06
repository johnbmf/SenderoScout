﻿// Just add this script to your camera. It doesn't need any configuration.

using UnityEngine;

public class TouchCamera : MonoBehaviour {
	Vector2?[] oldTouchPositions = {
		null,
		null
	};
	Vector2 oldTouchVector;
	float oldTouchDistance;
    float max_movement_X = 322f;
    float max_movement_Y = 400f;
    float min_movement_X = -322f;
    float min_movement_Y = -400f;

    void Update() {
		if (Input.touchCount == 0) {
			oldTouchPositions[0] = null;
			oldTouchPositions[1] = null;
		}
		else if (Input.touchCount == 1) {
            if (oldTouchPositions[0] == null || oldTouchPositions[1] != null) {
                oldTouchPositions[0] = Input.GetTouch(0).position;
                oldTouchPositions[1] = null;
            }
            else {
                Vector2 newTouchPosition = Input.GetTouch(0).position;

                Vector3 New_camera_pos = transform.position + transform.TransformDirection((Vector3)((oldTouchPositions[0] - newTouchPosition) * GetComponent<Camera>().orthographicSize / GetComponent<Camera>().pixelHeight * 2f));
                if (New_camera_pos[0] > max_movement_X) {
                    New_camera_pos[0] = max_movement_X;
                }

                if (New_camera_pos[1] > max_movement_Y) {
                    New_camera_pos[1] = max_movement_Y;
                }

                if (New_camera_pos[0] < min_movement_X)
                {
                    New_camera_pos[0] = min_movement_X;
                }

                if (New_camera_pos[1] < min_movement_Y)
                {
                    New_camera_pos[1] = min_movement_Y;
                }

                //transform.position += transform.TransformDirection((Vector3)((oldTouchPositions[0] - newTouchPosition) * GetComponent<Camera>().orthographicSize / GetComponent<Camera>().pixelHeight * 2f));
                transform.position = New_camera_pos;
				oldTouchPositions[0] = newTouchPosition;
			}
		}
		else {
			if (oldTouchPositions[1] == null) {
				oldTouchPositions[0] = Input.GetTouch(0).position;
				oldTouchPositions[1] = Input.GetTouch(1).position;
				oldTouchVector = (Vector2)(oldTouchPositions[0] - oldTouchPositions[1]);
				oldTouchDistance = oldTouchVector.magnitude;
			}
			else {
				Vector2 screen = new Vector2(GetComponent<Camera>().pixelWidth, GetComponent<Camera>().pixelHeight);
				
				Vector2[] newTouchPositions = {
					Input.GetTouch(0).position,
					Input.GetTouch(1).position
				};
				Vector2 newTouchVector = newTouchPositions[0] - newTouchPositions[1];
				float newTouchDistance = newTouchVector.magnitude;

				transform.position += transform.TransformDirection((Vector3)((oldTouchPositions[0] + oldTouchPositions[1] - screen) * GetComponent<Camera>().orthographicSize / screen.y));

                //Rotacion;
                //transform.localRotation *= Quaternion.Euler(new Vector3(0, 0, Mathf.Asin(Mathf.Clamp((oldTouchVector.y * newTouchVector.x - oldTouchVector.x * newTouchVector.y) / oldTouchDistance / newTouchDistance, -1f, 1f)) / 0.0174532924f));

                GetComponent<Camera>().orthographicSize *= oldTouchDistance / newTouchDistance;
            
                //Limites del zoom: se cambia el ultimo valor de la funcion max para limitar zoom in, y min para limitar zoom out;
                GetComponent<Camera>().orthographicSize = Mathf.Max(GetComponent<Camera>().orthographicSize, 20.0f);
                GetComponent<Camera>().orthographicSize = Mathf.Min(GetComponent<Camera>().orthographicSize, 100f);

                transform.position -= transform.TransformDirection((newTouchPositions[0] + newTouchPositions[1] - screen) * GetComponent<Camera>().orthographicSize / screen.y);

				oldTouchPositions[0] = newTouchPositions[0];
				oldTouchPositions[1] = newTouchPositions[1];
				oldTouchVector = newTouchVector;
				oldTouchDistance = newTouchDistance;
			}
		}
	}
}