window.onload = function () 
{
    let marcadorSol = document.querySelector('#marcador-sol');
    let marcadorPlaneta = document.querySelector('#marcador-planeta');

    let planeta = document.querySelector('#planeta');

    let marcadorSolDetectado = false;
    let marcadorLunaDetectado = false;
    let angulo = 0.0;

    marcadorSol.addEventListener('markerFound',     () => { marcadorSolDetectado  = true;  });
    marcadorSol.addEventListener('markerLost',      () => { marcadorSolDetectado  = false; });
    marcadorPlaneta.addEventListener('markerFound', () => { marcadorLunaDetectado = true;  });
    marcadorPlaneta.addEventListener('markerLost',  () => { marcadorLunaDetectado = false; });

    setInterval(() => {
        
        if ((marcadorSolDetectado && marcadorLunaDetectado) === true)
        {
            let radio = marcadorSol.object3D.position.distanceTo(marcadorPlaneta.object3D.position);
            
            planeta.object3D.position.x = radio * Math.cos(angulo) - radio;
            planeta.object3D.position.z = radio * Math.sin(angulo);

            angulo = (angulo + 0.05) % (2 * Math.PI);
        }
        else
        {
            planeta.object3D.position.x = 0;
            planeta.object3D.position.z = 0
        }

    }, 33);
}
