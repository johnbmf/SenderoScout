using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using SimpleJSON;
using System;

public class Login : MonoBehaviour{

    public InputField nameField, passwordField;
    public Button submutButton;
    public Text errorIngreso;
    //desde aca agregamos para el playerpref
    private int inicioSesion;
    private int numPage = 0;
    private string user, email, tipo, nombre, pseudonimo, unidad1, unidad2, edad;

    //GameObjects First Login.
    #region GameObjectsFirstLogin
    public GameObject FirstLoginCanvas;
    public GameObject Instrucciones;
    public GameObject BotonAceptar;
    public GameObject BotonConfirmar;
    public GameObject[] Inputs;
    public GameObject[] TextsInputs;
    public InputField[] PassInputs;
    public GameObject ErrorText;
    public GameObject ScrollViewTerminos;
    public GameObject ScrollViewCampos;

    #endregion
    public GameObject OverlayCanvas;
    //Debug mode: Permite saltarse el login usando datos STUB.
    private bool debugMode = false;

    void Start(){
        if (debugMode)
        {
            StartDebugMode();
        }

        else
        {
            PlayerPrefs.DeleteAll();

            inicioSesion = PlayerPrefs.GetInt("sesion", 0);// (string clave, valor por defecto si es que no existe)
            user = PlayerPrefs.GetString("user", "");
            tipo = PlayerPrefs.GetString("tipo", "");
            /* saltarse el login si ya inició sesión
            if (inicioSesion == 1){
                SceneManager.LoadScene("EscenaMapa");
                SceneManager.UnloadSceneAsync("LoginMenu");
            }*/
        }

    }

    public void StartDebugMode() {
        PlayerPrefs.SetInt("sesion", 1);
        PlayerPrefs.SetString("user", "miembrounidad1");
        //PlayerPrefs.SetString("pass", "123456");
        PlayerPrefs.SetString("email", "n1@gmail.com");
        //PlayerPrefs.SetString("confirmacion_email", "1");
        PlayerPrefs.SetInt("unidad1", 1);
        PlayerPrefs.SetInt("unidad2", 2);
        PlayerPrefs.SetInt("edad", 10);
        PlayerPrefs.SetString("tipo", "nino");
        PlayerPrefs.SetString("nombre", "Petercito Chaconcito");
        PlayerPrefs.SetString("pseudonimo", "Petercito");
        PlayerPrefs.SetInt("puntos", 265);

        //Se carga escena del juego.
        SceneManager.LoadScene("EscenaMapa");
        SceneManager.UnloadSceneAsync("LoginMenu");
    }

    public void CallLogin(){
        errorIngreso.text = "";
        OverlayCanvas.SetActive(true);
        StartCoroutine(LoginUser());
    }
      
