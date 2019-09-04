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

    //Jony variables
    public GameObject Panel;
    public GameObject PanelOverlay;
    public GameObject Loading;

    //variables del panel
    public GameObject canvasMision;
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
        PanelOverlay.SetActive(true);
        Loading.SetActive(true);
        StartCoroutine(Misiones());       
    }

    public void CerrarCanvas()
    {
        StartCoroutine(HidePanel());
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
                Debug.Log("filas de la query");
                Debug.Log(RespuestaJson);
                //caso de una sola fila
                if (RespuestaJson["columnas"] == 1)
                {   //primera fila
                    if (RespuestaJson["1"]["estado"] == 0)
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
                    else if (RespuestaJson["1"]["estado"] == 1)
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
                    else if (RespuestaJson["1"]["estado"] == 2)
                    {
                        Text textonombreMision1;
                        textonombreMision1 = tituloMision1.GetComponent<Text>();
                        textonombreMision1.text = RespuestaJson["1"]["nombre_mision"];

                        Image fotoM1;
                        fotoM1 = imagenMision1.GetComponent<Image>();
                        fotoM1.sprite = listaImagen[RespuestaJson["1"]["puntaje"]];
                        imagenMision1.SetActive(true);
                        /*
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

                        imagenMision1.SetActive(true);
                        //falta arreglar lo de la foto (activar)
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

                        imagenMision2.SetActive(true);
                        //falta arreglar lo de la foto (activar)
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

                        imagenMision1.SetActive(true);
                        //falta arreglar lo de la foto (activar)
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

                        imagenMision2.SetActive(true);
                        //falta arreglar lo de la foto (activar)
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

                        imagenMision3.SetActive(true);
                        //falta arreglar lo de la foto (activar)
                    }
                }
                //caso 4 filas
                else if (RespuestaJson["columnas"] == 4)
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
                        imagenMision1.SetActive(true);

                        //falta arreglar lo de la foto (activar)
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

                        imagenMision2.SetActive(true);
                        //falta arreglar lo de la foto (activar)
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

                        imagenMision3.SetActive(true);
                        //falta arreglar lo de la foto (activar)
                    }
                    //cuarta fila
                    if (RespuestaJson["4"]["estado"] == 0)
                    {
                        Text textonombreMision4;
                        Text textoDescripMision4;

                        textonombreMision4 = tituloMision4.GetComponent<Text>();
                        textoDescripMision4 = descripcionMision4.GetComponent<Text>();

                        textonombreMision4.text = "¡Nueva caceria!";
                        textoDescripMision4.text = "¡Busca en el mapa esta nueva caceria!";
                    }
                    else if (RespuestaJson["4"]["estado"] == 1)
                    {
                        Text textonombreMision4;
                        Text textoDescripMision4;

                        textonombreMision4 = tituloMision4.GetComponent<Text>();
                        textoDescripMision4 = descripcionMision4.GetComponent<Text>();

                        textonombreMision4.text = RespuestaJson["4"]["nombre_mision"];
                        textoDescripMision4.text = "Caceria enviada para calificar.";
                    }
                    else if (RespuestaJson["4"]["estado"] == 2)
                    {
                        Text textonombreMision4;
                        textonombreMision4 = tituloMision4.GetComponent<Text>();
                        textonombreMision4.text = RespuestaJson["4"]["nombre_mision"];

                        Image fotoM4;
                        fotoM4 = imagenMision4.GetComponent<Image>();
                        fotoM4.sprite = listaImagen[RespuestaJson["4"]["puntaje"]];

                        imagenMision4.SetActive(true);
                        //falta arreglar lo de la foto (activar)
                    }
                }
                //caso 5 filas
                else if(RespuestaJson["columnas"] == 5)
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

                        imagenMision1.SetActive(true);
                        //falta arreglar lo de la foto (activar)
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

                        imagenMision2.SetActive(true);
                        //falta arreglar lo de la foto (activar)
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

                        imagenMision3.SetActive(true);
                        //falta arreglar lo de la foto (activar)
                    }
                    //cuarta fila
                    if (RespuestaJson["4"]["estado"] == 0)
                    {
                        Text textonombreMision4;
                        Text textoDescripMision4;

                        textonombreMision4 = tituloMision4.GetComponent<Text>();
                        textoDescripMision4 = descripcionMision4.GetComponent<Text>();

                        textonombreMision4.text = "¡Nueva caceria!";
                        textoDescripMision4.text = "¡Busca en el mapa esta nueva caceria!";
                    }
                    else if (RespuestaJson["4"]["estado"] == 1)
                    {
                        Text textonombreMision4;
                        Text textoDescripMision4;

                        textonombreMision4 = tituloMision4.GetComponent<Text>();
                        textoDescripMision4 = descripcionMision4.GetComponent<Text>();

                        textonombreMision4.text = RespuestaJson["4"]["nombre_mision"];
                        textoDescripMision4.text = "Caceria enviada para calificar.";
                    }
                    else if (RespuestaJson["4"]["estado"] == 2)
                    {
                        Text textonombreMision4;
                        textonombreMision4 = tituloMision4.GetComponent<Text>();
                        textonombreMision4.text = RespuestaJson["4"]["nombre_mision"];

                        Image fotoM4;
                        fotoM4 = imagenMision4.GetComponent<Image>();
                        fotoM4.sprite = listaImagen[RespuestaJson["4"]["puntaje"]];

                        imagenMision4.SetActive(true);
                        //falta arreglar lo de la foto (activar)
                    }
                    //quinta fila
                    if (RespuestaJson["5"]["estado"] == 0)
                    {
                        Text textonombreMision5;
                        Text textoDescripMision5;

                        textonombreMision5 = tituloMision5.GetComponent<Text>();
                        textoDescripMision5 = descripcionMision5.GetComponent<Text>();

                        textonombreMision5.text = "¡Nueva caceria!";
                        textoDescripMision5.text = "¡Busca en el mapa esta nueva caceria!";
                    }
                    else if (RespuestaJson["5"]["estado"] == 1)
                    {
                        Text textonombreMision5;
                        Text textoDescripMision5;

                        textonombreMision5 = tituloMision5.GetComponent<Text>();
                        textoDescripMision5 = descripcionMision5.GetComponent<Text>();

                        textonombreMision5.text = RespuestaJson["5"]["nombre_mision"];
                        textoDescripMision5.text = "Caceria enviada para calificar.";
                    }
                    else if (RespuestaJson["5"]["estado"] == 2)
                    {
                        Text textonombreMision5;
                        textonombreMision5 = tituloMision5.GetComponent<Text>();
                        textonombreMision5.text = RespuestaJson["5"]["nombre_mision"];

                        Image fotoM5;
                        fotoM5 = imagenMision5.GetComponent<Image>();
                        fotoM5.sprite = listaImagen[RespuestaJson["5"]["puntaje"]];

                        imagenMision5.SetActive(true);
                        //falta arreglar lo de la foto (activar)
                    }
                }
                //caso 6 filas *******de momento alcanzan 6 misiones en el panel
                else if(RespuestaJson["columnas"] >= 6)
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

                        imagenMision1.SetActive(true);
                        //falta arreglar lo de la foto (activar)
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

                        imagenMision2.SetActive(true);
                        //falta arreglar lo de la foto (activar)
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

                        imagenMision3.SetActive(true);
                        //falta arreglar lo de la foto (activar)
                    }
                    //cuarta fila
                    if (RespuestaJson["4"]["estado"] == 0)
                    {
                        Text textonombreMision4;
                        Text textoDescripMision4;

                        textonombreMision4 = tituloMision4.GetComponent<Text>();
                        textoDescripMision4 = descripcionMision4.GetComponent<Text>();

                        textonombreMision4.text = "¡Nueva caceria!";
                        textoDescripMision4.text = "¡Busca en el mapa esta nueva caceria!";
                    }
                    else if (RespuestaJson["4"]["estado"] == 1)
                    {
                        Text textonombreMision4;
                        Text textoDescripMision4;

                        textonombreMision4 = tituloMision4.GetComponent<Text>();
                        textoDescripMision4 = descripcionMision4.GetComponent<Text>();

                        textonombreMision4.text = RespuestaJson["4"]["nombre_mision"];
                        textoDescripMision4.text = "Caceria enviada para calificar.";
                    }
                    else if (RespuestaJson["4"]["estado"] == 2)
                    {
                        Text textonombreMision4;
                        textonombreMision4 = tituloMision4.GetComponent<Text>();
                        textonombreMision4.text = RespuestaJson["4"]["nombre_mision"];

                        Image fotoM4;
                        fotoM4 = imagenMision4.GetComponent<Image>();
                        fotoM4.sprite = listaImagen[RespuestaJson["4"]["puntaje"]];

                        imagenMision4.SetActive(true);
                        //falta arreglar lo de la foto (activar)
                    }
                    //quinta fila
                    if (RespuestaJson["5"]["estado"] == 0)
                    {
                        Text textonombreMision5;
                        Text textoDescripMision5;

                        textonombreMision5 = tituloMision5.GetComponent<Text>();
                        textoDescripMision5 = descripcionMision5.GetComponent<Text>();

                        textonombreMision5.text = "¡Nueva caceria!";
                        textoDescripMision5.text = "¡Busca en el mapa esta nueva caceria!";
                    }
                    else if (RespuestaJson["5"]["estado"] == 1)
                    {
                        Text textonombreMision5;
                        Text textoDescripMision5;

                        textonombreMision5 = tituloMision5.GetComponent<Text>();
                        textoDescripMision5 = descripcionMision5.GetComponent<Text>();

                        textonombreMision5.text = RespuestaJson["5"]["nombre_mision"];
                        textoDescripMision5.text = "Caceria enviada para calificar.";
                    }
                    else if (RespuestaJson["5"]["estado"] == 2)
                    {
                        Text textonombreMision5;
                        textonombreMision5 = tituloMision5.GetComponent<Text>();
                        textonombreMision5.text = RespuestaJson["5"]["nombre_mision"];

                        Image fotoM5;
                        fotoM5 = imagenMision5.GetComponent<Image>();
                        fotoM5.sprite = listaImagen[RespuestaJson["5"]["puntaje"]];

                        imagenMision5.SetActive(true);
                        //falta arreglar lo de la foto (activar)
                    }
                    //sexta fila
                    if (RespuestaJson["6"]["estado"] == 0)
                    {
                        Text textonombreMision6;
                        Text textoDescripMision6;

                        textonombreMision6 = tituloMision6.GetComponent<Text>();
                        textoDescripMision6 = descripcionMision6.GetComponent<Text>();

                        textonombreMision6.text = "¡Nueva caceria!";
                        textoDescripMision6.text = "¡Busca en el mapa esta nueva caceria!";
                    }
                    else if (RespuestaJson["6"]["estado"] == 1)
                    {
                        Text textonombreMision6;
                        Text textoDescripMision6;

                        textonombreMision6 = tituloMision6.GetComponent<Text>();
                        textoDescripMision6 = descripcionMision6.GetComponent<Text>();

                        textonombreMision6.text = RespuestaJson["6"]["nombre_mision"];
                        textoDescripMision6.text = "Caceria enviada para calificar.";
                    }
                    else if (RespuestaJson["6"]["estado"] == 2)
                    {
                        Text textonombreMision6;
                        textonombreMision6 = tituloMision6.GetComponent<Text>();
                        textonombreMision6.text = RespuestaJson["6"]["nombre_mision"];

                        Image fotoM6;
                        fotoM6 = imagenMision6.GetComponent<Image>();
                        fotoM6.sprite = listaImagen[RespuestaJson["6"]["puntaje"]];

                        imagenMision6.SetActive(true);
                        //falta arreglar lo de la foto (activar)
                    }
                }
            }//fin de casos con filas en el Json
            Loading.SetActive(false);
            canvasMision.SetActive(true);
            StartCoroutine(MovePanel());
        }//fin del else (no hay errores con y hay respuesta en el Json)
    }//fin del IEnumerator Misiones()

    IEnumerator MovePanel()
    {
        PanelOverlay.SetActive(true);
        //Posiciones inicial y final del panel.
        Vector3 PanelMisionPosShow = new Vector2(0, 0);
        Vector3 PanelMisionPosHide = new Vector2(0, -2160);

        //el divisor de rateTiempo indica el tiempo que toma en aparecer el panel completamente.
        float t = 0.0f;
        float rateTiempo = 1f / 0.2f;

        //Mientras la posicion del panel no sea la correcta (y=0), hay que seguirlo moviendo.
        while (t < 1f)
        {
            t += Time.deltaTime * rateTiempo;
            Panel.GetComponent<RectTransform>().offsetMin = Vector2.Lerp(PanelMisionPosHide, PanelMisionPosShow, t);
            //Esperamos al next frame para seguir moviendo.
            yield return null;
        }

        t = 0.0f;
        yield break;
    }

    IEnumerator HidePanel()
    {
        //Posiciones inicial y final del panel.
        Vector3 PanelMisionPosShow = new Vector2(0, 0);
        Vector3 PanelMisionPosHide = new Vector2(0, -2160);

        //el divisor de rateTiempo indica el tiempo que toma en aparecer el panel completamente.
        float t = 0.0f;
        float rateTiempo = 1f / 0.2f;

        while (t < 1f)
        {
            t += Time.deltaTime * rateTiempo;
            Panel.GetComponent<RectTransform>().offsetMin = Vector2.Lerp(PanelMisionPosShow, PanelMisionPosHide, t);
            //Esperamos al next frame para seguir moviendo.
            yield return null;
        }

        t = 0.0f;
        

        //HAY QUE SETACTIVA FALSE TODOS LOS GAMEOBJECTS QUE NO SEAN ESTATICOS.
        canvasMision.SetActive(false);
        PanelOverlay.SetActive(false);

        yield break;
    }
}
