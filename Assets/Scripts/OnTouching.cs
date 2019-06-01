using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class OnTouching : MonoBehaviour
{
    public GameObject DetalleMisionCanvas;
    public GameObject BotonSonido;
    public GameObject MainCamera;

    public Sprite SoundOn;
    public Sprite SoundOff;

    public bool activeSound;
    public bool isInFront = true;

    public void OnMouseDown()
    {
        if (isInFront)
        {
            MainCamera.GetComponent<TouchCamera>().enabled = false;
            DetalleMisionCanvas.SetActive(!DetalleMisionCanvas.activeSelf);
            isInFront = false;
        }
    }

    public void HideMissionDetails()
    {
        DetalleMisionCanvas.SetActive(!DetalleMisionCanvas.activeSelf);
        isInFront = true;
        MainCamera.GetComponent<TouchCamera>().enabled = true;
    }

    public void ToggleMusic()
    {
        if (activeSound)
        {
            activeSound = !activeSound;
            BotonSonido.GetComponent<Image>().sprite = SoundOff;
        }

        else
        {
            activeSound = !activeSound;
            BotonSonido.GetComponent<Image>().sprite = SoundOn;
        }
    }

}