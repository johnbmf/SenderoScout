using System.Collections;
using System.Collections.Generic;
using UnityEngine;

using UnityEngine.Networking;
using UnityEngine.UI;
using SimpleJSON;
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
    {   //asignar esta función al botón que activa la mierda
        StartCoroutine(Misiones());
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

        else
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
            //caso respuesta 1 -> no hay misiones para mostrar
            else if(RespuestaJson["response"] == 0)
            {
                error.text = "Actualmente no posees cacerías para mostrar.";
            }
            //caso respuesta 1 -> si hay misiones
            else if (RespuestaJson["response"] == 1)
            {
                /*int col = RespuestaJson["columnas"];
                for (int i = 0; i<= col; i++)
                {

                }*/
                //caso de una sola fila
                if (RespuestaJson["columnas"] == 1)
                {
                    if (RespuestaJson["1"]["estado"] == 0)
                    {
                        /*
                         * Text textotitulomision; nuevo
                        Text textoInstruccionesMision; nuevo

                        textotitulomision = NombreMision.GetComponent<Text>(); nuevo =object
                        textoInstruccionesMision = InstruccionesMision.GetComponent<Text>(); nuevo = object

                        textotitulomision.text = RespuestaJson[nombreSpot]["nombre_mision"];
                        textoInstruccionesMision.text = RespuestaJson[nombreSpot]["descripcion_mision"];

                        Spot1_estado1.SetActive(false);
                        Spot1_estado2.SetActive(false);

                        Spot1_estado0.SetActive(true);
                         */
                        Text textonombreMision1;
                        Text textoDescripMision1;

                        textonombreMision1 = tituloMision1.GetComponent<Text>();
                        textoDescripMision1 = descripcionMision1.GetComponent<Text>();

                        textonombreMision1.text = "¡Nueva caceria!";
                        textoDescripMision1.text = "¡Busca en el mapa esta nueva caceria!";

                        //tituloMision1.text = "¡Nueva caceria!";
                        //descripcionMision1.text = "¡Busca en el mapa esta nueva caceria!";
                        //tituloMision1.SetActive(true);
                        //descripcionMision1.SetActive(true);
                    }
                    else if (RespuestaJson["1"]["estado"] == 1)
                    {
                        Text textonombreMision1;
                        Text textoDescripMision1;

                        textonombreMision1 = tituloMision1.GetComponent<Text>();
                        textoDescripMision1 = descripcionMision1.GetComponent<Text>();

                        textonombreMision1.text = RespuestaJson["1"]["nombre_mision"];
                        textoDescripMision1.text = "Caceria enviada para calificar.";
                        /*
                        tituloMision1.Text = RespuestaJson["1"]["nombre_mision"];
                        descripcionMision1.Text = "Caceria enviada para calificar";
                        tituloMision1.SetActive(true);
                        descripcionMision1.SetActive(true);*/
                    }
                    else if (RespuestaJson["1"]["estado"] == 2)
                    {
                        Text textonombreMision1;
                        textonombreMision1 = tituloMision1.GetComponent<Text>();
                        textonombreMision1.text = RespuestaJson["1"]["nombre_mision"];

                        Image fotoM1;
                        fotoM1 = imagenMision1.GetComponent<Image>();
                        fotoM1.sprite = listaImagen[RespuestaJson["1"]["puntaje"]];
                        //falta arreglar lo de la foto
                        /*
                        tituloMision1.Text = RespuestaJson["1"]["nombre_mision"];
                        imagenMision1.sprite = listaImagen[RespuestaJson["1"]["puntaje"]];
                        tituloMision1.SetActive(true);
                        imagenMision1.SetActive(true);*/
                    }

                }

                //caso 2 filas
                else if (RespuestaJson["columnas"] == 2)
                {   //primera fila
                    if (RespuestaJson["1"]["estado"] == 0)
                    {
                        Text textonombreMision1;
                        Text textoDescripMision1;

                        textonombreMision1 = tituloMision1.GetComponent<Text>();
                        textoDescripMision1 = descripcionMision1.GetComponent<Text>();

                        textonombreMision1.text = "¡Nueva caceria!";
                        textoDescripMision1.text = "¡Busca en el mapa esta nueva caceria!";
                    }
                    else if (RespuestaJson["1"]["estado"] == 1)
                    {
                        Text textonombreMision1;
                        Text textoDescripMision1;

                        textonombreMision1 = tituloMision1.GetComponent<Text>();
                        textoDescripMision1 = descripcionMision1.GetComponent<Text>();

                        textonombreMision1.text = RespuestaJson["1"]["nombre_mision"];
                        textoDescripMision1.text = "Caceria enviada para calificar.";
                    }
                    else if (RespuestaJson["1"]["estado"] == 2)
                    {
                        Text textonombreMision1;
                        textonombreMision1 = tituloMision1.GetComponent<Text>();
                        textonombreMision1.text = RespuestaJson["1"]["nombre_mision"];
                        Image fotoM1;
                        fotoM1 = imagenMision1.GetComponent<Image>();
                        fotoM1.sprite = listaImagen[RespuestaJson["1"]["puntaje"]];
                        //falta arreglar lo de la foto
                    }
                    //segunda fila
                    if (RespuestaJson["2"]["estado"] == 0)
                    {
                        Text textonombreMision2;
                        Text textoDescripMision2;

                        textonombreMision2 = tituloMision2.GetComponent<Text>();
                        textoDescripMision2 = descripcionMision2.GetComponent<Text>();

                        textonombreMision2.text = "¡Nueva caceria!";
                        textoDescripMision2.text = "¡Busca en el mapa esta nueva caceria!";
                    }
                    else if (RespuestaJson["2"]["estado"] == 1)
                    {
                        Text textonombreMision2;
                        Text textoDescripMision2;

                        textonombreMision2 = tituloMision2.GetComponent<Text>();
                        textoDescripMision2 = descripcionMision2.GetComponent<Text>();

                        textonombreMision2.text = RespuestaJson["2"]["nombre_mision"];
                        textoDescripMision2.text = "Caceria enviada para calificar.";
                    }
                    else if (RespuestaJson["2"]["estado"] == 2)
                    {
                        Text textonombreMision2;
                        textonombreMision2 = tituloMision2.GetComponent<Text>();
                        textonombreMision2.text = RespuestaJson["2"]["nombre_mision"];

                        Image fotoM2;
                        fotoM2 = imagenMision2.GetComponent<Image>();
                        fotoM2.sprite = listaImagen[RespuestaJson["2"]["puntaje"]];
                        //falta arreglar lo de la foto
                    }
                }

                //caso 3 filas
                else if (RespuestaJson["columnas"] == 3)
                {
                    //primera fila
                    if (RespuestaJson["1"]["estado"] == 0)
                    {
                        Text textonombreMision1;
                        Text textoDescripMision1;

                        textonombreMision1 = tituloMision1.GetComponent<Text>();
                        textoDescripMision1 = descripcionMision1.GetComponent<Text>();

                        textonombreMision1.text = "¡Nueva caceria!";
                        textoDescripMision1.text = "¡Busca en el mapa esta nueva caceria!";
                    }
                    else if (RespuestaJson["1"]["estado"] == 1)
                    {
                        Text textonombreMision1;
                        Text textoDescripMision1;

                        textonombreMision1 = tituloMision1.GetComponent<Text>();
                        textoDescripMision1 = descripcionMision1.GetComponent<Text>();

                        textonombreMision1.text = RespuestaJson["1"]["nombre_mision"];
                        textoDescripMision1.text = "Caceria enviada para calificar.";
                    }
                    else if (RespuestaJson["1"]["estado"] == 2)
                    {
                        Text textonombreMision1;
                        textonombreMision1 = tituloMision1.GetComponent<Text>();
                        textonombreMision1.text = RespuestaJson["1"]["nombre_mision"];

                        Image fotoM1;
                        fotoM1 = imagenMision1.GetComponent<Image>();
                        fotoM1.sprite = listaImagen[RespuestaJson["1"]["puntaje"]];
                        //falta arreglar lo de la foto
                    }
                    //segunda fila
                    if (RespuestaJson["2"]["estado"] == 0)
                    {
                        Text textonombreMision2;
                        Text textoDescripMision2;

                        textonombreMision2 = tituloMision2.GetComponent<Text>();
                        textoDescripMision2 = descripcionMision2.GetComponent<Text>();

                        textonombreMision2.text = "¡Nueva caceria!";
                        textoDescripMision2.text = "¡Busca en el mapa esta nueva caceria!";
                    }
                    else if (RespuestaJson["2"]["estado"] == 1)
                    {
                        Text textonombreMision2;
                        Text textoDescripMision2;

                        textonombreMision2 = tituloMision2.GetComponent<Text>();
                        textoDescripMision2 = descripcionMision2.GetComponent<Text>();

                        textonombreMision2.text = RespuestaJson["2"]["nombre_mision"];
                        textoDescripMision2.text = "Caceria enviada para calificar.";
                    }
                    else if (RespuestaJson["2"]["estado"] == 2)
                    {
                        Text textonombreMision2;
                        textonombreMision2 = tituloMision2.GetComponent<Text>();
                        textonombreMision2.text = RespuestaJson["2"]["nombre_mision"];

                        Image fotoM2;
                        fotoM2 = imagenMision2.GetComponent<Image>();
                        fotoM2.sprite = listaImagen[RespuestaJson["2"]["puntaje"]];
                        //falta arreglar lo de la foto
                    }
                    //tercera fila
                    if (RespuestaJson["3"]["estado"] == 0)
                    {
                        Text textonombreMision3;
                        Text textoDescripMision3;

                        textonombreMision3 = tituloMision3.GetComponent<Text>();
                        textoDescripMision3 = descripcionMision3.GetComponent<Text>();

                        textonombreMision3.text = "¡Nueva caceria!";
                        textoDescripMision3.text = "¡Busca en el mapa esta nueva caceria!";
                    }
                    else if (RespuestaJson["3"]["estado"] == 1)
                    {
                        Text textonombreMision3;
                        Text textoDescripMision3;

                        textonombreMision3 = tituloMision3.GetComponent<Text>();
                        textoDescripMision3 = descripcionMision3.GetComponent<Text>();

                        textonombreMision3.text = RespuestaJson["3"]["nombre_mision"];
                        textoDescripMision3.text = "Caceria enviada para calificar.";
                    }
                    else if (RespuestaJson["3"]["estado"] == 2)
                    {
                        Text textonombreMision3;
                        textonombreMision3 = tituloMision3.GetComponent<Text>();
                        textonombreMision3.text = RespuestaJson["3"]["nombre_mision"];

                        Image fotoM3;
                        fotoM3 = imagenMision3.GetComponent<Image>();
                        fotoM3.sprite = listaImagen[RespuestaJson["3"]["puntaje"]];
                        //falta arreglar lo de la foto
                    }
                }



            }

        }
    }
}
