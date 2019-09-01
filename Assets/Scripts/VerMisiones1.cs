using System.Collections;
using System.Collections.Generic;
using UnityEngine;

using UnityEngine.Networking;
using UnityEngine.UI;
using SimpleJSON;
using System;
//using UnityEngine.SceneManagement;
//using System;

public class VerMisiones : MonoBehaviour
{
    //activador del panel
    public GameObject botonVerMision;

    //variables del panel
    public GameObject tituloMision1;//nombre de las misiones
    public GameObject tituloMision2;
    public GameObject tituloMision3;
    public GameObject tituloMision4;
    public GameObject tituloMision5;
    public GameObject tituloMision6;
    public GameObject descripcionMision1;//en caso de que deva buscarla o esperar calificacion
    public GameObject descripcionMision2;
    public GameObject descripcionMision3;
    public GameObject descripcionMision4;
    public GameObject descripcionMision5;
    public GameObject descripcionMision6;
    public GameObject imagenMision1;//imagenes de los puntajes
    public GameObject imagenMision2;
    public GameObject imagenMision3;
    public GameObject imagenMision4;
    public GameObject imagenMision5;
    public GameObject imagenMision6;
    public Text error;//en caso de no tener ninguna mision que mostrar
    public Sprite[] listaImagen;

    //variables internas
    //private string user;
    //private bool isPanelActive = false;

    // Start is called before the first frame update
    void Start()
    {
        //user = PlayerPrefs.GetString("user", "");
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void CallMisiones()
    {   //asignar esta función al botón que activa el panel
        StartCoroutine(Misiones());
        //debería abrir el panel 
    }

    IEnumerator Misiones()
    {
        WWWForm form = new WWWForm();
        form.AddField("name", PlayerPrefs.GetString("user", ""));

        UnityWebRequest www = UnityWebRequest.Post("http://www.mitra.cl/SS/GetVerMisiones.php", form);
        yield return www.SendWebRequest();

        //Si hay error de conexion de red, debugLog y esperar el cooldown de refresh.
        if (www.isNetworkError || www.isHttpError)
        {
            Debug.Log(www.error);
        }

        else//no hay errores y el Json tiene respestas
        {
            string respuesta = www.downloadHandler.text;
            Debug.Log("Respuesta del servidor: " + respuesta);

            var RespuestaJson = JSON.Parse(respuesta);

            //Caso respuesta -1 -> fallo en la conexion entre php y BD.
            if (RespuestaJson["response"] == -1)
            {
                Debug.Log("El script no se pudo conectar a la base de datos");
                //error.text = "Fallo en la conexión. Intente más tarde.";
                //yield break;
            }
            //caso respuesta 0 -> no hay misiones para mostrar
            else if(RespuestaJson["response"] == 0)
            {
                error.text = "Actualmente no posees cacerías para mostrar.";
            }            
            //caso respuesta 1 -> si hay misiones

            else if (RespuestaJson["response"] == 1)
            {
            	int num = RespuestaJson["columnas"];
            	String stri;
            	for (int i = 1; i <= num; i++){
	            	stri = num.ToString();   

                    if (RespuestaJson[stri]["estado"] == 0)
                    {
                        Text textonombreMision1;
                        Text textoDescripMision1;

                        textonombreMision1 = tituloMision1.GetComponent<Text>();
                        textoDescripMision1 = descripcionMision1.GetComponent<Text>();

                        textonombreMision1.text = "¡Nueva caceria!";
                        textoDescripMision1.text = "¡Busca en el mapa esta nueva caceria!";
                        //tituloMision1.SetActive(true);
                        //descripcionMision1.SetActive(true);
                    }
                    else if (RespuestaJson[stri]["estado"] == 1)
                    {
                        Text textonombreMision1;
                        Text textoDescripMision1;

                        textonombreMision1 = tituloMision1.GetComponent<Text>();
                        textoDescripMision1 = descripcionMision1.GetComponent<Text>();

                        textonombreMision1.text = RespuestaJson["1"]["nombre_mision"];
                        textoDescripMision1.text = "Caceria enviada para calificar.";
                        /*
                        tituloMision1.SetActive(true);
                        descripcionMision1.SetActive(true);*/
                    }
                    else if (RespuestaJson[stri]["estado"] == 2)
                    {
                        Text textonombreMision1;
                        textonombreMision1 = tituloMision1.GetComponent<Text>();
                        textonombreMision1.text = RespuestaJson[stri]["nombre_mision"];

                        Image fotoM1;
                        fotoM1 = imagenMision1.GetComponent<Image>();
                        fotoM1.sprite = listaImagen[RespuestaJson[stri]["puntaje"]];
                        imagenMision1.SetActive(true);
                        /*
                        tituloMision1.SetActive(true);
                        imagenMision1.SetActive(true);*/
                    }

                }

            }
			//fin de casos con filas en el Json
        }//fin del else (no hay errores con y hay respuesta en el Json)
    }//fin del IEnumerator Misiones()
}
