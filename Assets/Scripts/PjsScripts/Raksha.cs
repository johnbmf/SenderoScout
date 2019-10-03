using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Raksha : MonoBehaviour
{
    public GameObject PortadorScript;
    private readonly int numAnimal = 4;
    private readonly string nombreAnimal = "Raksha";
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
            string Mensaje = "Soy " + nombreAnimal + " y represento al mundo de la Afectividad.\n\n";
            //Mala evaluacion
            if (eval >= 0 && eval < 2)
            {
                Mensaje += "Hijo mío, yo sé que eres un lobato afectuoso, solo debes tratar de demostrarlo.";
            }

            //Media evaluacion
            else if (eval >= 2 && eval < 3.5)
            {
                Mensaje += "Has hecho un gran avance en demostrarme lo amable, cariñoso y amistoso que eres, ¡continua así!";
            }

            else if (eval >= 3.5 && eval <= 5)
            {
                Mensaje += "Eres un lobato muy amistoso y afectuoso ¡Mi hijo es el más amable!";
            }

            PortadorScript.GetComponent<Aptitudes>().Testing(Mensaje, numAnimal);
        }           
    }

}
