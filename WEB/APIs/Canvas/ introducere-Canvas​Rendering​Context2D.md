# Canvas​Rendering​Context2D

Interfața face parte din API-ul Canvas și oferă contextul în care se va face afișarea imaginilor într-un element canvas.

## Metode și proprietăți de lucru

Interfața pun la dispoziție un set de metode necesare manipulării elementelor din canvas.

### Manipularea unui dreptunghi

- `CanvasRenderingContext2D.clearRect()`,
- `CanvasRenderingContext2D.fillRect()`,
- `CanvasRenderingContext2D.strokeRect()`.

### Afișarea și setările pentru text

- `CanvasRenderingContext2D.fillText()`,
- `CanvasRenderingContext2D.strokeText()`,
- `CanvasRenderingContext2D.measureText()`,
- `CanvasRenderingContext2D.font`,
- `CanvasRenderingContext2D.textAlign`,
- `CanvasRenderingContext2D.textBaseline`,
- `CanvasRenderingContext2D.direction`,
- `

### Afișarea și setările pentru linii și grosimea liniei

- `CanvasRenderingContext2D.lineWidth`,
- `CanvasRenderingContext2D.lineCap`,
- `CanvasRenderingContext2D.lineJoin`,
- `CanvasRenderingContext2D.miterLimit`,
- `CanvasRenderingContext2D.getLineDash()`,
- `CanvasRenderingContext2D.setLineDash()`,
- `CanvasRenderingContext2D.lineDashOffset`,
- `CanvasRenderingContext2D.fillStyle`,
- `CanvasRenderingContext2D.stroke()`,
- `CanvasRenderingContext2D.strokeStyle`.

### Degradeuri și pattern-uri

- `CanvasRenderingContext2D.createLinearGradient()`,
- `CanvasRenderingContext2D.createRadialGradient()`,
- `CanvasRenderingContext2D.createPattern()`.

### Umbre

- `CanvasRenderingContext2D.shadowBlur`,
- `CanvasRenderingContext2D.shadowColor`,
- `CanvasRenderingContext2D.shadowOffsetX`,
- `CanvasRenderingContext2D.shadowOffsetY`.

### Căi /paths

- `CanvasRenderingContext2D.beginPath()`,
- `CanvasRenderingContext2D.closePath()`,
- `CanvasRenderingContext2D.moveTo()`,
- `CanvasRenderingContext2D.lineTo()`,
- `CanvasRenderingContext2D.bezierCurveTo()`,
- `CanvasRenderingContext2D.quadraticCurveTo()`,
- `CanvasRenderingContext2D.arc()`,
- `CanvasRenderingContext2D.arcTo()`,
- `CanvasRenderingContext2D.ellipse()`,
- `CanvasRenderingContext2D.rect()`,
- `CanvasRenderingContext2D.fill()`,
- `CanvasRenderingContext2D.drawFocusIfNeeded()`,
- `CanvasRenderingContext2D.scrollPathIntoView()`,
- `CanvasRenderingContext2D.clip()`,
- `CanvasRenderingContext2D.isPointInPath()`,
- `CanvasRenderingContext2D.isPointInStroke()`.

### Transformări

- `CanvasRenderingContext2D.currentTransform` (experimental),
- `CanvasRenderingContext2D.rotate()`,
- `CanvasRenderingContext2D.scale()`,
- `CanvasRenderingContext2D.translate()`,
- `CanvasRenderingContext2D.transform()`,
- `CanvasRenderingContext2D.setTransform()`,
- `CanvasRenderingContext2D.resetTransform()` (experimental).

### Afișare imagini și modificări 

- `CanvasRenderingContext2D.drawImage()`,
- `CanvasRenderingContext2D.globalAlpha`,
- `CanvasRenderingContext2D.globalCompositeOperation`,
- `CanvasRenderingContext2D.createImageData()`,
- `CanvasRenderingContext2D.getImageData()`,
- `CanvasRenderingContext2D.putImageData()`,
- `CanvasRenderingContext2D.imageSmoothingEnabled` (experimental),
- `CanvasRenderingContext2D.imageSmoothingQuality` (experimental).

### Lucrul cu starea canvas-ului

- `CanvasRenderingContext2D.save()`,
- `CanvasRenderingContext2D.restore()`,
- `CanvasRenderingContext2D.canvas`.