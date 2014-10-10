$.Vector = function (x,y) {
    this.x = x || 0;
    this.y = y || 0;
}

$.Vector.prototype.add = function (vector) {
    this.x += vector.x;
    this.y += vector.y;
}

$.Vector.prototype.getMagnitude = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

$.Vector.prototype.getAngle = function () {
    return Math.atan2(this.y, this.x);
};

$.Vector.fromAngle = function (angle, magnitude) {
    return new $.Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
};


$.Particle = function(point, velocity, acceleration, minLife, maxLife, minSize, maxSize) {
    this.position = point || new $.Vector(0, 0);
    this.velocity = velocity || new $.Vector(0, 0);
    this.acceleration = acceleration || new $.Vector(0, 0);
    this.lifeTick = 0;
    this.life = (Math.random() * (maxLife - minLife)) + minLife;
    this.size = (Math.random() * (maxSize - minSize)) + minSize;
}

$.Particle.prototype.submitToFields = function (fields) {
    var totalAccelerationX = 0;
    var totalAccelerationY = 0;

    for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        var vectorX = field.position.x - this.position.x;
        var vectorY = field.position.y - this.position.y;
        var force = field.mass / Math.pow(vectorX * vectorX + vectorY * vectorY, 1.65);
        totalAccelerationX += vectorX * force;
        totalAccelerationY += vectorY * force;
    }
    this.acceleration = new $.Vector(totalAccelerationX, totalAccelerationY);
};


$.Particle.prototype.move = function () {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
};


$.Particle.prototype.draw = function () {
    $.mainctx.fillStyle = "rgba(255,0,0,  "+ 1.0 * (.9-(this.lifeTick/this.life)) + ")";
    $.mainctx.fillRect(this.position.x, this.position.y, this.size, this.size);
};


$.Emitter = function (point, velocity, spread) {
    this.particles = [];
    this.maxParticles = 1500;
    this.emitRate = 5;
    this.position = point; 
    this.velocity = velocity; 
    this.spread = spread || (Math.PI / 24);
    this.particleLifeMax = 1000;
    this.particleLifeMin = 10;
    this.particleSizeMax = 7;
    this.particleSizeMin = 1;
    this.boundsX = $.W;
    this.boundsY = $.H;
   // this.particleType = new function(){ $.mainctx.fillStyle = "rgba(0,0,255,  "+ 1.0 * (.9-(this.lifeTick/this.life)) + ")";
     ///                           $.mainctx.fillRect(this.position.x, this.position.y, this.size, this.size); };
    //this.canvas = canvas;
  //  this.drawColor = "#999"; 
}

$.Emitter.prototype.emitParticles = function () {  //new particles
    if (this.particles.length > this.maxParticles) return;
    for (var j = 0; j < this.emitRate; j++) {
        var angle = this.velocity.getAngle() + this.spread - (Math.random() * this.spread * 2);
        var magnitude = this.velocity.getMagnitude();
        var position = new $.Vector(this.position.x, this.position.y);
        var velocity = $.Vector.fromAngle(angle, magnitude);
        this.particles.push(new $.Particle(position, velocity, null, this.particleLifeMin, this.particleLifeMax, this.particleSizeMin, this.particleSizeMax));
    }
};

$.Emitter.prototype.drawParticles = function () {
    for (var i = 0; i < this.particles.length; i++) {
        this.particles[i].draw();
    }
}

$.Emitter.prototype.update = function (fields) {
    var _fields = fields || [new $.Field(new $.Vector(250,  200), -20)];
    this.emitParticles();
    var currentParticles = [];

    for (var i = 0; i < this.particles.length; i++) {
        var particle = this.particles[i];
        var pos = particle.position;
        if (particle.lifeTick > particle.life) continue;
        particle.lifeTick += 1;
        //if (pos.x < 0 || pos.x > this.boundsX || pos.y < 0 || pos.y > this.boundsY) continue;
        particle.submitToFields(_fields);
        particle.move();
        currentParticles.push(particle);
    }
    this.particles = currentParticles;
}

$.Emitter.prototype.render = function () {
    this.drawParticles();
}

$.Field = function(point, mass) {
    this.position = point;
    this.setMass(mass);
}

$.Field.prototype.setMass = function (mass) {
    this.mass = mass || 100;
    this.drawColor = mass < 0 ? "#f00" : "#0f0";
}