using SimpleJSON;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.UI;

public class Notificacion : MonoBehaviour
{
    public GameObject MainCamera;
    public GameObject fondo;
    public GameObject textoNotificacion;
    // Start is called before the first frame update
    void Start()
    {
        StartCoroutine(checkNotificacion());
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    private IEnumerator checkNotificacion()
    {
        //LOADING
        WWWForm form = new WWWForm();
        form.AddField("user", PlayerPrefs.GetString("user", "USER_NOT_FOUND"));

        UnityWebRequest www = UnityWebRequest.Post("http://www.mitra.cl/SS/GetNotificacion.php", form);

        yield return www.SendWebRequest();

        if (www.isNetworkError || www.isHttpError)
        {
            Debug.Log("Error de conexion en Notificacion.cs Line 32");
            //Handle
            Debug.Log(www.error);
            yield break;
        }

        else
        {
            string respuesta = www.downloadHandler.text;
            var RespuestaJson = JSON.Parse(respuesta);

            Debug.Log("NotificacionResponse: " + RespuestaJson);

            //Cambiar texto de notificacion segun corresponde.
            //Error conexion BD
            if (RespuestaJson["response"] == 0)
            {
                yield break;
            }

            //Caso no notificaciones
            else if (RespuestaJson["response"] == 1)
            {
                yield break;
            }

            //Caso notificacion -> pseudonimo aprobado
            else if (RespuestaJson["response"] == 2)
            {
                textoNotificacion.GetComponent<Text>().text = "Felicidades! Tu pseudónimo ha sido aprobado por tu dirigente. Puedes verlo en tu perfil desde ahora.";
                fondo.SetActive(true);
                Aptitudes.isPanelOpen = true;
                MainCamera.GetComponent<TouchCamera>().enabled = false;
            }

            //Caso notificacion -> pseudonimo rechazado
            else if (RespuestaJson["response"] == 3)
            {
                textoNotificacion.GetComponent<Text>().text = "Lo sentimos, tu pseudónimo no ha sido aprobado por tu dirigente, por lo que conservarás tu pseudónimo actual.";
                fondo.SetActive(true);
                Aptitudes.isPanelOpen = true;
                MainCamera.GetComponent<TouchCamera>().enabled = false;
            }

            yield break;
        }
    }

    public void AceptarButton()
    {
        fondo.SetActive(false);
        Aptitudes.isPanelOpen = false;
        MainCamera.GetComponent<TouchCamera>().enabled = true;
    }
}
