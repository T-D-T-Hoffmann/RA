AFRAME.registerComponent('oh-my-gawd', {
    init: function() {
        this.inc = 0.5
        this.cube = document.querySelector('#cat');
        this.position = this.cube.getAttribute('position');
        this.hiro = document.querySelector('#marker-hiro');
        this.kanji = document.querySelector('#marker-kanji');
        this.alertas = document.querySelector("#void-sector");
    },
    tick: function(time) {
        if (time - this.time < 33) return; 
        this.time = time;

        this.position.x = this.position.x + this.inc;

        if (this.position.x >= 10 || this.position.x <= -10)
            this.inc = -this.inc

        this.cube.setAttribute('position', this.position);
        
        let markerPos1 = new THREE.Vector3();
        let markerPos2 = new THREE.Vector3();
        
        this.hiro.object3D.getWorldPosition(markerPos1);
        this.kanji.object3D.getWorldPosition(markerPos2);

        let hiroLog = `hiro:\nx: ${markerPos1.x}\n y: ${markerPos1.y}\n z: ${markerPos1.z}\n`;
        let kanjiLog = `kanji:\nx: ${markerPos2.x}\n y: ${markerPos2.y}\n z: ${markerPos2.z}\n`;

        this.alertas.innerText  = hiroLog + '\n' + kanjiLog;
    }
});
