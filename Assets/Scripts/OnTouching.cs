using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class OnTouching : MonoBehaviour
{
    public GameObject DetalleMisionCanvas;
    public GameObject MainCamera;
    public GameObject PanelMision;

    public bool isInFront = true;

    //Variables para movimiento del panel de mision
    private Vector3 PanelMisionPosShow = new Vector2(0, 0);
    private Vector3 PanelMisionPosHide = new Vector2(0, -2000);
    private float t = 0.0f;
    private float rateTiempo = 1f / 0.2f;

    public void OnMouseDown()
    {
        if (isInFront)
        {
            MainCamera.GetComponent<TouchCamera>().enabled = false;
            DetalleMisionCanvas.SetActive(!DetalleMisionCanvas.activeSelf);
            isInFront = false;
            StartCoroutine(ShowMissionPanel());
        }
    }

    public void HideMissionDetails()
    {
        StartCoroutine(HideMissionPanel());       
    }

    IEnumerator ShowMissionPanel()
    {   
        //Mientras la posicion del panel no sea la correcta (y=0), hay que seguirlo moviendo.
        while (t < 1f)
        {
            t += Time.deltaTime * rateTiempo;
            PanelMision.GetComponent<RectTransform>().offsetMin = Vector2.Lerp(PanelMisionPosHide, PanelMisionPosShow, t);           
            //Esperamos al next frame para seguir moviendo.
            yield return null;
        }

        t = 0.0f;
        yield return null;
    }

    IEnumerator HideMissionPanel()
    {
        //Mientras la posicion del panel no sea la correcta, hay que seguirlo moviendo.
        while (t < 1f)
        {
            t += Time.deltaTime * rateTiempo;
            PanelMision.GetComponent<RectTransform>().offsetMin = Vector2.Lerp(PanelMisionPosShow, PanelMisionPosHide, t);
            //Esperamos al next frame para seguir moviendo.
            yield return null;
        }

        t = 0.0f;
        DetalleMisionCanvas.SetActive(!DetalleMisionCanvas.activeSelf);
        isInFront = true;
        MainCamera.GetComponent<TouchCamera>().enabled = true;
        yield return null;
    }

}