    IEnumerator LoginUser(){
        WWWForm form = new WWWForm();
        form.AddField("name", nameField.text.Trim());
        form.AddField("password", passwordField.text);

        UnityWebRequest www = UnityWebRequest.Post("http://mitra.cl/SS/login2.php", form);
        yield return www.SendWebRequest();

        //Verificar error en la red.
        if (www.isNetworkError || www.isHttpError)
        {
            Debug.Log(www.error);
            errorIngreso.text = "Error de conexion. Comprueba tu conexión a internet.";
            OverlayCanvas.SetActive(false);
            yield break;
        }

        string respuesta = www.downloadHandler.text;

        var respuestaJson = JSON.Parse(respuesta);

        //Caso respuesta -1 -> fallo en la conexion entre php y BD.
        if (respuestaJson["response"] == -1)
        {
            errorIngreso.text = "Fallo en la conexión. Intente más tarde.";
            OverlayCanvas.SetActive(false);
            yield break;
        }

        //Caso respuesta 0 -> Nombre de usuario o pass incorrectos.
        else if (respuestaJson["response"] == 0)
        {
            errorIngreso.text = "Nombre de usuario o contraseña incorrectos.";
            OverlayCanvas.SetActive(false);
            yield break;
        }

        //Caso respuesta 1 -> Acceso OK.
        else if (respuestaJson["response"] == 1)
        {
            //Se registran las variables en PlayerPrefs para recordarlos.
            PlayerPrefs.SetInt("sesion", 1);
            PlayerPrefs.SetString("user", respuestaJson["user"]);
            PlayerPrefs.SetString("password", respuestaJson["password"]);
            PlayerPrefs.SetString("email", respuestaJson["email"]);
            PlayerPrefs.SetInt("unidad1", respuestaJson["unidad1"]);
            PlayerPrefs.SetInt("unidad2", respuestaJson["unidad2"]);
            PlayerPrefs.SetString("seisena1", respuestaJson["seisena1"]);
            PlayerPrefs.SetString("seisena2", respuestaJson["seisena2"]);
            PlayerPrefs.SetInt("edad", respuestaJson["edad"]);
            PlayerPrefs.SetString("tipo", respuestaJson["tipo"]);
            PlayerPrefs.SetString("nombre", respuestaJson["nombre"]);
            PlayerPrefs.SetString("pseudonimo", respuestaJson["pseudonimo"]);
            PlayerPrefs.SetInt("puntos", respuestaJson["puntos"]);
            PlayerPrefs.SetString("grupo", respuestaJson["grupo"]);

            //Se carga escena del juego.
            OverlayCanvas.SetActive(false);
            SceneManager.LoadScene("EscenaMapa");
            SceneManager.UnloadSceneAsync("LoginMenu");
            //yield return null;
        }

        //Caso respuesta 2 -> User no es un nino.
        else if (respuestaJson["response"] == 2)
        {
            errorIngreso.text = "Acceso de dirigentes solo disponible en aplicación de dirigentes.";
            OverlayCanvas.SetActive(false);
            yield break;
        }

        //Caso respuesta 3 -> Primer Login.
        else if (respuestaJson["response"] == 3)
        {
            //Set playerprefs que ya estan en bd
            PlayerPrefs.SetInt("sesion", 0);
            PlayerPrefs.SetString("user", respuestaJson["user"]);
            PlayerPrefs.SetString("password", respuestaJson["password"]);
            PlayerPrefs.SetString("email", respuestaJson["email"]);
            PlayerPrefs.SetInt("unidad1", respuestaJson["unidad1"]);
            PlayerPrefs.SetInt("unidad2", respuestaJson["unidad2"]);
            PlayerPrefs.SetString("seisena1", respuestaJson["seisena1"]);
            PlayerPrefs.SetString("seisena2", respuestaJson["seisena2"]);
            PlayerPrefs.SetString("tipo", respuestaJson["tipo"]);
            PlayerPrefs.SetInt("puntos", respuestaJson["puntos"]);
            PlayerPrefs.SetString("grupo", respuestaJson["grupo"]);
            OverlayCanvas.SetActive(false);
            FirstLoginCanvas.SetActive(true);
            yield break;
        }
    }

    public void AceptarTerminos()
    {
        ScrollViewTerminos.SetActive(false);
        ScrollViewCampos.SetActive(true);
        Instrucciones.GetComponent<Text>().text = "Esta es la primera vez que inicias sesión en Sendero Scout!. Edita los campos a continuación para comenzar la aventura!";
        BotonAceptar.SetActive(false);
        BotonConfirmar.SetActive(true);
        numPage = 1;
    }

