using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Akela : MonoBehaviour
{
    public GameObject PortadorScript;
    private readonly int numAnimal = 0;
    private readonly string nombreAnimal = "Akela";
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
            string Mensaje = "Soy " + nombreAnimal + " un lobo sabio, generoso y jefe de la manada, represento al undo de la Sociabilidad.\n\n";
            //Mala evaluacion
            if (eval >= 0 && eval < 2)
            {
                Mensaje += "Para ser parte de la manada, recuerda ser siempre respetuoso y generoso con quienes te rodean, con "+eval+" estrellas tenemos que mejorar.\nPodrías comenzar con ser más amistoso con los demás lobatos.";
            }

            //Media evaluacion
            else if (eval >= 2 && eval < 3.5)
            {
                Mensaje += "Vas en buen camino para convertirte en un gran líder como yo. Sigue trabajando en equipo. Recuerda: que la fuerza de la manada es el lobo, y la fuerza de lobo es la manada.";
            }

            else if (eval >= 3.5 && eval <= 5)
            {
                Mensaje += "Eres un lobo muy generoso, con "+eval+" estrellas demuestras que eres ¡siempre mejor! Se fiel a tus amigos, expresa tu opinión, juega mientras puedas.";
            }

            PortadorScript.GetComponent<Aptitudes>().Testing(Mensaje, numAnimal);
        }        
    }
}