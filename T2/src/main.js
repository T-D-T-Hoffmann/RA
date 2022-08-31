AFRAME.registerComponent('event', 
{
    init: function() 
    {
        this.sol = document.querySelector('#sol');
        this.luna = document.querySelector('#luna');
        this.rotation = 0.0;

        let marcadorSol = document.querySelector('#hiro');
        let marcadorLuna = document.querySelector('#kanji');

        this.posMarcadorSol = marcadorSol.object3D.position;
        this.posMarcadorLuna = marcadorLuna.object3D.position;

        this.debug = document.querySelector('#debug');

        this.origenDetectado = false;
        this.destinoDetectado = false;

        marcadorSol.addEventListener('markerFound', () => {
            this.origenDetectado = true;
        });

        marcadorSol.addEventListener('markerLost', () => {
            this.origenDetectado = false;
        });

        marcadorLuna.addEventListener('markerFound', () => {
            this.destinoDetectado = true;
        });

        marcadorLuna.addEventListener('markerLost', () => {
            this.destinoDetectado = false;
        });
    },
    tick: function(t) 
    {
        if (t - this.t < 33) return; 
        this.t = t;

        if ((this.origenDetectado && this.destinoDetectado) === true)
        {
            let posSol  = this.posMarcadorSol;
            let posLuna = this.posMarcadorLuna;

            let a = `${posSol.x.toFixed(2)}, ${posSol.y.toFixed(2)}`;
            let b = `${posLuna.x.toFixed(2)}, ${posLuna.y.toFixed(2)}`;
            
            let r = posSol.distanceTo(posLuna)

            this.luna.object3D.position.x = r*Math.cos(this.rotation) + posSol.x;
            this.luna.object3D.position.y = r*Math.sin(this.rotation) + posSol.y;

            this.rotation = (this.rotation + 0.05) % (2*Math.PI);

            this.debug.innerText = `Sol: ${a}\nLuna: ${b}\nRadio: ${r}`;
        }
        else
        {
            this.debug.innerText = 'No se detectó ni mergas';
        }
    }
});
