using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class OnTouching : MonoBehaviour
{
    public GameObject DetalleMisionCanvas;
    public bool isInFront = true;

    public void OnMouseDown()
    {
        if (isInFront) {
            DetalleMisionCanvas.SetActive(!DetalleMisionCanvas.activeSelf);
            isInFront = false;
        }
    }

    public void HideMissionDetails() {
        DetalleMisionCanvas.SetActive(!DetalleMisionCanvas.activeSelf);
        isInFront = true;
    }
        
}
