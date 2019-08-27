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
                    Text textotitulomision;
                    Text textoInstruccionesMision;

                    textotitulomision = TituloMision.GetComponent<Text>();
                    textoInstruccionesMision = InstruccionesMision.GetComponent<Text>();

                    textotitulomision.text = RespuestaJson["1"]["nombre_mision"];
                    textoInstruccionesMision.text = RespuestaJson["1"]["descripcion_mision"];
                    Spot1.SetActive(true);                    
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
