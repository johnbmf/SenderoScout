using System.Collections;
using System.Collections.Generic;
using UnityEngine.Networking;
using UnityEngine;
using UnityEngine.UI;
using SimpleJSON;

public class Spot3Mision : MonoBehaviour
{
    public GameObject MisionRedDot;
    public GameObject PanelOverlay;
    public GameObject PanelOverlayMini;
    public GameObject Loading;

    public GameObject Spot3_estado0;
    public GameObject Spot3_estado1;
    public GameObject Spot3_estado2;

    public GameObject MainCamera;

    public Sprite[] SpritesPatas;

    #region 3erSpot variables
    //Variables del panel de misiones
    public GameObject DetalleMisionCanvas;
    public GameObject PanelMision;
    public GameObject TituloMision;
    public GameObject InstruccionesMision;
    public GameObject InputRespuesta;
    public GameObject TextRespuesta;
    public GameObject BotonEnviar;
    public GameObject BotonCerrar;
    public GameObject NombreMision;
    public GameObject MensajeEnvio;
    public GameObject Felicitaciones;
    public GameObject MsgEvaluacion;
    public GameObject ImgPatas;
    public GameObject ErrorText;
    public GameObject AceptarButton;
    #endregion

    private string nombreSpot = "bosque";
    private int id_mision_mapa;
    private bool isPanelActive = false;
    private int puntos;

    private WaitForSeconds UpdateCooldown = new WaitForSeconds(15.0f);

    // Start is called before the first frame update
    void Start()
    {
        StartCoroutine(GetMision());
    }

    // Update is called once per frame
    void Update()
    {

    }

