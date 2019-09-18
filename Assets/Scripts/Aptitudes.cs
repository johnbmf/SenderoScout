using SimpleJSON;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

public class Aptitudes : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    IEnumerator GetNivelAptitudes()
    {
        WWWForm form = new WWWForm();
        form.AddField("name", PlayerPrefs.GetString("user", ""));

        UnityWebRequest www = UnityWebRequest.Post("http://www.mitra.cl/SS/GetVerMisiones.php", form);
        yield return www.SendWebRequest();

        //Si hay error de conexion de red, debugLog y esperar el cooldown de refresh.
        if (www.isNetworkError || www.isHttpError)
        {
            Debug.Log(www.error);
            yield break;
        }

        //Si no hay error en la conexion -> procesar respuesta del server
        else
        {
            string respuesta = www.downloadHandler.text;
            Debug.Log("Respuesta del servidor: " + respuesta);

            var RespuestaJson = JSON.Parse(respuesta);

            //Si respuesta -1 -> No hay conexion entre server y BD.
            if (RespuestaJson["response"] == -1)
            {
                Debug.Log("Aptitudes.cs: No se pudo conectar server con BD.");
                yield break;
            }

            //Si respuesta 0 -> no hay evaluaciones.
            else if (RespuestaJson["response"] == 0)
            {
                Debug.Log("Aptitudes.cs: Aun no existen evaluaciones realizadas para el usuario actual en el rango de fecha determinado.");
                yield break;
            }

            //SI respuesta 1 -> existen evaluaciones y hay que mostrarlas.
            else if (RespuestaJson["response"] == 1)
            {
                //Aptitudes
            }
        }
        yield return null;
    }
}
