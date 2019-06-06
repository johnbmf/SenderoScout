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

    public GameObject DetalleMisionCanvas;
    public GameObject TituloMision;
    public GameObject InstruccionesMision;

    private WaitForSeconds UpdateCooldown = new WaitForSeconds(30.0f);

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


}