    IEnumerator GetMision()
    {
        WWWForm form = new WWWForm();
        form.AddField("player_id", PlayerPrefs.GetString("user", ""));
        form.AddField("spot", nombreSpot);

        while (true)
        {
            //Cambiar por GetMisionCampamento.
            UnityWebRequest www = UnityWebRequest.Post("http://www.mitra.cl/SS/GetMisionSpot.php", form);
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
                int numMisiones = RespuestaJson["num_rows"];

                //Respuesta de que el script no se puede conectar a la BD.
                if (numMisiones == -1)
                {
                    Debug.Log("El script no se pudo conectar a la base de datos");
                    
                }

                //Respuesta de que no hay misiones activas.
                else if (numMisiones == 0)
                {
                    Debug.Log("No se han encontrado misiones para el jugador actual.");
                    Spot3_estado0.SetActive(false);
                    Spot3_estado1.SetActive(false);
                    Spot3_estado2.SetActive(false);
                    
                }

                //Respuesta de que hay una mision que desplegar
                else if (numMisiones == 1)
                {
                    Debug.Log("Se ha encontrado una mision.");
                    Debug.Log(RespuestaJson[nombreSpot]["estado"]);
                    id_mision_mapa = RespuestaJson[nombreSpot]["id"];

                    //Dependiendo del estado es la ventana que hay que configurar y mostrar.
                    //Estado 0 -> mision no completada.
                    if (RespuestaJson[nombreSpot]["estado"] == 0)
                    {
                        Text textotitulomision;
                        Text textoInstruccionesMision;

                        textotitulomision = NombreMision.GetComponent<Text>();
                        textoInstruccionesMision = InstruccionesMision.GetComponent<Text>();

                        textotitulomision.text = RespuestaJson[nombreSpot]["nombre_mision"];
                        textoInstruccionesMision.text = RespuestaJson[nombreSpot]["descripcion_mision"];

                        Spot3_estado1.SetActive(false);
                        Spot3_estado2.SetActive(false);

                        Spot3_estado0.SetActive(true);
                        MisionRedDot.SetActive(true);
                    }

                    //Estado 1 -> mision en revision.
                    else if (RespuestaJson[nombreSpot]["estado"] == 1)
                    {
                        Text textotitulomision;
                        textotitulomision = NombreMision.GetComponent<Text>();

                        textotitulomision.text = RespuestaJson[nombreSpot]["nombre_mision"];

                        Spot3_estado0.SetActive(false);
                        Spot3_estado2.SetActive(false);

                        Spot3_estado1.SetActive(true);
                        
                    }

                    //Estado 2 -> mision completada.
                    else if (RespuestaJson[nombreSpot]["estado"] == 2)
                    {
                        Text textotitulomision;
                        textotitulomision = NombreMision.GetComponent<Text>();

                        textotitulomision.text = RespuestaJson[nombreSpot]["nombre_mision"];
                        puntos = RespuestaJson[nombreSpot]["puntaje"];

                        Spot3_estado0.SetActive(false);
                        Spot3_estado1.SetActive(false);

                        Spot3_estado2.SetActive(true);
                        
                    }


                }
            }

            yield return UpdateCooldown;
        }
    }

    public void MostrarPanelEstado0()
    {
        //Solo si el panel no se esta mostrando actualmente se puede desplegar.
        if (!isPanelActive)
        {
            //Activamos el bool del panel para que no se pueda abrir dos veces.
            isPanelActive = true;

            //Desactivamos todo lo que no hay que mostrar en el estado 0
            MensajeEnvio.SetActive(false);
            Felicitaciones.SetActive(false);
            MsgEvaluacion.SetActive(false);
            ImgPatas.SetActive(false);
            ErrorText.SetActive(false);
            AceptarButton.SetActive(false);

            //Activamos todo lo que hay que mostrar en el estado 0
            TituloMision.SetActive(true);
            InstruccionesMision.SetActive(true);
            InputRespuesta.SetActive(true);
            BotonEnviar.SetActive(true);
            BotonCerrar.SetActive(true);
            NombreMision.SetActive(true);

            //Desactivamos movimiento de la camara.
            MainCamera.GetComponent<TouchCamera>().enabled = false;

            //Activamos el canvas del detalle de la mision.
            DetalleMisionCanvas.SetActive(true);

            StartCoroutine(MovePanel());
        }
    }

    public void MostrarPanelEstado1()
    {
        //Solo si el panel no se esta mostrando actualmente se puede desplegar.
        if (!isPanelActive)
        {
            //Activamos el bool del panel para que no se pueda abrir dos veces.
            isPanelActive = true;

            //Desactivamos todo lo que no hay que mostrar en el estado 1
            InstruccionesMision.SetActive(false);
            InputRespuesta.SetActive(false);
            BotonEnviar.SetActive(false);
            Felicitaciones.SetActive(false);
            MsgEvaluacion.SetActive(false);
            ImgPatas.SetActive(false);
            ErrorText.SetActive(false);

            //Activamos todo lo que hay que mostrar en el estado 1
            MensajeEnvio.SetActive(true);
            TituloMision.SetActive(true);
            BotonCerrar.SetActive(true);
            NombreMision.SetActive(true);
            AceptarButton.SetActive(true);

            //Desactivamos movimiento de la camara.
            MainCamera.GetComponent<TouchCamera>().enabled = false;

            //Activamos el canvas del detalle de la mision.
            DetalleMisionCanvas.SetActive(true);

            StartCoroutine(MovePanel());
        }
    }

    public void MostrarPanelEstado2()
    {
        //Solo si el panel no se esta mostrando actualmente se puede desplegar.
        if (!isPanelActive)
        {
            //Activamos el bool del panel para que no se pueda abrir dos veces.
            isPanelActive = true;

            //Desactivamos todo lo que no hay que mostrar en el estado 2
            BotonEnviar.SetActive(false);
            InstruccionesMision.SetActive(false);
            InputRespuesta.SetActive(false);
            MensajeEnvio.SetActive(false);
            ErrorText.SetActive(false);

            //Activamos todo lo que hay que mostrar en el estado 2
            TituloMision.SetActive(true);
            BotonCerrar.SetActive(true);
            NombreMision.SetActive(true);
            Felicitaciones.SetActive(true);
            MsgEvaluacion.SetActive(true);
            ImgPatas.GetComponent<Image>().sprite = SpritesPatas[puntos];
            ImgPatas.SetActive(true);
            AceptarButton.SetActive(true);

            //Desactivamos movimiento de la camara.
            MainCamera.GetComponent<TouchCamera>().enabled = false;

            //Activamos el canvas del detalle de la mision.
            DetalleMisionCanvas.SetActive(true);

            StartCoroutine(MovePanel());
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
            PanelMision.GetComponent<RectTransform>().offsetMin = Vector2.Lerp(PanelMisionPosHide, PanelMisionPosShow, t);
            //Esperamos al next frame para seguir moviendo.
            yield return null;
        }

        t = 0.0f;
        yield return null;
    }

    public void CerrarPanel()
    {
        StartCoroutine(HidePanel());
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
            PanelMision.GetComponent<RectTransform>().offsetMin = Vector2.Lerp(PanelMisionPosShow, PanelMisionPosHide, t);
            //Esperamos al next frame para seguir moviendo.
            yield return null;
        }

        t = 0.0f;
        //Desactivamos todos los elementos del panel.
        MensajeEnvio.SetActive(false);
        TituloMision.SetActive(false);
        InstruccionesMision.SetActive(false);
        InputRespuesta.SetActive(false);
        BotonEnviar.SetActive(false);
        BotonCerrar.SetActive(false);
        NombreMision.SetActive(false);
        Felicitaciones.SetActive(false);
        MsgEvaluacion.SetActive(false);
        ImgPatas.SetActive(false);
        ErrorText.SetActive(false);
        AceptarButton.SetActive(false);

        DetalleMisionCanvas.SetActive(false);
        isPanelActive = false;
        PanelOverlay.SetActive(false);
        MainCamera.GetComponent<TouchCamera>().enabled = true;
        yield return null;
    }

    public void EnviarRespuesta()
    {
        StartCoroutine(EnviarRespuestaServer());
    }

    IEnumerator EnviarRespuestaServer()
    {
        string respuesta = TextRespuesta.GetComponent<Text>().text;

        //Activar Loading
        PanelOverlayMini.SetActive(true);
        Loading.SetActive(true);

        WWWForm form = new WWWForm();
        form.AddField("respuesta", respuesta);
        form.AddField("id_mision_mapa", id_mision_mapa);
        UnityWebRequest www = UnityWebRequest.Post("http://www.mitra.cl/SS/SubmitRespuestaNino.php", form);
        yield return www.SendWebRequest();

        if (www.isNetworkError || www.isHttpError)
        {
            Debug.Log(www.error);
            //Desactivar Loading
            Loading.SetActive(false);
            PanelOverlayMini.SetActive(false);

            //Mostrar que hubo un error enviando la informacion.
            ErrorText.GetComponent<Text>().text = "Lo sentimos. Hubo un error procesando tu respuesta. Comprueba tu conexión a internet.";
            ErrorText.SetActive(true);
            yield break;
        }

        //Recibir respuesta del server.
        var respuestaServer = JSON.Parse(www.downloadHandler.text);

        //Si OK -> Mensaje de exito. Ademas se debe actualizar la info para no mostrar la mision de nuevo y mostrar la evaluacion del dirigente.
        if (respuestaServer["response"] == 1)
        {
            Debug.Log("Ok");
            //Desactivar Loading
            Loading.SetActive(false);
            PanelOverlayMini.SetActive(false);

            //Desactivamos todo lo que no hay que mostrar en el estado 1
            InstruccionesMision.SetActive(false);
            InputRespuesta.SetActive(false);
            BotonEnviar.SetActive(false);

            //Activamos todo lo que hay que mostrar en el estado 1
            MensajeEnvio.SetActive(true);
            TituloMision.SetActive(true);
            BotonCerrar.SetActive(true);
            NombreMision.SetActive(true);
            AceptarButton.SetActive(true);

            //Cambiamos el estado del spot al estado 1.
            Spot3_estado0.SetActive(false);
            Spot3_estado1.SetActive(true);
            Spot3_estado2.SetActive(false);
            yield break;


        }

        //else -> Mensaje fracaso.
        else
        {
            Debug.Log("Not Ok");
            //Desactivar Loading
            Loading.SetActive(false);
            PanelOverlayMini.SetActive(false);

            //Mostrar que hubo un error en el envio de info.
            ErrorText.GetComponent<Text>().text = "Lo sentimos. Hubo un error procesando tu respuesta. Inténtalo más tarde.";
            ErrorText.SetActive(true);
            yield break;
        }
    }
}
