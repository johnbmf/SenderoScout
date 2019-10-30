using SimpleJSON;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Profile : MonoBehaviour
{
    private string currentTab = "perfil";
    private Color32 colorTabActive = new Color32(254, 247, 215, 255);
    private Color32 colorTabActiveText = new Color32(147, 76, 33, 255);
    private Color32 colorTabInactive = new Color32(184, 101, 83, 255);
    private Color32 colorTabInactiveText = new Color32(254, 247, 215, 255);
    private JSONNode InfoInsigniasJSON;
    private int currentAvatar = 0;

    public GameObject[] ElementosComun;
    public GameObject[] ElementosPerfil;
    public GameObject[] ElementosInsignias;
    public GameObject[] Paneles;
    public GameObject[] ElementosInsigniaInfo;
    public GameObject[] AvatarChange;
    public Sprite[] Avatares;
    public GameObject SelectImageBorder;
    public GameObject MainCamera;

    // Start is called before the first frame update
    void Start()
    {
        InfoInsigniasJSON = JSONNode.Parse(Resources.Load<TextAsset>("info").text);
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

            //Se debe cambiar el estilo de la tab actual.
            ElementosComun[1].GetComponent<Text>().text = "Mi Perfil";  //Titulo
            ElementosComun[3].GetComponent<Image>().color = colorTabActive; //Color fondo del boton perfil del menu.
            ElementosComun[4].GetComponent<Text>().color = colorTabActiveText; //Color de la fuente del boton perfil del menu.
            ElementosComun[5].GetComponent<Image>().color = colorTabInactive; //Color fondo del boton insignias del menu.
            ElementosComun[6].GetComponent<Text>().color = colorTabInactiveText; //Color de la fuente del boton insignias del menu.

            //Se cambia la currentTab a perfil
            currentTab = "perfil";
        }

        else if (tab == "insignias" && currentTab != "insignias")
        {
            //Se deben desactivar los elementos que no pertenecen a las insignias.
            DeactivateGameObjects(ref ElementosPerfil);

            //Se deben activar los elementos que pertenecen a las insignias.
            ActivateGameObjects(ref ElementosInsignias);

            //Se debe cambiar el estilo de la tab actual.
            ElementosComun[1].GetComponent<Text>().text = "Mis Insignias";  //Titulo
            ElementosComun[3].GetComponent<Image>().color = colorTabInactive; //Color fondo del boton perfil del menu.
            ElementosComun[4].GetComponent<Text>().color = colorTabInactiveText; //Color de la fuente del boton perfil del menu.
            ElementosComun[5].GetComponent<Image>().color = colorTabActive; //Color fondo del boton insignias del menu.
            ElementosComun[6].GetComponent<Text>().color = colorTabActiveText; //Color de la fuente del boton insignias del menu.

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

    public void OpenInsigniaInfoPanel(int numInsignia)
    {
        ElementosInsigniaInfo[1].GetComponent<Text>().text = InfoInsigniasJSON[numInsignia.ToString()]["nombre"];
        //AQUI CAMBIAR EL ESTADO DE OBTENIDA O NO OBTENIDA.
        ElementosInsigniaInfo[3].GetComponent<Text>().text = InfoInsigniasJSON[numInsignia.ToString()]["obtencion"];
        //AQUI CAMBIAR EL TEXTO QUE MUESTRA A LAS OTRAS PERSONAS QUE TIENEN LA INSIGNIA.
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
        PlayerPrefs.SetInt("avatar", currentAvatar);
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

