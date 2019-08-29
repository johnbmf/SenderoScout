using System.Collections;
using System.Collections.Generic;
using UnityEngine.Networking;
using UnityEngine;
using UnityEngine.UI;
using SimpleJSON;

public class GUIHandler : MonoBehaviour
{
    public GameObject Spot1;
    public GameObject Spot2;
    public GameObject Spot3;

    #region 1erSpot variables
    //Variables del panel de misiones
    public GameObject TituloMision;
    public GameObject InstruccionesMision;
    public GameObject InputRespuesta;
    public GameObject TextRespuesta;
    public GameObject BotonEnviar;
    public GameObject BotonCerrar;
    public GameObject NombreMision;
    public GameObject MensajeEnvio;
    public GameObject BotonVolver;
    #endregion

    #region 2Spot variables
    public GameObject TituloMision2;
    public GameObject InstruccionesMision2;
    public GameObject InputRespuesta2;
    public GameObject TextRespuesta2;
    public GameObject BotonEnviar2;
    public GameObject BotonCerrar2;
    public GameObject NombreMision2;
    public GameObject MensajeEnvio2;
    public GameObject BotonVolver2;
    #endregion

    #region 3Spot variables
    public GameObject TituloMision3;
    public GameObject InstruccionesMision3;
    public GameObject InputRespuesta3;
    public GameObject TextRespuesta3;
    public GameObject BotonEnviar3;
    public GameObject BotonCerrar3;
    public GameObject NombreMision3;
    public GameObject MensajeEnvio3;
    public GameObject BotonVolver3;
    #endregion

    private WaitForSeconds UpdateCooldown = new WaitForSeconds(60.0f);

    //Variables de sonido
    public GameObject BotonSonido;
    public Sprite SoundOn;
    public Sprite SoundOff;
    public bool activeSound;


