module.exports = {
    phaseFinished: new Effect(60, e => {
        let data = e.data;
        let block = data.pblock();
        let hitSize = block.size * Vars.tilesize * 0.7;
        
        Draw.mixcol(e.color, 1);
        Draw.alpha(e.fslope() / 1.3);
        
        Draw.rect(block.getIcon(), data.x, data.y, 0);

        Draw.reset();
    }),
    
    consFinished: new Effect(60, e => {
        let data = e.data;
        let block = data.pblock();
        let hitSize = block.size * Vars.tilesize * 0.7;
        
        Draw.mixcol(e.color, 1);
        Draw.alpha(e.fslope());
        
        Draw.rect(block.getIcon(), data.x, data.y, 0);
        
        Draw.alpha(1);
        Lines.stroke(e.fslope() * 1);
        Lines.poly(data.x, data.y, 6, e.fin() * hitSize * 10, 0);
        
        e.scaled(25, r => {
            Lines.stroke(r.fslope() * 2);
            Lines.poly(data.x, data.y, 6, r.fin() * hitSize * 18, 0);
        });
        
        Draw.reset();
    }),
    
    chargeLaserHit: new Effect(12, e => {
        Draw.color(e.color);
        Lines.stroke(e.fout() * 1.5);

        Angles.randLenVectors(e.id, 8, e.finpow() * 17, e.rotation, 360, new Floatc2({get(x, y){
            let ang = Mathf.angle(x, y);
            Lines.lineAngle(e.x + x, e.y + y, ang, e.fout() * 4 + 1);
        }}));
    }),

    chargeLaserShoot: new Effect(21, e => {
        Draw.color(e.color);

        for(let i = 0; i < 2; i++){
            let l = Mathf.signs[i];
            Drawf.tri(e.x, e.y, 4 * e.fout(), 29, e.rotation + 67 * l);
        };  
    }),

    chargeLaserShootSmoke: new Effect(26, e => {
        Draw.color(e.color);

        Angles.randLenVectors(e.id, 7, 80, e.rotation, 0, new Floatc2({get(x, y){
            Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fout() * 9);
        }}));
    }),
	
    chargeLaserCharge: new Effect(38, e => {
        Draw.color(e.color);

        Angles.randLenVectors(e.id, 2, 1 + 20 * e.fout(), e.rotation, 120, new Floatc2({get(x, y){
            Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 3 + 1);
        }}));   
    }),

    chargeLaserChargeBegin: new Effect(71, e => {   
        Draw.color(e.color);
        Fill.circle(e.x, e.y, e.fin() * 3);

        Draw.color();
        Fill.circle(e.x, e.y, e.fin() * 2);
    })
};
