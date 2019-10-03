using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Bagheera : MonoBehaviour
{
    public GameObject PortadorScript;
    private readonly int numAnimal = 1;
    private readonly string nombreAnimal = "Bagheera";
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
            string Mensaje = "Soy " + nombreAnimal + " una pantera valiente, fuete y sigilosa, represento al mundo Corporal.\n\n";
            //Mala evaluacion
            if (eval >= 0 && eval < 2)
            {
                Mensaje += "Te he visto y debes comenzar a tener habitos más sanos, con "+eval+" estrellas, tenemos que mejorar algunas cosas.";
            }

            //Media evaluacion
            else if (eval >= 2 && eval < 3.5)
            {
                Mensaje += "Con "+eval+" estrellas has demostrado ser un lobato fuerte y sano, sigue así y podrás ser igual de fuerte y valiente como Bagheera.";
            }

            else if (eval >= 3.5 && eval <= 5)
            {
                Mensaje += "Te has convertido en un lobato muy fuerte y sano como Bagheera. ¡Continua así!";
            }

            PortadorScript.GetComponent<Aptitudes>().Testing(Mensaje, numAnimal);
        }        
    }

}
