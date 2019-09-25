using SimpleJSON;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.UI;

public class Aptitudes : MonoBehaviour
{
    #region PublicVars
    /*
     * Personajes: Array con gameobjects de los personajes:
     *              0 -> Baloo
     *              1 -> Bagheera
     *              2 -> Kaa
     *              3 -> Akela
     *              4 -> San Francisco
     *              5 -> Hathi
     * 
     * Elementos: Array con los elementos del panel que se abre al pulsar un personaje.
     *              0 -> Imagen del animal
     *              1 -> DialogoText
     *              2 -> LoadBarra
     */
    public GameObject[] Personajes;
    public GameObject[] Elementos;
    #endregion

    #region PublicStaticVars
    public static float[] Evaluaciones = new float[6];
    #endregion

    #region AptitudesCanvasVars
    public GameObject AptitudesCanvas;
    public GameObject AptitudesPanel;
    public GameObject Animal;
    public GameObject DialogoFrame;
    public GameObject DialogoText;
    public GameObject Barra;
    public GameObject Load;
    public GameObject Faces;
    #endregion

    // Start is called before the first frame update
    void Start()
    {
        StartCoroutine(GetNivelAptitudes());
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    IEnumerator GetNivelAptitudes()
    {
        WWWForm form = new WWWForm();
        form.AddField("name", PlayerPrefs.GetString("user", ""));

        UnityWebRequest www = UnityWebRequest.Post("http://www.mitra.cl/SS/GetAptitudes.php", form);
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
                //Guardar las evaluaciones localmente
                Evaluaciones[0] = RespuestaJson["corpo"];
                Evaluaciones[1] = RespuestaJson["creat"];
                Evaluaciones[2] = RespuestaJson["carac"];
                Evaluaciones[3] = RespuestaJson["afect"];
                Evaluaciones[4] = RespuestaJson["socio"];
                Evaluaciones[5] = RespuestaJson["espir"];

                
                //Activar los gameobjects de los personajes               
                for (int i = 0; i < 6; i++)
                {
                    Personajes[i].SetActive(true);
                }
                
            }
        }
        yield return null;
    }

    public void Testing(string mensaje, int animalFace)
    {
        DialogoText.GetComponent<Text>().text = mensaje;
        Load.GetComponent<Image>().fillAmount = Evaluaciones[animalFace] / 5;
        AptitudesCanvas.SetActive(true);
    }
}
