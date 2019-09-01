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
    private string user, email, tipo, nombre, pseudonimo, unidad1, unidad2, edad;

    //Debug mode: Permite saltarse el login usando datos STUB.
    private bool debugMode = true;

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
        //PlayerPrefs.SetString("pass", "holi");
        PlayerPrefs.SetString("email", "test@ss.cl");
        //PlayerPrefs.SetString("confirmacion_email", "1");
        PlayerPrefs.SetInt("unidad1", 1);
        PlayerPrefs.SetInt("unidad2", 2);
        PlayerPrefs.SetString("edad", "10");
        PlayerPrefs.SetString("tipo", "nino");
        PlayerPrefs.SetString("nombre", "Sir Test Testeador");
        PlayerPrefs.SetString("pseudonimo", "Testcito");

        //Se carga escena del juego.
        SceneManager.LoadScene("EscenaMapa");
        SceneManager.UnloadSceneAsync("LoginMenu");
    }

    public void CallLogin(){
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
            errorIngreso.text = "Error de conexion. Comprueba tu conexion a internet.";
            yield break;
        }

        string respuesta = www.downloadHandler.text;

        var respuestaJson = JSON.Parse(respuesta);

        //Caso respuesta -1 -> fallo en la conexion entre php y BD.
        if (respuestaJson["response"] == -1)
        {
            errorIngreso.text = "Fallo en la conexión. Intente más tarde.";
            yield break;
        }

        //Caso respuesta 0 -> Nombre de usuario o pass incorrectos.
        else if (respuestaJson["response"] == 0)
        {
            errorIngreso.text = "Nombre de usuario o contraseña incorrectos.";
            yield break;
        }

        //Caso respuesta 1 -> Acceso OK.
        else if (respuestaJson["response"] == 1)
        {
            //Se registran las variables en PlayerPrefs para recordarlos.
            PlayerPrefs.SetInt("sesion", 1);
            PlayerPrefs.SetString("user", respuestaJson["user"]);
            //PlayerPrefs.SetString("pass", respuestaJson["password"]);
            PlayerPrefs.SetString("email", respuestaJson["email"]);
            //PlayerPrefs.SetString("confirmacion_email", respuestaJson["confirmacion_email"]);
            PlayerPrefs.SetString("unidad1", respuestaJson["unidad1"]);
            PlayerPrefs.SetString("unidad2", respuestaJson["unidad2"]);
            PlayerPrefs.SetString("edad", respuestaJson["edad"]);
            PlayerPrefs.SetString("tipo", respuestaJson["tipo"]);
            PlayerPrefs.SetString("nombre", respuestaJson["nombre"]);
            PlayerPrefs.SetString("pseudonimo", respuestaJson["pseudonimo"]);

            //Se carga escena del juego.
            SceneManager.LoadScene("EscenaMapa");
            SceneManager.UnloadSceneAsync("LoginMenu");
            //yield return null;
        }

        //Caso respuesta 2 -> User no es un nino.
        else if (respuestaJson["response"] == 2)
        {
            errorIngreso.text = "Acceso de dirigentes solo disponible en aplicación de dirigentes.";
            yield break;
        }

        //Caso respuesta 3 -> Email no confirmado.
        else if (respuestaJson["response"] == 2)
        {
            errorIngreso.text = "Deber verificar tu dirección email antes de poder acceder.";
            yield break;
        }
    }

    public void VerifyInputs(){
        submutButton.interactable = (nameField.text.Length >= 3 && passwordField.text.Length >= 4);
        //no permitir #@'"?¡%${[(.,; /*-+
    }
}
