using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Baloo : MonoBehaviour
{
    public GameObject PortadorScript;
    private readonly int numAnimal = 2;
    private readonly string nombreAnimal = "Baloo";
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
            string Mensaje = "Soy " + nombreAnimal + " un oso sabio y amistoso. Represento al mundo del Caracter.\n\n";
            //Mala evaluacion
            if (eval >= 0 && eval < 2)
            {
                Mensaje += "¡Hey amigo! Creo que debemos trabajar un poco más en tu carácter, solo tenemos "+eval+" estrellas, recuerda que los lobatos somos ¡siempre mejor!";
            }

            //Media evaluacion
            else if (eval >= 2 && eval < 3.5)
            {
                Mensaje += "Lo estás haciendo bien, tienes eval estrellas. ¡Has estado mejorando, sigue así! Lo que es necesidad, no más ♫.";
            }

            else if (eval >= 3.5 && eval <= 5)
            {
                Mensaje += "¡Muy bien! Has alcanzado "+eval+ "estrellas, continua así y recuerda ¡Ser siempre mejor!.";
            }

            PortadorScript.GetComponent<Aptitudes>().Testing(Mensaje, numAnimal);
        }          
    }

}
