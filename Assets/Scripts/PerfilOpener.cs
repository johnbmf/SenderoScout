using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class PerfilOpener : MonoBehaviour
{
    public GameObject[] Datos;
    public Sprite[] Avatares;
    public GameObject PerfilCanvas;
    public GameObject MainCamera;
    // Start is called before the first frame update
    void Start()
    {
        //Set avatar
        Datos[0].GetComponent<Image>().sprite = Avatares[PlayerPrefs.GetInt("avatar", 0)];
        //Set pseudonimo + unidad
        Datos[1].GetComponent<Text>().text = PlayerPrefs.GetString("pseudonimo", "undefined") + "\n" + PlayerPrefs.GetString("unidad1", "undefined");
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void OpenProfile()
    {
        //Desactivar movimiento de camara.
        Aptitudes.isPanelOpen = true;
        MainCamera.GetComponent<TouchCamera>().enabled = false;
        PerfilCanvas.SetActive(true);
    }
}
