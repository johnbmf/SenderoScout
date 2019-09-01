using SimpleJSON;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.UI;

public class Ranking : MonoBehaviour
{
    public GameObject RankingCanvas;
    public GameObject LoadingCanvas;
    public GameObject[] Banners;
    public GameObject[] Puntos;
    public GameObject[] Avatar;
    public GameObject[] Pseudonimo;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void AbrirRanking()
    {
        //Activar Loading...
        LoadingCanvas.SetActive(true);
        //Mientras se ejecuta la coroutine.
        StartCoroutine(OpenRanking());
    }

    IEnumerator OpenRanking()
    {
        WWWForm form = new WWWForm();
        Debug.Log("Enviando " + PlayerPrefs.GetInt("unidad1", 0) + " al server");
        form.AddField("unidad", PlayerPrefs.GetInt("unidad1", 0));

        UnityWebRequest www = UnityWebRequest.Post("http://www.mitra.cl/SS/getRanking.php", form);
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
            int numRows = RespuestaJson["num_rows"];

            //Respuesta de que el script no se puede conectar a la BD.
            if (numRows == -1)
            {
                Debug.Log("El script no se pudo conectar a la base de datos");
            }

            //Respuesta de que no hay nadie en el ranking. ¿Creo que es imposible en una bd integra? Just4Catch.
            else if (numRows == 0)
            {
                Debug.Log("No se han encontrado misiones para el jugador actual.");
            }

            //Respuesta con el ranking.
            else if (numRows > 0)
            {
                Debug.Log("Hay " + numRows + " personas en el ranking.");

                //Casos de los 3 primeros lugares.
                for (int i = 1; i <= 3; i++)
                {
                    //Ranking 1,2 o 3. Cuando si existe alguien.
                    if (RespuestaJson[i.ToString()] != null)
                    {
                        //Setear el pseudonimo y los puntos.
                        Pseudonimo[i - 1].GetComponent<Text>().text = RespuestaJson[i.ToString()]["pseudonimo"];
                        Puntos[i - 1].GetComponent<Text>().text = RespuestaJson[i.ToString()]["puntos"];

                        //Activar los gameobjects
                        Banners[i - 1].SetActive(true);
                        Puntos[i - 1].SetActive(true);
                        Avatar[i - 1].SetActive(true);
                        Pseudonimo[i - 1].SetActive(true);
                    }

                    //Ranking 1,2 o 3. Cuando no existe alguien en una de esas pos -> poner solo el banner.
                    else
                    {
                        Banners[i - 1].SetActive(true);
                    }
                }

                //Casos de los lugares 4,5,6.
                for (int i = 4; i <= 6; i++)
                {
                    //Solo si existe gente en estos puestos se dibujara el gameobject.
                    if (RespuestaJson[i.ToString()] != null)
                    {
                        //Set pseudonimo y puntos.
                        Pseudonimo[i - 1].GetComponent<Text>().text = RespuestaJson[i.ToString()]["pseudonimo"];
                        Puntos[i - 1].GetComponent<Text>().text = RespuestaJson[i.ToString()]["puntos"];

                        //Activar los gameobjects
                        Banners[i - 1].SetActive(true);
                        Puntos[i - 1].SetActive(true);
                        Pseudonimo[i - 1].SetActive(true);
                    }
                }
                //Despues de seteados todos los gameobjects -> Mostrar el panel.
                LoadingCanvas.SetActive(false);
                RankingCanvas.SetActive(true);
            }
        }
        yield break;
    }

    public void CerrarRanking()
    {
        StartCoroutine(CloseRanking());
    }

    IEnumerator CloseRanking()
    {
        //Desactivar todos los gameobjects.
        for (int i = 0; i < 6; i++)
        {
            if (i < 3)
            {
                Avatar[i].SetActive(false);
            }

            Banners[i].SetActive(false);
            Pseudonimo[i].SetActive(false);
            Puntos[i].SetActive(false);
        }

        //Desactivar el canvas.
        RankingCanvas.SetActive(false);
        yield break;
    }


//Terminal de clase.
}
