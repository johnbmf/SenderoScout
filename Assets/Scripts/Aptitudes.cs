﻿using SimpleJSON;
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
     *              0 -> Akela
     *              1 -> Bagheera
     *              2 -> Baloo
     *              3 -> Kha
     *              4 -> Raksha
     *              5 -> SanFrancisco
     * 
     * PersonajesPanel: Array con gameobjects de la imagen del personaje en el panel de visualizacion.
     */
    public GameObject[] Personajes;
    public GameObject[] PersonajesPanel;
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

    public GameObject OverlayGrande;
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
        //Load.GetComponent<Image>().fillAmount = Evaluaciones[animalFace] / 5;
        AptitudesCanvas.SetActive(true);
        float ev = Evaluaciones[animalFace];
        OverlayGrande.SetActive(true);

        StartCoroutine(EfectoScalePanel(animalFace));
    }

    IEnumerator EfectoScalePanel(int animalFace)
    {
        Vector3 ScaleStart = new Vector3(0.9f, 0.9f, 1);
        Vector3 ScaleEnd = new Vector3(1, 1, 1);

        //el divisor de rateTiempo indica el tiempo que toma en abrirse el panel.
        float t = 0.0f;
        float rateTiempo = 1f / 0.2f;

        //Mientras el panel aun no llega a su tamaño real:
        while (t < 1f)
        {
            t += Time.deltaTime * rateTiempo;
            AptitudesPanel.transform.localScale = Vector3.Lerp(ScaleStart, ScaleEnd, t);
            //Esperamos al next frame para seguir aumentando.
            yield return null;
        }

        t = 0.0f;
        float ev = Evaluaciones[animalFace];
        StartCoroutine(LoadBarAnimation(ev));
        yield return null;
    }

    IEnumerator LoadBarAnimation(float evaluacion)
    {
        Vector3 LoadBarStart = new Vector2(0, 0);
        Vector3 LoadBarEnd = new Vector2(evaluacion, 0);

        Image LoadBar = Load.GetComponent<Image>();
        //el divisor de rateTiempo indica el tiempo que toma en llenarse la barra.
        float t = 0.0f;
        float rateTiempo = 1f / 3f;

        //Mientras la barra aun no llegue al punto deseado, hay que seguirla moviendo.
        while (t < 1f)
        {
            t += Time.deltaTime * rateTiempo;
            LoadBar.fillAmount = Vector2.Lerp(LoadBarStart, LoadBarEnd, t).x / 5;
            //Esperamos al next frame para seguir moviendo.
            yield return null;
        }

        t = 0.0f;
        yield return null;
    }

    public void Close()
    {
        //Desactivar y devolver gameobjects a su nivel por defecto.
        AptitudesPanel.transform.localScale = new Vector3(0.9f, 0.9f, 0.9f);
        Load.GetComponent<Image>().fillAmount = 0;
        AptitudesCanvas.SetActive(false);
        OverlayGrande.SetActive(false);

    }
}