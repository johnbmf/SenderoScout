using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Kaa : MonoBehaviour
{
    public GameObject PortadorScript;
    private readonly int numAnimal = 3;
    private readonly string nombreAnimal = "Kaa";
    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {

    }

    private void OnMouseUpAsButton()
    {
        if (!Aptitudes.isPanelOpen)
        {
            float eval = Aptitudes.Evaluaciones[numAnimal];
            string Mensaje = "Soy " + nombreAnimal + ". ";
            //Mala evaluacion
            if (eval >= 0 && eval < 2)
            {
                Mensaje += "Ponte las pilas porque estai mal wachito. Con un puntaje de " + eval + " no logramos nada.";
            }

            //Media evaluacion
            else if (eval >= 2 && eval < 3.5)
            {
                Mensaje += "Estamos maoma. Con un puntaje de " + eval + " tal vez logramos algo wachito.";
            }

            else if (eval >= 3.5 && eval <= 5)
            {
                Mensaje += "Estamos perfect loco. Con un puntaje de " + eval + " hacemos la wea que queramos.";
            }

            PortadorScript.GetComponent<Aptitudes>().Testing(Mensaje, numAnimal);
        }         
    }

}
