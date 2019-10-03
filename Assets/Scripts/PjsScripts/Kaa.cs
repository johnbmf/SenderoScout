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
            string Mensaje = "Soy " + nombreAnimal + " una serpiente muy astuta y represento al mundo de la Creatividad.\n\n";
            //Mala evaluacion
            if (eval >= 0 && eval < 2)
            {
                Mensaje += "Para vivir en la manada necesitamos de toda tu creatividad, yo sé que tienes de sobra para poder ayudar a todos los lobatos. No dudes en siempre expresar tus ideas.";
            }

            //Media evaluacion
            else if (eval >= 2 && eval < 3.5)
            {
                Mensaje += "¡Vamos! Continua con esa creatividad que te hace tan especial, con "+eval+" estrellas sé que tienes grandes habilidades.";
            }

            else if (eval >= 3.5 && eval <= 5)
            {
                Mensaje += "Eres un lobato creativo, sigue así ¡Para vivir en la selva necesitas de toda tu creatividad!";
            }

            PortadorScript.GetComponent<Aptitudes>().Testing(Mensaje, numAnimal);
        }         
    }

}
