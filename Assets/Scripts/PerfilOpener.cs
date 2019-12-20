using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Networking;
using SimpleJSON;

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
        Datos[1].GetComponent<Text>().text = PlayerPrefs.GetString("pseudonimo", "undefined") + "\n" + PlayerPrefs.GetString("nombre_unidad", "UNIDAD_NOT_FOUND");
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void OpenProfile()
    {
        //Desactivar movimiento de camara.
        /*
        Aptitudes.isPanelOpen = true;
        MainCamera.GetComponent<TouchCamera>().enabled = false;
        PerfilCanvas.SetActive(true);
        */
        StartCoroutine(GetInsignias());
    }

    IEnumerator GetInsignias()
    {
        //LOADING
        WWWForm form = new WWWForm();
        form.AddField("unidad", PlayerPrefs.GetInt("unidad1", -1));

        UnityWebRequest www = UnityWebRequest.Post("http://www.mitra.cl/SS/GetInsignias.php", form);

        yield return www.SendWebRequest();

        if (www.isNetworkError || www.isHttpError)
        {
            Debug.Log("Error de conexion en PerfilOpener.cs Line 49");
            //Handle
            Debug.Log(www.error);
            yield break;
        }

        else
        {
            string respuesta = www.downloadHandler.text;
            var RespuestaJson = JSON.Parse(respuesta);
            Profile.PersonasInsignias = RespuestaJson;

            Debug.Log("PerfilOpenerResponse: " + RespuestaJson);

            Aptitudes.isPanelOpen = true;
            MainCamera.GetComponent<TouchCamera>().enabled = false;
            PerfilCanvas.SetActive(true);
            yield break;
        }
    }
}
