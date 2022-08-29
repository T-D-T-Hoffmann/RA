AFRAME.registerComponent('oh-my-gawd', 
{
    init: function() 
    {
        this.cuboOrigen = document.querySelector('#origen');
        this.cuboDestino = document.querySelector('#destino');

        this.marcadorHiro = document.querySelector('#marker-hiro');
        this.marcadorKanji = document.querySelector('#marker-kanji');
    
        this.delta = -0.2;
        this.posicion = this.cuboOrigen.getAttribute('position');

        this.posMarcadorHiro = new THREE.Vector3();
        this.posMarcadorKanji = new THREE.Vector3();

        this.debug = document.querySelector('#debug');
    },
    tick: function(t) {
        if (t - this.tiempo < 1000) return; 
        this.tiempo = t;
        
        this.marcadorHiro.object3D.getWorldPosition(this.posMarcadorHiro);
        this.marcadorKanji.object3D.getWorldPosition(this.posMarcadorKanji);

        if (this.posMarcadorKanji.x !== 0 && this.posMarcadorKanji.y !== 0 && this.posMarcadorHiro.x !== 0 && this.posMarcadorHiro.y !== 0)
        {
            let m = (this.posMarcadorHiro.y - this.posMarcadorKanji.y) / (this.posMarcadorHiro.x - this.posMarcadorKanji.x);
            let b = this.posMarcadorHiro.y - m * this.posMarcadorHiro.x;
            let trayectoria = (x) => { return m * x + b; }
        
            //this.debug.innerText = `${m}x + ${b}`;
            this.debug.innerText = `(${this.posMarcadorHiro.x} ${this.posMarcadorHiro.y})\n(${this.posMarcadorKanji.x} ${this.posMarcadorKanji.y})`;

            this.posicion.x += this.delta;
            this.posicion.z = trayectoria(this.posicion.x);

            this.cuboOrigen.setAttribute('position', this.posicion);
        }
        //let distance = markerPos1.distanceTo(markerPos2);
        //console.log(`distance: ${distance}`);
    }
});