    // Start is called before the first frame update
    void Start()
    {
        StartCoroutine(GetSpotsMision());
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    IEnumerator GetSpotsMision()
    {
        WWWForm form = new WWWForm();
        form.AddField("player_id", PlayerPrefs.GetString("user", ""));//"PlayerName");

        while (true)
        {
            UnityWebRequest www = UnityWebRequest.Post("http://www.mitra.cl/SS/GetMisionActiva.php", form);
            yield return www.SendWebRequest();

            if (www.isNetworkError || www.isHttpError)
            {
                Debug.Log(www.error);
            }
            else
            {
                string respuesta = www.downloadHandler.text;
                Debug.Log("Respuesta del servidor: " + respuesta);

                var RespuestaJson = JSON.Parse(respuesta);
                int numMisiones = RespuestaJson["num_rows"];
                //Aqui deberian parsearse los datos entregados por el servidor.

                if (numMisiones == -1)
                {
                    Debug.Log("El script no se pudo conectar a la base de datos");                   
                }

                else if (numMisiones > 0)
                {
                    Debug.Log("Se han encontrado misiones.");
                    //Desplegar acciones asociadas a la visualizacion de la mision.

                    //Spot 1
                    if (RespuestaJson["campamento"] != null)
                    {
                        //Mision no completada.
                        if (RespuestaJson["campamento"]["estado"] == 0)
                        {
                            Text textotitulomision;
                            Text textoInstruccionesMision;

                            textotitulomision = TituloMision.GetComponent<Text>();
                            textoInstruccionesMision = InstruccionesMision.GetComponent<Text>();

                            textotitulomision.text = RespuestaJson["campamento"]["nombre_mision"];
                            textoInstruccionesMision.text = RespuestaJson["campamento"]["descripcion_mision"];
                            Spot1.SetActive(true);
                        }

                        //Mision en revision
                        /*
                        else if (RespuestaJson["campamento"]["estado"] == 1)
                        {
                            Text textotitulomision;
                            Text textoInstruccionesMision;

                            textotitulomision = TituloMision.GetComponent<Text>();
                            textoInstruccionesMision = InstruccionesMision.GetComponent<Text>();

                            textotitulomision.text = RespuestaJson["campamento"]["nombre_mision"];
                            textoInstruccionesMision.text = RespuestaJson["campamento"]["descripcion_mision"];
                            Spot1.SetActive(true);
                        }

                        //Mision completa
                        else if (RespuestaJson["campamento"]["estado"] == 2)
                        {
                            Text textotitulomision;
                            Text textoInstruccionesMision;

                            textotitulomision = TituloMision.GetComponent<Text>();
                            textoInstruccionesMision = InstruccionesMision.GetComponent<Text>();

                            textotitulomision.text = RespuestaJson["campamento"]["nombre_mision"];
                            textoInstruccionesMision.text = RespuestaJson["campamento"]["descripcion_mision"];
                            Spot1.SetActive(true);
                        }
                        */
                    }

                    else if (RespuestaJson["caverna"] != null)
                    {
                        //Mision no completada.
                        if (RespuestaJson["caverna"]["estado"] == 0)
                        {
                            Text textotitulomision;
                            Text textoInstruccionesMision;

                            textotitulomision = TituloMision2.GetComponent<Text>();
                            textoInstruccionesMision = InstruccionesMision2.GetComponent<Text>();

                            textotitulomision.text = RespuestaJson["caverna"]["nombre_mision"];
                            textoInstruccionesMision.text = RespuestaJson["caverna"]["descripcion_mision"];
                            Spot2.SetActive(true);
                        }

                        //Mision en revision
                        /*
                        else if (RespuestaJson["campamento"]["estado"] == 1)
                        {
                            Text textotitulomision;
                            Text textoInstruccionesMision;

                            textotitulomision = TituloMision.GetComponent<Text>();
                            textoInstruccionesMision = InstruccionesMision.GetComponent<Text>();

                            textotitulomision.text = RespuestaJson["campamento"]["nombre_mision"];
                            textoInstruccionesMision.text = RespuestaJson["campamento"]["descripcion_mision"];
                            Spot1.SetActive(true);
                        }

                        //Mision completa
                        else if (RespuestaJson["campamento"]["estado"] == 2)
                        {
                            Text textotitulomision;
                            Text textoInstruccionesMision;

                            textotitulomision = TituloMision.GetComponent<Text>();
                            textoInstruccionesMision = InstruccionesMision.GetComponent<Text>();

                            textotitulomision.text = RespuestaJson["campamento"]["nombre_mision"];
                            textoInstruccionesMision.text = RespuestaJson["campamento"]["descripcion_mision"];
                            Spot1.SetActive(true);
                        }
                        */
                    }

                    else if (RespuestaJson["bosque"] != null)
                    {
                        //Mision no completada.
                        if (RespuestaJson["bosque"]["estado"] == 0)
                        {
                            Text textotitulomision;
                            Text textoInstruccionesMision;

                            textotitulomision = TituloMision3.GetComponent<Text>();
                            textoInstruccionesMision = InstruccionesMision3.GetComponent<Text>();

                            textotitulomision.text = RespuestaJson["bosque"]["nombre_mision"];
                            textoInstruccionesMision.text = RespuestaJson["bosque"]["descripcion_mision"];
                            Spot3.SetActive(true);
                        }

                        //Mision en revision
                        /*
                        else if (RespuestaJson["campamento"]["estado"] == 1)
                        {
                            Text textotitulomision;
                            Text textoInstruccionesMision;

                            textotitulomision = TituloMision.GetComponent<Text>();
                            textoInstruccionesMision = InstruccionesMision.GetComponent<Text>();

                            textotitulomision.text = RespuestaJson["campamento"]["nombre_mision"];
                            textoInstruccionesMision.text = RespuestaJson["campamento"]["descripcion_mision"];
                            Spot1.SetActive(true);
                        }

                        //Mision completa
                        else if (RespuestaJson["campamento"]["estado"] == 2)
                        {
                            Text textotitulomision;
                            Text textoInstruccionesMision;

                            textotitulomision = TituloMision.GetComponent<Text>();
                            textoInstruccionesMision = InstruccionesMision.GetComponent<Text>();

                            textotitulomision.text = RespuestaJson["campamento"]["nombre_mision"];
                            textoInstruccionesMision.text = RespuestaJson["campamento"]["descripcion_mision"];
                            Spot1.SetActive(true);
                        }
                        */
                    }

                }

                else if (numMisiones == 0)
                {
                    Debug.Log("No se han encontrado misiones para el jugador actual.");
                    Spot1.SetActive(false);                  
                }

            }
            yield return UpdateCooldown;
        }
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

    public void EnviarRespuestaMision()
    {
        StartCoroutine(EnviarRespuestaMisionServer());
    }

    IEnumerator EnviarRespuestaMisionServer()
    {
        //Captura de la respuesta del nino.
        string respuesta = TextRespuesta.GetComponent<Text>().text;

        /*  Codigo no testeado.
        //Enviar datos al server
        WWWForm form = new WWWForm();
        form.AddField("user", PlayerPrefs.GetString("user", ""));
        form.AddField("respuesta", respuesta);
        UnityWebRequest www = UnityWebRequest.Post("URL_ENVIO_RESPUESTA_NINO", form);
        yield return www.SendWebRequest();

        if (www.isNetworkError || www.isHttpError)
        {
            Debug.Log(www.error);
            //Mostrar que hubo un error enviando la informacion.
            yield break;
        }

        //Recibir respuesta del server.
        var respuestaServer = JSON.Parse(www.downloadHandler.text);

        //Si OK -> Mensaje de exito. Ademas se debe actualizar la info para no mostrar la mision de nuevo y mostrar la evaluacion del dirigente.
        if (respuestaServer["response"] == 1)
        {
            Debug.Log("Ok");
            //Mostrar mensaje de exito.
        }

        //else -> Mensaje fracaso.
        else
        {
            Debug.Log("Not Ok");
            //Mostrar que hubo un error en el envio de info.
        }

        yield break;
        */
        MensajeEnvio.GetComponent<Text>().text = "Se ha enviado tu respuesta. Espera a que tu dirigente la evalúe para conseguir más puntos!";
        HideObjetosPanelMision();
        MensajeEnvio.SetActive(true);
        BotonVolver.SetActive(true);
        yield return null;
    }

    private void HideObjetosPanelMision()
    {
        NombreMision.SetActive(false);
        InstruccionesMision.SetActive(false);
        InputRespuesta.SetActive(false);
        BotonEnviar.SetActive(false);
        BotonCerrar.SetActive(false);
        return;
    }
}
