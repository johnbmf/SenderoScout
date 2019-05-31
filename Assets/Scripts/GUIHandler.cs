using System.Collections;
using System.Collections.Generic;
using UnityEngine.Networking;
using UnityEngine;
using UnityEngine.UI;

public class GUIHandler : MonoBehaviour
{
    public GameObject Spot1;
    public GameObject Spot2;

    public GameObject DetalleMisionCanvas;
    public GameObject TituloMision;
    public GameObject InstruccionesMision;

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
        form.AddField("player_id", "PlayerName");

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

                //Aqui deberian parsearse los datos entregados por el servidor.

                if (respuesta == "0")
                {
                    Debug.Log("El script no se pudo conectar a la base de datos");
                    yield return new WaitForSeconds(30.0f);
                }

                else if (respuesta == "1")
                {
                    Debug.Log("Se ha encontrado una mision.");
                    //Desplegar acciones asociadas a la visualizacion de la mision.
                    Text textotitulomision;
                    Text textoInstruccionesMision;

                    textotitulomision = TituloMision.GetComponent<Text>();
                    textoInstruccionesMision = InstruccionesMision.GetComponent<Text>();

                    textotitulomision.text = "Mision spot 1";
                    textoInstruccionesMision.text = "Instrucciones de mision del spot 1";
                    Spot1.SetActive(true);
                    yield return new WaitForSeconds(30.0f);
                }

                else if (respuesta == "2")
                {
                    Debug.Log("No se han encontrado misiones para el jugador actual.");
                    Spot1.SetActive(false);
                    yield return new WaitForSeconds(30.0f);
                }
            }
        }
    }


}
