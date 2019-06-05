using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using System;

public class Login : MonoBehaviour{

    public InputField nameField, passwordField;
    public Button submutButton;
    public Text errorIngreso;
    //desde aca agregamos para el playerpref
    private int inicioSesion;
    private string user, email, tipo, nombre, pseudonimo, unidad1, unidad2, edad;

    void Start(){
        //reiniciar player
        PlayerPrefs.DeleteAll();

        inicioSesion = PlayerPrefs.GetInt("sesion", 0);// (string clave, valor por defecto si es que no existe)
        user = PlayerPrefs.GetString("user", "");
        tipo = PlayerPrefs.GetString("tipo", "");
        /* saltarse el login si ya inició sesión
        if (inicioSesion == 1){
            SceneManager.LoadScene("EscenaMapa");
            SceneManager.UnloadSceneAsync("LoginMenu");
        }*/
    } // hasta acá



    public void CallLogin(){
        StartCoroutine(LoginUsr());
    }
      
    IEnumerator LoginUsr(){
        WWWForm form = new WWWForm();
        form.AddField("name", nameField.text.Trim());//el mismo del php
        form.AddField("password", passwordField.text);
        //form.AddField("tipo", tipeField.text);
        WWW www = new WWW("http://mitra.cl/SS/login.php", form);/*   http://localhost/SenderoScout/login3.php*/
        yield return www;

        // www.text.Split('\t') = ["0", $user, $email, $unidad1, $unidad2, $edad, $tipo, $nombre, $pseudonimo] 

        if (www.text[0] == '0'){
            //DBManager.username = nameField.text;
            //DBManager.tipo = www.text.Split('\t')[6];
            //setear el nombre y el tipo en el player pref
            PlayerPrefs.SetInt("sesion", 1);
            PlayerPrefs.SetString("user", www.text.Split('\t')[1]);
            PlayerPrefs.SetString("mail", www.text.Split('\t')[2]);
            PlayerPrefs.SetString("unidad1", www.text.Split('\t')[3]);
            PlayerPrefs.SetString("unidad2", www.text.Split('\t')[4]);
            PlayerPrefs.SetString("edad", www.text.Split('\t')[5]);
            PlayerPrefs.SetString("tipo", www.text.Split('\t')[6]);
            PlayerPrefs.SetString("nombre", www.text.Split('\t')[7]);
            PlayerPrefs.SetString("pseudonimo", www.text.Split('\t')[8]);
            //cargar escena de entrada
            SceneManager.LoadScene("EscenaMapa");
            SceneManager.UnloadSceneAsync("LoginMenu");
        }   
        else{
            char[] toTrim1 = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':' };
            errorIngreso.text = www.text.Trim(toTrim1); 
            Debug.Log("falló el ingreso. Error # " + www.text);
        }

    }

    public void VerifyInputs(){
        submutButton.interactable = (nameField.text.Length >= 3 && passwordField.text.Length >= 4);
        //no permitir #@'"?¡%${[(.,; /*-+
    }
}
