using SimpleJSON;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System.Linq;
using UnityEngine.Networking;

public class Profile : MonoBehaviour
{
    private string currentTab = "perfil";
    private Color32 colorRojo = new Color32(255, 0, 0, 255);
    private Color32 colorVerde = new Color32(22, 176, 0, 255);
    private JSONNode InfoInsigniasJSON;
    private int currentAvatar = 0;

    public GameObject[] ElementosComun;
    public GameObject[] ElementosPerfil;
    public GameObject[] ElementosInsignias;
    public GameObject[] Paneles;
    public GameObject[] ElementosInsigniaInfo;
    public GameObject[] AvatarChange;
    public GameObject[] ElementosCambiarPseudo;
    public Sprite[] Avatares;
    public GameObject SelectImageBorder;
    public GameObject MainCamera;
    public static JSONNode PersonasInsignias;

    public Sprite[] InsigniasLista;
    public GameObject[] Loading;

    // Start is called before the first frame update
    void Start()
    {
        InfoInsigniasJSON = JSONNode.Parse(Resources.Load<TextAsset>("info").text);
        ElementosComun[2].GetComponent<Image>().sprite = Avatares[PlayerPrefs.GetInt(PlayerPrefs.GetString("user", "USER_NOT_FOUND") + "avatar", 0)];
        ElementosPerfil[2].GetComponent<Text>().text = PlayerPrefs.GetString("nombre_unidad", "UNIDAD_NOT_FOUND");
        ElementosPerfil[4].GetComponent<Text>().text = PlayerPrefs.GetString("grupo", "GRUPO_NOT_FOUND");
        ElementosPerfil[6].GetComponent<Text>().text = PlayerPrefs.GetString("nombre", "NOMBRE_NOT_FOUND");
        ElementosPerfil[8].GetComponent<Text>().text = PlayerPrefs.GetInt("edad", -1).ToString();
        ElementosComun[4].GetComponent<Text>().text = PlayerPrefs.GetString("pseudonimo", "PSEUDONIMO_NOT_FOUND");
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    /* Función CambiarTab: se llama cuando se pulsa en una opción del menú dentro del perfil.
     * tab es un string dado desde el inspector de unity, que depende de que opción del menú se pulsa.
     * Valores posibles: "perfil" o "insignias".
     * Utiliza un valor currentTab, que determina en que pestaña se encuentra actualmente el usuario.
    */
    public void CambiarTab(string tab)
    {
        if (tab == "perfil" && currentTab != "perfil")
        {
            //Se deben desactivar los elementos que no pertenecen al perfil.
            DeactivateGameObjects(ref ElementosInsignias);

            //Se deben activar los elementos que pertenecen al perfil.
            ActivateGameObjects(ref ElementosPerfil);

            //Se cambia la currentTab a perfil
            currentTab = "perfil";
        }

        else if (tab == "insignias" && currentTab != "insignias")
        {
            //Se deben desactivar los elementos que no pertenecen a las insignias.
            DeactivateGameObjects(ref ElementosPerfil);

            //Se deben activar los elementos que pertenecen a las insignias.
            ActivateGameObjects(ref ElementosInsignias);

            //Se cambia la currentTab a insignias.
            currentTab = "insignias";
        }

        return;
    }

    public void OpenAvatarPanel()
    {
        Paneles[1].SetActive(true);
    }

    public void CloseAvatarPanel()
    {
        Paneles[1].SetActive(false);
    }

    public void OpenPseudoPanel()
    {
        Paneles[3].SetActive(true);
    }

    public void ClosePseudoPanel()
    {
        ElementosCambiarPseudo[0].GetComponent<Text>().text = "";
        ElementosCambiarPseudo[1].SetActive(true);
        ElementosCambiarPseudo[2].GetComponent<Text>().text = "";
        Paneles[3].SetActive(false);
    }

    public void SendPseudo()
    {
        StartCoroutine(SendPseudoCoroutine());
    }

    IEnumerator SendPseudoCoroutine()
    {
        //LOADING
        Loading[0].SetActive(true);
        Loading[1].SetActive(true);
        WWWForm form = new WWWForm();

        //GET PSEUDO FROM INPUT
        form.AddField("pseudoNuevo", ElementosCambiarPseudo[0].GetComponent<Text>().text);
        form.AddField("pseudoActual", PlayerPrefs.GetString("pseudonimo", "PSEUDONIMO_NOT_FOUND"));
        form.AddField("unidad", PlayerPrefs.GetInt("unidad1", -1));
        form.AddField("nombre", PlayerPrefs.GetString("nombre", "NOMBRE_NOT_FOUND"));
        form.AddField("user", PlayerPrefs.GetString("user", "USER_NOT_FOUND"));

        //SET LINK_TO_POST
        UnityWebRequest www = UnityWebRequest.Post("http://mitra.cl/SS/SetPseudoRequest.php", form);

        yield return www.SendWebRequest();

        if (www.isNetworkError || www.isHttpError)
        {
            Debug.Log("Error de conexion en Profile.cs Line 138");
            ElementosCambiarPseudo[2].GetComponent<Text>().text = "Error de conexión. Comprueba tu conexión a internet.";
            Debug.Log(www.error);
            Loading[0].SetActive(false);
            Loading[1].SetActive(false);
            yield break;
        }

        else
        {
            string respuesta = www.downloadHandler.text;
            var RespuestaJson = JSON.Parse(respuesta);

            //HANDLE RESPONSES.
            if (RespuestaJson["response"] == 0)
            {
                ElementosCambiarPseudo[2].GetComponent<Text>().text = "Error de conexión. Inténtalo más tarde.";
                ElementosCambiarPseudo[2].GetComponent<Text>().color = colorRojo;
            }

            else if (RespuestaJson["response"] == 1)
            {
                ElementosCambiarPseudo[2].GetComponent<Text>().text = "Enhorabuena!. Se ha enviado tu nuevo pseudónimo a tu dirigente para que sea aprobado.";
                ElementosCambiarPseudo[2].GetComponent<Text>().color = colorVerde;
            }

            else if (RespuestaJson["response"] == 2)
            {
                ElementosCambiarPseudo[2].GetComponent<Text>().text = "Error de conexión. Inténtalo más tarde.";
                ElementosCambiarPseudo[2].GetComponent<Text>().color = colorRojo;
            }

            else if (RespuestaJson["response"] == -1)
            {
                ElementosCambiarPseudo[2].GetComponent<Text>().text = "Ya has solicitado un cambio de pseudónimo previamente. Espera la aprobación de tu dirigente.";
                ElementosCambiarPseudo[2].GetComponent<Text>().color = colorRojo;
            }
            Loading[0].SetActive(false);
            Loading[1].SetActive(false);
            yield break;
        }
        
    }

    public void OpenInsigniaInfoPanel(int numInsignia)
    {
        ElementosInsigniaInfo[0].GetComponent<Image>().sprite = InsigniasLista[numInsignia - 1];

        string personasQueTienenInsignia = "Personas que tienen esta insignia: ";
        bool hayPersonas = false;
        ElementosInsigniaInfo[1].GetComponent<Text>().text = InfoInsigniasJSON[numInsignia.ToString()]["nombre"];
        //AQUI CAMBIAR EL ESTADO DE OBTENIDA O NO OBTENIDA.
        foreach (JSONNode node in PersonasInsignias[numInsignia.ToString()])
        {
            string nombreInLista = (string)node.ToString().Replace("\"", string.Empty);
            personasQueTienenInsignia += nombreInLista + ", ";
            hayPersonas = true;
            if (nombreInLista == PlayerPrefs.GetString("user", "USER_NOT_FOUND"))
            {
                ElementosInsigniaInfo[2].GetComponent<Text>().text = "obtenida";
                ElementosInsigniaInfo[2].GetComponent<Text>().color = new Color32(22, 176, 0, 255);
            } 
        }
        ElementosInsigniaInfo[3].GetComponent<Text>().text = InfoInsigniasJSON[numInsignia.ToString()]["obtencion"];
        //AQUI CAMBIAR EL TEXTO QUE MUESTRA A LAS OTRAS PERSONAS QUE TIENEN LA INSIGNIA.
        if (hayPersonas)
        {
            personasQueTienenInsignia = personasQueTienenInsignia.Remove(personasQueTienenInsignia.Length - 2);
            personasQueTienenInsignia += ".";
        }

        else
        {
            personasQueTienenInsignia = personasQueTienenInsignia.Remove(0) + "Nadie en tu unidad posee esta insignia.";
        }

        ElementosInsigniaInfo[4].GetComponent<Text>().text = personasQueTienenInsignia;

        Paneles[2].SetActive(true);
    }

    public void SelectAvatar(int numAvatar)
    {
        currentAvatar = numAvatar;
        SelectImageBorder.transform.localPosition = new Vector3(190 * ((numAvatar % 3) - 1), -190 * (numAvatar / 3) + 150, 0);
        //CAMBIAR POS DEL MARCO DEL CURRENT AVATAR
    }

    public void ConfirmarAvatar()
    {
        //Set avatar playerpfrefs
        PlayerPrefs.SetInt(PlayerPrefs.GetString("user", "USER_NOT_FOUND") + "avatar", currentAvatar);
        //Set avatar pantalla mapa
        AvatarChange[1].GetComponent<Image>().sprite = Avatares[currentAvatar];
        //SETEAR AVATAR DE PANEL PERFIL.
        AvatarChange[0].GetComponent<Image>().sprite = Avatares[currentAvatar];
        //CERRAR VENTANA DE SELECT AVATAR.
        CloseAvatarPanel();
    }

    public void CloseInsigniaInfoPanel()
    {
        Paneles[2].SetActive(false);
    }

    public void ClosePanel()
    {
        StartCoroutine(ClosePanelCoroutine());
    }

    IEnumerator ClosePanelCoroutine()
    {
        DeactivateGameObjects(ref ElementosInsignias);
        ActivateGameObjects(ref ElementosPerfil);
        currentTab = "perfil";
        Paneles[0].SetActive(false);
        //Desactivar movimiento de camara.
        MainCamera.GetComponent<TouchCamera>().enabled = true;
        //Activar los monitos para clic
        Aptitudes.isPanelOpen = false;
        yield return null;
    }

    private void ActivateGameObjects(ref GameObject[] lista)
    {
        for (int i = 0; i < lista.Length; i++)
        {
            lista[i].SetActive(true);
        }
        return;
    }

    private void DeactivateGameObjects(ref GameObject[] lista)
    {
        for (int i = 0; i < lista.Length; i++)
        {
            lista[i].SetActive(false);
        }
        return;
    }
}

