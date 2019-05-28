using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class GUIHandler : MonoBehaviour
{
    public GameObject Spot1;
    public GameObject Spot2;

    public GameObject DetalleMisionCanvas;
    public GameObject TituloMision;
    public GameObject InstruccionesMision;

    // Start is called before the first frame update
    void Start()
    {
        StartCoroutine(SpotActivo());
    }

    // Update is called once per frame
    void Update()
    {

    }

    IEnumerator SpotActivo()
    {
        int a = 1;
        yield return null;

        if (a == 1)
        {
            Text textotitulomision;
            Text textoInstruccionesMision;

            textotitulomision = TituloMision.GetComponent<Text>();
            textoInstruccionesMision = InstruccionesMision.GetComponent<Text>();

            textotitulomision.text = "Mision spot 1";
            textoInstruccionesMision.text = "Instrucciones de mision del spot 1";
            Spot1.SetActive(true);
        }

        else if (a == 2)
        {
            Spot2.SetActive(true);
        }
    }

    public void VerDetalleMision()
    {
        Debug.Log("Entrando");
        DetalleMisionCanvas.SetActive(true);
    }

    public void HideDetalleMision()
    {
        DetalleMisionCanvas.SetActive(false);
    }


}