    public void ConfirmarDatos()
    {
        ErrorText.SetActive(false);
        int edad = -1;
        //Validaciones de campos:

        //Pass no coinciden
        if (PassInputs[0].text != PassInputs[1].text)
        {
            ErrorText.GetComponent<Text>().text = "Las contraseñas deben coincidir para continuar.";
            ErrorText.SetActive(true);
            return;
        }

        //pass lenght < 4
        else if (TextsInputs[3].GetComponent<Text>().text.Length < 4)
        {
            ErrorText.GetComponent<Text>().text = "La contraseña debe contener 4 o más caracteres.";
            ErrorText.SetActive(true);
            return;
        }

        //Campo nombre... Max Lenght?
        else if (TextsInputs[0].GetComponent<Text>().text.Length > 20)
        {
            ErrorText.GetComponent<Text>().text = "El campo nombre no debe tener más de 20 caracteres.";
            ErrorText.SetActive(true);
            return;
        }

        //Campo pseudonimo... Max Lenght?
        else if (TextsInputs[1].GetComponent<Text>().text.Length > 10)
        {
            ErrorText.GetComponent<Text>().text = "El campo pseudonimo no debe tener más de 10 caracteres.";
            ErrorText.SetActive(true);
            return;
        }

        //Campo edad... Int
        else if (!int.TryParse(TextsInputs[2].GetComponent<Text>().text, out edad))
        {
            ErrorText.GetComponent<Text>().text = "El campo edad no tiene un formato válido";
            ErrorText.SetActive(true);
            return;
        }

        //Campo edad... 4 < Int < 18?
        else if (edad < 4 || edad > 18)
        {
            ErrorText.GetComponent<Text>().text = "La edad ingresada no es válida.";
            ErrorText.SetActive(true);
            return;
        }

        //Todos los campos OK.
        else
        {
            OverlayCanvas.SetActive(true);
            StartCoroutine(PostUserData());
        }
    }

    IEnumerator PostUserData()
    {
        WWWForm form = new WWWForm();
        form.AddField("nombre", TextsInputs[0].GetComponent<Text>().text);
        form.AddField("pseudonimo", TextsInputs[1].GetComponent<Text>().text);
        form.AddField("edad", TextsInputs[2].GetComponent<Text>().text);
        form.AddField("pass", PassInputs[0].text);
        form.AddField("username", PlayerPrefs.GetString("user"));

        UnityWebRequest www = UnityWebRequest.Post("http://mitra.cl/SS/PostUserData.php", form);
        yield return www.SendWebRequest();

        //Verificar error en la red.
        if (www.isNetworkError || www.isHttpError)
        {
            Debug.Log(www.error);
            ErrorText.GetComponent<Text>().text = "Error de conexión. Comprueba tu conexión a internet.";
            OverlayCanvas.SetActive(false);
            yield break;
        }

        string respuesta = www.downloadHandler.text;

        var respuestaJson = JSON.Parse(respuesta);

        if (respuestaJson["response"] == -1)
        {
            ErrorText.GetComponent<Text>().text = "Error de conexión. Inténtalo más tarde.";
            ErrorText.SetActive(true);
            OverlayCanvas.SetActive(false);
            yield break;
        }

        else if (respuestaJson["response"] == 0)
        {
            ErrorText.GetComponent<Text>().text = "Error de conexión. Inténtalo más tarde.";
            ErrorText.SetActive(true);
            OverlayCanvas.SetActive(false);
            yield break;
        }

        else if (respuestaJson["response"] == 1)
        {
            //Se registran las variables en PlayerPrefs para recordarlos.
            PlayerPrefs.SetInt("sesion", 1);
            PlayerPrefs.SetInt("edad", Int32.Parse(TextsInputs[2].GetComponent<Text>().text));
            PlayerPrefs.SetString("nombre", TextsInputs[0].GetComponent<Text>().text);
            PlayerPrefs.SetString("pseudonimo", TextsInputs[1].GetComponent<Text>().text);

            //Se carga escena del juego.
            OverlayCanvas.SetActive(false);
            SceneManager.LoadScene("EscenaMapa");
            SceneManager.UnloadSceneAsync("LoginMenu");
            yield return null;
        }
    }

    public void Volver()
    {
        if (numPage == 0)
        {
            FirstLoginCanvas.SetActive(false);
        }

        else if (numPage == 1)
        {
            ScrollViewCampos.SetActive(false);
            ScrollViewTerminos.SetActive(true);
            Instrucciones.GetComponent<Text>().text = "Esta es la primera vez que inicias sesión en Sendero Scout!. Para comenzar, primero debes aceptar los términos y condiciones de uso que se presentan a continuación:";
            BotonAceptar.SetActive(true);
            BotonConfirmar.SetActive(false);
            ErrorText.SetActive(false);
            numPage = 0;
        }
    }

    public void VerifyInputs(){
        submutButton.interactable = (nameField.text.Length >= 3 && passwordField.text.Length >= 4);
        //no permitir #@'"?¡%${[(.,; /*-+
    }
}
