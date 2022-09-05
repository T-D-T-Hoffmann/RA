AFRAME.registerComponent('main', 
{
    init: function() 
    {
        this.marcadorSol = document.querySelector('#marcador-sol');
        this.marcadorPlaneta = document.querySelector('#marcador-planeta');
        this.planeta = document.querySelector('#planeta');
        this.luna = document.querySelector('#luna');

        this.marcadorSolDetectado = false;
        this.marcadorPlanetaDetectado = false;

        this.marcadorSol.addEventListener('markerFound',     () => this.marcadorSolDetectado = true);
        this.marcadorSol.addEventListener('markerLost',      () => this.marcadorSolDetectado = false);
        this.marcadorPlaneta.addEventListener('markerFound', () => this.marcadorPlanetaDetectado = true);
        this.marcadorPlaneta.addEventListener('markerLost',  () => this.marcadorPlanetaDetectado = false);
    },
    tick: function(time)
    {
        if (time - this.time < 33) return;
        this.time = time;

        if  (this.marcadorSolDetectado && this.marcadorPlanetaDetectado) 
        {
            let posicionSol = this.marcadorSol.object3D.position;
            let posicionPlaneta = this.marcadorPlaneta.object3D.position;
            let posicionLuna = this.luna.object3D.position;
            let distancia = posicionSol.distanceTo(posicionPlaneta);

            let x = distancia * Math.cos(this.angulo) - distancia;// + (posicionSol.x - posicionPlaneta.x);
            let y = distancia * Math.sin(this.angulo)// + (posicionSol.y - posicionPlaneta.y);
            this.planeta.object3D.position.set(x, posicionPlaneta.y, y);

            let xl = 0.4 * Math.cos(this.angulo2) + x //- posicionLuna.x);
            let yl = 0.4 * Math.sin(this.angulo2) + y //- posicionLuna.y);
            this.luna.object3D.position.set(xl, 0, yl);

            this.angulo = (this.angulo + 0.05) < 2*Math.PI ? this.angulo + 0.05 : 0;
            this.angulo2 = (this.angulo2 + 0.5) < 2*Math.PI ? this.angulo2 + 0.5 : 0;
        }
        else
        {
            this.planeta.object3D.position.set(0, 0, 0);
            this.luna.object3D.position.set(0.4, 0, 0);
        }
    }
});
