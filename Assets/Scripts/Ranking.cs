using SimpleJSON;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.UI;

public class Ranking : MonoBehaviour
{
    public GameObject MainCamera;
    public GameObject RankingCanvas;
    public GameObject Panel;
    public GameObject PanelOverlay;
    public GameObject Loading;
    public GameObject[] Banners;
    public GameObject[] Puntos;
    public GameObject[] Avatar;
    public GameObject[] Pseudonimo;
    public GameObject[] Pos;
    public GameObject ErrorText;

    public GameObject PuntajeVisible;

    private WaitForSeconds UpdateCooldown = new WaitForSeconds(15.0f);

    // Start is called before the first frame update
    void Start()
    {
        PuntajeVisible.GetComponent<Text>().text = PlayerPrefs.GetInt("puntos").ToString();
        StartCoroutine(RefreshPatitas());  
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void AbrirRanking()
    {
        //Activar Loading...
        PanelOverlay.SetActive(true);
        Loading.SetActive(true);

        //Desactivar movimiento de camara.
        MainCamera.GetComponent<TouchCamera>().enabled = false;

        //Mientras se ejecuta la coroutine.
        StartCoroutine(OpenRanking());
    }

    IEnumerator OpenRanking()
    {
        bool UserInRank = false;
        WWWForm form = new WWWForm();
        Debug.Log("Enviando " + PlayerPrefs.GetInt("unidad1", 0) + " al server");
        form.AddField("unidad", PlayerPrefs.GetInt("unidad1", 0));
        form.AddField("user", PlayerPrefs.GetString("user", ""));

        UnityWebRequest www = UnityWebRequest.Post("http://www.mitra.cl/SS/getRanking.php", form);
        yield return www.SendWebRequest();

        if (www.isNetworkError || www.isHttpError)
        {
            Debug.Log(www.error);
            Loading.SetActive(false);
            ErrorText.GetComponent<Text>().text = "Lo sentimos, no se pudo obtener el ranking en este momento. Comprueba tu conexión a internet.";
            ErrorText.SetActive(true);
            RankingCanvas.SetActive(true);
            StartCoroutine(MovePanel());
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
                Loading.SetActive(false);
                ErrorText.GetComponent<Text>().text = "Lo sentimos, no se pudo obtener el ranking en este momento. Inténtalo más tarde.";
                ErrorText.SetActive(true);
                RankingCanvas.SetActive(true);
                StartCoroutine(MovePanel());
            }

            //Respuesta de que no hay nadie en el ranking. ¿Creo que es imposible en una bd integra? Just4Catch.
            else if (numRows == 0)
            {
                Debug.Log("No se han encontrado misiones para el jugador actual.");
                Loading.SetActive(false);
                ErrorText.GetComponent<Text>().text = "Lo sentimos, no se pudo obtener el ranking en este momento. Inténtalo más tarde.";
                ErrorText.SetActive(true);
                RankingCanvas.SetActive(true);
                StartCoroutine(MovePanel());
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

                        //Si el user esta en estos lugares, seter true
                        if (RespuestaJson[i.ToString()]["pseudonimo"] == PlayerPrefs.GetString("pseudonimo", "NOUSARESTEPSEUDONIMO"))
                        {
                            UserInRank = true;
                        }
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
                        Puntos[i - 1].SetActive(true);
                        Pseudonimo[i - 1].SetActive(true);
                        Pos[i - 4].SetActive(true);

                        //Si el user esta en estos lugares, seter true
                        if (RespuestaJson[i.ToString()]["pseudonimo"] == PlayerPrefs.GetString("pseudonimo", "NOUSARESTEPSEUDONIMO"))
                        {
                            UserInRank = true;
                        }
                    }
                }

                //En caso de que no haya estado el user actual en el ranking, poner en ultimo lugar.
                if (!UserInRank)
                {
                    Pos.Last().GetComponent<Text>().text = "U";
                    Pseudonimo.Last().GetComponent<Text>().text = RespuestaJson["player"]["pseudonimo"];
                    Puntos.Last().GetComponent<Text>().text = RespuestaJson["player"]["puntos"];
                }
                //Despues de seteados todos los gameobjects -> Mostrar el panel.
                Loading.SetActive(false);
                RankingCanvas.SetActive(true);
                StartCoroutine(MovePanel());
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
        yield return StartCoroutine(HidePanel());
        //Desactivar todos los gameobjects.
        for (int i = 0; i < 6; i++)
        {
            if (i < 3)
            {
                Avatar[i].SetActive(false);
                Banners[i].SetActive(false);
            }
            Pseudonimo[i].SetActive(false);
            Puntos[i].SetActive(false);
        }

        ErrorText.SetActive(false);
        //Desactivar el canvas.
        RankingCanvas.SetActive(false);
        PanelOverlay.SetActive(false);
        //Activamos movimiento camara
        MainCamera.GetComponent<TouchCamera>().enabled = true;
        yield break;
    }

    IEnumerator RefreshPatitas()
    {
        WWWForm form = new WWWForm();
        form.AddField("user", PlayerPrefs.GetString("user", ""));

        while (true)
        {
            UnityWebRequest www = UnityWebRequest.Post("http://mitra.cl/SS/getPatitas.php", form);
            yield return www.SendWebRequest();

            //Verificar error en la red.
            if (www.isNetworkError || www.isHttpError)
            {
                Debug.Log(www.error);
            }

            string respuesta = www.downloadHandler.text;

            var respuestaJson = JSON.Parse(respuesta);

            //Caso respuesta -1 -> fallo en la conexion entre php y BD.
            if (respuestaJson["response"] == -1)
            {
                Debug.Log("getPatitas.php no se pudo conectar a BD");
            }

            //Caso respuesta 0 -> Nombre de usuario incorrecto.
            else if (respuestaJson["response"] == 0)
            {
                Debug.Log("getPatitas.php no arrojo resultados con user actual");
            }

            //Caso respuesta 1 -> Patitas.
            else if (respuestaJson["response"] == 1)
            {
                if (respuestaJson["puntos"] != PlayerPrefs.GetInt("puntos", -1))
                {
                    PlayerPrefs.SetInt("puntos", respuestaJson["puntos"]);
                    PuntajeVisible.GetComponent<Text>().text = respuestaJson["puntos"].ToString();
                }
            }

            yield return UpdateCooldown;
        }
        
    }

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
        yield break;
    }

//Terminal de clase.
}
