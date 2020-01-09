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

    //Variables cambio de color insignia
    public GameObject[] BotonesInsignia;
    public Sprite[] InsigniasColor;

    public GameObject[] Loading;

    // Start is called before the first frame update
    void Start()
    {
        //Set avatar
        Datos[0].GetComponent<Image>().sprite = Avatares[PlayerPrefs.GetInt(PlayerPrefs.GetString("user", "USER_NOT_FOUND") + "avatar", 0)];
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
        Loading[0].SetActive(true);
        Loading[1].SetActive(true);

        WWWForm form = new WWWForm();
        form.AddField("unidad", PlayerPrefs.GetInt("unidad1", -1));

        UnityWebRequest www = UnityWebRequest.Post("http://www.mitra.cl/SS/GetInsignias.php", form);

        yield return www.SendWebRequest();

        if (www.isNetworkError || www.isHttpError)
        {
            Debug.Log("Error de conexion en PerfilOpener.cs Line 49");
            //Handle
            Debug.Log(www.error);
            Loading[0].SetActive(false);
            Loading[1].SetActive(false);
            yield break;
        }

        else
        {
            string respuesta = www.downloadHandler.text;
            var RespuestaJson = JSON.Parse(respuesta);
            Profile.PersonasInsignias = RespuestaJson;

            Debug.Log("PerfilOpenerResponse: " + RespuestaJson);

            //Cambio de color de cada insignia en caso de obtenerla.
            for (int i = 1; i <= 15; i++) {
                foreach (JSONNode node in RespuestaJson[i.ToString()])
                {
                    string nombreInLista = (string)node.ToString().Replace("\"", string.Empty);
                    if (nombreInLista == PlayerPrefs.GetString("user", "USER_NOT_FOUND"))
                    {
                        BotonesInsignia[i-1].GetComponent<Image>().sprite = InsigniasColor[i-1];
                    }
                }
            }
            
            Aptitudes.isPanelOpen = true;
            MainCamera.GetComponent<TouchCamera>().enabled = false;
            PerfilCanvas.SetActive(true);
            Loading[0].SetActive(false);
            Loading[1].SetActive(false);
            yield break;
        }
    }
}
