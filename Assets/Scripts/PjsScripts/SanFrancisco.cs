using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SanFrancisco : MonoBehaviour
{
    public GameObject PortadorScript;
    private readonly int numAnimal = 5;
    private readonly string nombreAnimal = "San Francisco de Asis";
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
            string Mensaje = "Soy " + nombreAnimal + " el patrono de los Loabatos y represento al mundo Espiritual.\n\n";
            //Mala evaluacion
            if (eval >= 0 && eval < 2)
            {
                Mensaje += "Solo Tenemos "+eval+" estrellas, recuerda ser bueno con tus amigos y acércate más a tu familia.";
            }

            //Media evaluacion
            else if (eval >= 2 && eval < 3.5)
            {
                Mensaje += "Con "+eval+" estrellas estamos en un buen nivel de espiritualidad. ¡Sigue siendo respetuoso con los demás!";
            }

            else if (eval >= 3.5 && eval <= 5)
            {
                Mensaje += "Hemos alcanzado un gran nivel en el mundo Espiritual. ¡Continua así!";
            }

            PortadorScript.GetComponent<Aptitudes>().Testing(Mensaje, numAnimal);
        }            
    }
}
